import { db } from './dbClient';

export interface FileRecord {
    file_id: string;
    filename: string;
    ingestion_date: string;
    doc_type: string;
    business_unit: string;
}

export interface SlideRecord {
    slide_id: string;
    file_id: string;
    page_number: number;
    text_content: string;
    has_images: boolean;
    image_s3_url: string;
    cluster_id: string;
}

export interface ConflictRecord {
    conflict_id: string;
    cluster_id: string;
    severity: string;
    category: string;
    description: string;
    ai_recommendation: string;
    status: string;
    resolution_text: string;
}

export const queries = {
    // Phase 1: Ingest
    getFiles: async (): Promise<FileRecord[]> => {
        return await db.query('SELECT * FROM files ORDER BY ingestion_date DESC');
    },

    // Phase 2: Curate
    getClusters: async (): Promise<{ cluster_id: string, count: number }[]> => {
        return await db.query(`
            SELECT cluster_id, COUNT(*) as count 
            FROM slides 
            GROUP BY cluster_id 
            ORDER BY count DESC
        `);
    },

    getSlidesByCluster: async (clusterId: string): Promise<SlideRecord[]> => {
        // Use parameterized query if supported, or careful string interpolation
        // DuckDB-WASM supports prepared statements, but for simplicity here:
        return await db.query(`
            SELECT * FROM slides 
            WHERE cluster_id = '${clusterId}'
            ORDER BY file_id, page_number
        `);
    },

    // Phase 3: Harmonize
    getConflicts: async (): Promise<ConflictRecord[]> => {
        return await db.query('SELECT * FROM conflicts WHERE status = \'OPEN\' ORDER BY severity DESC');
    },

    resolveConflict: async (conflictId: string, resolution: string) => {
        await db.query(`
            UPDATE conflicts 
            SET status = 'RESOLVED', resolution_text = '${resolution.replace(/'/g, "''")}' 
            WHERE conflict_id = '${conflictId}'
        `);
    }
};
