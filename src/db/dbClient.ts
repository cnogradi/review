import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import duckdb_wasm_next from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
    mvp: {
        mainModule: duckdb_wasm,
        mainWorker: mvp_worker,
    },
    eh: {
        mainModule: duckdb_wasm_next,
        mainWorker: eh_worker,
    },
};

export class DuckDBClient {
    private static instance: DuckDBClient;
    private db: duckdb.AsyncDuckDB | null = null;
    private conn: duckdb.AsyncDuckDBConnection | null = null;
    private initPromise: Promise<void> | null = null;

    private constructor() { }

    public static getInstance(): DuckDBClient {
        if (!DuckDBClient.instance) {
            DuckDBClient.instance = new DuckDBClient();
        }
        return DuckDBClient.instance;
    }

    public async init(): Promise<void> {
        // If already initialized (conn exists), return immediately
        if (this.conn) return;
        // If initialization is in progress, return the existing promise
        if (this.initPromise) return this.initPromise;

        this.initPromise = (async () => {
            try {
                // Select bundle based on browser capabilities
                const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);

                const worker = new Worker(bundle.mainWorker!);
                const logger = new duckdb.ConsoleLogger();
                this.db = new duckdb.AsyncDuckDB(logger, worker);

                if (bundle.pthreadWorker) {
                    await this.db.instantiate(bundle.mainModule, bundle.pthreadWorker);
                } else {
                    await this.db.instantiate(bundle.mainModule);
                }

                this.conn = await this.db.connect();

                console.log('DuckDB initialized');
                await this.loadData();
            } catch (error) {
                console.error('Failed to initialize DuckDB:', error);
                throw error;
            }
        })();

        return this.initPromise;
    }

    private async loadData() {
        if (!this.conn) return;

        const baseUrl = import.meta.env.VITE_S3_BUCKET_URL || `${window.location.origin}/data`;

        // Load Parquet files
        const tables = ['files', 'slides', 'conflicts'];
        for (const table of tables) {
            const url = `${baseUrl}/${table}.parquet`;
            console.log(`Loading table ${table} from ${url}`);

            try {
                await this.conn.query(`
                    CREATE TABLE ${table} AS 
                    SELECT * FROM read_parquet('${url}');
                `);
                console.log(`Loaded table ${table}`);
            } catch (e) {
                console.error(`Error loading table ${table}:`, e);
                throw new Error(`Failed to load table ${table}: ${e instanceof Error ? e.message : String(e)}`);
            }
        }
    }

    public async query(sql: string): Promise<any[]> {
        if (!this.conn) {
            await this.init();
        }
        if (!this.conn) throw new Error('Database not initialized');

        const result = await this.conn.query(sql);
        return result.toArray().map((row) => row.toJSON());
    }
}

export const db = DuckDBClient.getInstance();
