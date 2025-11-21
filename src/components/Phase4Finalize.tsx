import React from 'react';
import { Download, FileOutput, Package } from 'lucide-react';

export const Phase4Finalize: React.FC = () => {
    return (
        <div className="phase-container">
            <h2>Phase 4: Finalize & Export</h2>
            <p className="description">Generate the final training package based on the consolidated Golden Record.</p>

            <div className="export-options">
                <div className="export-card">
                    <div className="icon-wrapper pptx">
                        <FileOutput size={40} />
                    </div>
                    <h3>PowerPoint Deck</h3>
                    <p>Generate a native .pptx file with all slides, speaker notes, and resolved content.</p>
                    <button className="btn-export">
                        <Download size={16} /> Export PPTX
                    </button>
                </div>

                <div className="export-card">
                    <div className="icon-wrapper scorm">
                        <Package size={40} />
                    </div>
                    <h3>SCORM Package</h3>
                    <p>Create a SCORM 1.2 compliant zip package ready for LMS upload.</p>
                    <button className="btn-export">
                        <Download size={16} /> Export SCORM
                    </button>
                </div>
            </div>

            <style>{`
        .phase-container { padding: 20px; max-width: 800px; margin: 0 auto; }
        .export-options { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 40px; }
        
        .export-card { 
          background: white; border: 1px solid #eee; border-radius: 12px; 
          padding: 30px; text-align: center; transition: transform 0.2s, box-shadow 0.2s;
        }
        .export-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        
        .icon-wrapper { 
          width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; 
          display: flex; align-items: center; justify-content: center;
        }
        .icon-wrapper.pptx { background: #fff1f2; color: #e11d48; }
        .icon-wrapper.scorm { background: #f0f9ff; color: #0284c7; }
        
        .btn-export { 
          background: #111; color: white; border: none; padding: 12px 24px; 
          border-radius: 6px; font-weight: bold; cursor: pointer; 
          display: inline-flex; align-items: center; gap: 8px; margin-top: 20px;
        }
        .btn-export:hover { background: #333; }
      `}</style>
        </div>
    );
};
