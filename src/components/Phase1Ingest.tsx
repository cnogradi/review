import React, { useEffect, useState } from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import { queries, FileRecord } from '../db/queries';

export const Phase1Ingest: React.FC = () => {
    const [files, setFiles] = useState<FileRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFiles = async () => {
            try {
                const data = await queries.getFiles();
                setFiles(data);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };
        loadFiles();
    }, []);

    if (loading) return <div>Loading ingestion status...</div>;
    if (error) return <div className="error-message" style={{ color: 'red', padding: '20px' }}>Error loading data: {error}</div>;

    return (
        <div className="phase-container">
            <h2>Phase 1: Ingestion & Extraction</h2>
            <p className="description">Monitor the ingestion of source documents and extraction of slides.</p>

            <div className="file-list">
                {files.map(file => (
                    <div key={file.file_id} className="file-card">
                        <div className="file-icon">
                            <FileText size={24} />
                        </div>
                        <div className="file-info">
                            <h3>{file.filename}</h3>
                            <span className="meta">{file.business_unit} • {file.doc_type}</span>
                        </div>
                        <div className="file-status">
                            <CheckCircle size={20} className="text-green-500" />
                            <span>Ingested</span>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .phase-container { padding: 20px; }
        .file-list { display: grid; gap: 15px; margin-top: 20px; }
        .file-card { 
          display: flex; align-items: center; gap: 15px; 
          padding: 15px; border: 1px solid #eee; border-radius: 8px;
          background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .file-info { flex: 1; }
        .file-info h3 { margin: 0 0 5px 0; font-size: 16px; }
        .meta { font-size: 12px; color: #666; }
        .file-status { display: flex; align-items: center; gap: 5px; color: green; font-size: 14px; }
      `}</style>
        </div>
    );
};
