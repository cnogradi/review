import { useState, useEffect } from 'react';
import { TrainingMaterial } from './data/sampleMaterials';
import { materialService } from './services/materialService';
import MaterialSelector from './components/MaterialSelector';
import OutlineComparison from './components/OutlineComparison';
import ConceptSelector from './components/ConceptSelector';
import PreviewBuilder from './components/PreviewBuilder';
import './App.css';

interface SelectedConcept {
  materialId: string;
  outlineItemId: string;
  concept: string;
}

function App() {
  const [materials, setMaterials] = useState<TrainingMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedOutlineItems, setSelectedOutlineItems] = useState<string[]>([]);
  const [selectedConcepts, setSelectedConcepts] = useState<SelectedConcept[]>([]);
  const [currentStep, setCurrentStep] = useState<'select' | 'outline' | 'concepts' | 'preview'>('select');

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const data = await materialService.getMaterials();
        setMaterials(data);
      } catch (error) {
        console.error('Failed to load materials', error);
      } finally {
        setLoading(false);
      }
    };
    loadMaterials();
  }, []);

  const handleMaterialsSelected = (materialIds: string[]) => {
    setSelectedMaterials(materialIds);
    setCurrentStep('outline');
  };

  const handleOutlineSelected = (outlineIds: string[]) => {
    setSelectedOutlineItems(outlineIds);
    setCurrentStep('concepts');
  };

  const handleConceptsSelected = (concepts: SelectedConcept[]) => {
    setSelectedConcepts(concepts);
    setCurrentStep('preview');
  };

  const resetWorkflow = () => {
    setSelectedMaterials([]);
    setSelectedOutlineItems([]);
    setSelectedConcepts([]);
    setCurrentStep('select');
  };

  const activeMaterials = materials.filter(m => selectedMaterials.includes(m.id));

  return (
    <div className="app">
      <header className="app-header">
        <h1>Training Material Consolidation Tool</h1>
        <div className="workflow-steps">
          <span className={currentStep === 'select' ? 'active' : ''}>1. Select Materials</span>
          <span className={currentStep === 'outline' ? 'active' : ''}>2. Compare Outlines</span>
          <span className={currentStep === 'concepts' ? 'active' : ''}>3. Select Concepts</span>
          <span className={currentStep === 'preview' ? 'active' : ''}>4. Build Preview</span>
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading">Loading materials...</div>
        ) : (
          <>
            {currentStep === 'select' && (
              <MaterialSelector
                materials={materials}
                onMaterialsSelected={handleMaterialsSelected}
              />
            )}

            {currentStep === 'outline' && (
              <OutlineComparison
                materials={activeMaterials}
                onOutlineSelected={handleOutlineSelected}
                onBack={() => setCurrentStep('select')}
              />
            )}

            {currentStep === 'concepts' && (
              <ConceptSelector
                materials={activeMaterials}
                selectedOutlineItems={selectedOutlineItems}
                onConceptsSelected={handleConceptsSelected}
                onBack={() => setCurrentStep('outline')}
              />
            )}

            {currentStep === 'preview' && (
              <PreviewBuilder
                materials={activeMaterials}
                selectedConcepts={selectedConcepts}
                onBack={() => setCurrentStep('concepts')}
                onReset={resetWorkflow}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
