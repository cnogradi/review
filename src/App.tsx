import { useState, useEffect } from 'react';
import { Database, ChevronRight } from 'lucide-react';
import { DuckDBClient } from './db/dbClient';
import { Phase1Ingest } from './components/Phase1Ingest';
import { Phase2Curate } from './components/Phase2Curate';
import { Phase3Harmonize } from './components/Phase3Harmonize';
import { Phase4Finalize } from './components/Phase4Finalize';
import './App.css';

function App() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      try {
        await DuckDBClient.getInstance().init();
        setDbReady(true);
      } catch (e) {
        console.error("DB Init failed", e);
      }
    };
    initDB();
  }, []);

  if (!dbReady) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Initializing Workbench Data Engine...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="logo">
          <Database className="text-blue-500" />
          <h1>Consolidation Workbench</h1>
        </div>
        <nav className="phase-nav">
          <button
            className={`nav-item ${currentPhase === 1 ? 'active' : ''}`}
            onClick={() => setCurrentPhase(1)}
          >
            <span className="step">1</span> Ingest
          </button>
          <ChevronRight size={16} className="text-gray-400" />
          <button
            className={`nav-item ${currentPhase === 2 ? 'active' : ''}`}
            onClick={() => setCurrentPhase(2)}
          >
            <span className="step">2</span> Curate
          </button>
          <ChevronRight size={16} className="text-gray-400" />
          <button
            className={`nav-item ${currentPhase === 3 ? 'active' : ''}`}
            onClick={() => setCurrentPhase(3)}
          >
            <span className="step">3</span> Harmonize
          </button>
          <ChevronRight size={16} className="text-gray-400" />
          <button
            className={`nav-item ${currentPhase === 4 ? 'active' : ''}`}
            onClick={() => setCurrentPhase(4)}
          >
            <span className="step">4</span> Export
          </button>
        </nav>
      </header>

      <main className="main-workspace">
        {currentPhase === 1 && <Phase1Ingest />}
        {currentPhase === 2 && <Phase2Curate />}
        {currentPhase === 3 && <Phase3Harmonize />}
        {currentPhase === 4 && <Phase4Finalize />}
      </main>

      <style>{`
        .app-container { height: 100vh; display: flex; flex-direction: column; background: #f8fafc; color: #1e293b; }
        .main-header { 
          height: 60px; background: white; border-bottom: 1px solid #e2e8f0; 
          display: flex; align-items: center; padding: 0 20px; justify-content: space-between;
        }
        .logo { display: flex; align-items: center; gap: 10px; font-weight: bold; font-size: 18px; }
        .phase-nav { display: flex; align-items: center; gap: 10px; }
        
        .nav-item { 
          background: none; border: none; display: flex; align-items: center; gap: 8px; 
          padding: 8px 12px; border-radius: 6px; cursor: pointer; color: #64748b; font-weight: 500;
        }
        .nav-item.active { background: #eff6ff; color: #2563eb; }
        .step { 
          background: #e2e8f0; width: 20px; height: 20px; border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; font-size: 12px;
        }
        .nav-item.active .step { background: #2563eb; color: white; }
        
        .main-workspace { flex: 1; overflow: hidden; position: relative; }
        
        .loading-screen { 
          height: 100vh; display: flex; flex-direction: column; 
          align-items: center; justify-content: center; gap: 20px; 
        }
        .loader {
          border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%;
          width: 40px; height: 40px; animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default App;
