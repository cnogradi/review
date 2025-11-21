import React, { useEffect, useState } from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import { queries, ConflictRecord } from '../db/queries';

export const Phase3Harmonize: React.FC = () => {
    const [conflicts, setConflicts] = useState<ConflictRecord[]>([]);
    const [selectedConflict, setSelectedConflict] = useState<ConflictRecord | null>(null);
    const [resolution, setResolution] = useState('');

    useEffect(() => {
        loadConflicts();
    }, []);

    const loadConflicts = async () => {
        const data = await queries.getConflicts();
        setConflicts(data);
    };

    const handleResolve = async () => {
        if (selectedConflict && resolution) {
            await queries.resolveConflict(selectedConflict.conflict_id, resolution);
            setResolution('');
            setSelectedConflict(null);
            loadConflicts();
        }
    };

    return (
        <div className="phase-container split-view">
            <div className="sidebar">
                <h3>Detected Conflicts</h3>
                <div className="conflict-list">
                    {conflicts.length === 0 ? (
                        <div className="empty-state">No open conflicts found.</div>
                    ) : (
                        conflicts.map(c => (
                            <div
                                key={c.conflict_id}
                                className={`conflict-item ${c.severity.toLowerCase()} ${selectedConflict?.conflict_id === c.conflict_id ? 'active' : ''}`}
                                onClick={() => { setSelectedConflict(c); setResolution(c.ai_recommendation); }}
                            >
                                <AlertTriangle size={16} />
                                <div className="conflict-summary">
                                    <span className="category">{c.category}</span>
                                    <span className="desc">{c.description.substring(0, 40)}...</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="main-content">
                {selectedConflict ? (
                    <div className="resolution-workspace">
                        <div className="conflict-header">
                            <h2>{selectedConflict.category}</h2>
                            <span className={`severity-badge ${selectedConflict.severity.toLowerCase()}`}>
                                {selectedConflict.severity} Severity
                            </span>
                        </div>

                        <div className="conflict-details">
                            <p>{selectedConflict.description}</p>
                        </div>

                        <div className="ai-suggestion">
                            <h4>AI Recommendation</h4>
                            <p>{selectedConflict.ai_recommendation}</p>
                        </div>

                        <div className="resolution-form">
                            <h4>Resolution</h4>
                            <textarea
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                                placeholder="Enter resolution text..."
                                rows={4}
                            />
                            <div className="actions">
                                <button className="btn-secondary" onClick={() => setSelectedConflict(null)}>Cancel</button>
                                <button className="btn-primary" onClick={handleResolve}>
                                    <Check size={16} /> Mark Resolved
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="empty-state-large">
                        Select a conflict to resolve
                    </div>
                )}
            </div>

            <style>{`
        .phase-container { height: 100%; display: flex; gap: 20px; padding: 20px; }
        .sidebar { width: 300px; border-right: 1px solid #eee; padding-right: 20px; }
        .main-content { flex: 1; padding: 20px; background: #f9f9f9; border-radius: 8px; }
        
        .conflict-item { 
          display: flex; gap: 10px; padding: 12px; border-radius: 6px; 
          cursor: pointer; border-left: 3px solid transparent; margin-bottom: 8px;
          background: white; border: 1px solid #eee;
        }
        .conflict-item.high { border-left-color: #ef4444; }
        .conflict-item.medium { border-left-color: #f59e0b; }
        .conflict-item.active { background: #eef2ff; border-color: #c7d2fe; }
        
        .conflict-summary { display: flex; flex-direction: column; gap: 2px; }
        .category { font-weight: bold; font-size: 12px; color: #666; }
        .desc { font-size: 13px; }
        
        .resolution-workspace { display: flex; flex-direction: column; gap: 20px; }
        .conflict-header { display: flex; justify-content: space-between; align-items: center; }
        .severity-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; color: white; }
        .severity-badge.high { background: #ef4444; }
        .severity-badge.medium { background: #f59e0b; }
        
        .ai-suggestion { background: #f0fdf4; padding: 15px; border-radius: 6px; border: 1px solid #bbf7d0; }
        .ai-suggestion h4 { color: #166534; margin: 0 0 5px 0; }
        
        .resolution-form textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-top: 5px; }
        .actions { display: flex; gap: 10px; margin-top: 10px; justify-content: flex-end; }
        
        .btn-primary { background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 4px; display: flex; align-items: center; gap: 5px; cursor: pointer; }
        .btn-secondary { background: white; border: 1px solid #ddd; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
      `}</style>
        </div>
    );
};
