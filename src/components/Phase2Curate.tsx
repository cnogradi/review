import React, { useEffect, useState } from 'react';
import { Layers, Plus, Trash2 } from 'lucide-react';
import { queries, SlideRecord } from '../db/queries';

interface Cluster {
    cluster_id: string;
    count: number;
}

export const Phase2Curate: React.FC = () => {
    const [clusters, setClusters] = useState<Cluster[]>([]);
    const [outline, setOutline] = useState<string[]>([]);
    const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
    const [previewSlides, setPreviewSlides] = useState<SlideRecord[]>([]);

    useEffect(() => {
        queries.getClusters().then(setClusters);
    }, []);

    useEffect(() => {
        if (selectedCluster) {
            queries.getSlidesByCluster(selectedCluster).then(setPreviewSlides);
        } else {
            setPreviewSlides([]);
        }
    }, [selectedCluster]);

    const addToOutline = (clusterId: string) => {
        if (!outline.includes(clusterId)) {
            setOutline([...outline, clusterId]);
        }
    };

    const removeFromOutline = (clusterId: string) => {
        setOutline(outline.filter(id => id !== clusterId));
    };

    return (
        <div className="phase-container split-view">
            <div className="sidebar">
                <h3>Concept Clusters</h3>
                <div className="cluster-list">
                    {clusters.map(c => (
                        <div
                            key={c.cluster_id}
                            className={`cluster-item ${selectedCluster === c.cluster_id ? 'active' : ''}`}
                            onClick={() => setSelectedCluster(c.cluster_id)}
                        >
                            <Layers size={16} />
                            <span>{c.cluster_id}</span>
                            <span className="badge">{c.count}</span>
                            <button className="add-btn" onClick={(e) => { e.stopPropagation(); addToOutline(c.cluster_id); }}>
                                <Plus size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="main-content">
                <div className="outline-section">
                    <h3>Master Outline</h3>
                    {outline.length === 0 ? (
                        <div className="empty-state">Add clusters to build your outline</div>
                    ) : (
                        <div className="outline-list">
                            {outline.map((id, idx) => (
                                <div key={id} className="outline-item">
                                    <span className="number">{idx + 1}.</span>
                                    <span>{id}</span>
                                    <button onClick={() => removeFromOutline(id)}><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="preview-section">
                    <h3>Cluster Preview: {selectedCluster || 'None'}</h3>
                    <div className="slides-grid">
                        {previewSlides.map(slide => (
                            <div key={slide.slide_id} className="slide-card">
                                <div className="slide-header">Page {slide.page_number}</div>
                                <div className="slide-body">{slide.text_content.substring(0, 100)}...</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .phase-container { height: 100%; display: flex; gap: 20px; padding: 20px; }
        .sidebar { width: 250px; border-right: 1px solid #eee; padding-right: 20px; }
        .main-content { flex: 1; display: flex; flex-direction: column; gap: 20px; }
        
        .cluster-item { 
          display: flex; align-items: center; gap: 10px; padding: 10px; 
          border-radius: 6px; cursor: pointer; transition: background 0.2s;
        }
        .cluster-item:hover { background: #f5f5f5; }
        .cluster-item.active { background: #e6f0ff; border-left: 3px solid #0066cc; }
        .badge { background: #eee; padding: 2px 6px; border-radius: 10px; font-size: 12px; margin-left: auto; }
        .add-btn { border: none; background: none; cursor: pointer; color: #0066cc; }
        
        .outline-item { 
          display: flex; align-items: center; gap: 10px; padding: 10px; 
          background: white; border: 1px solid #ddd; margin-bottom: 8px; border-radius: 4px;
        }
        
        .slides-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
        .slide-card { border: 1px solid #eee; padding: 10px; border-radius: 4px; font-size: 12px; }
        .slide-header { font-weight: bold; margin-bottom: 5px; color: #666; }
      `}</style>
        </div>
    );
};
