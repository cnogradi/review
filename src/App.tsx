import { useState } from 'react';
import { sampleMaterials } from './data/sampleMaterials';
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
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedOutlineItems, setSelectedOutlineItems] = useState<string[]>([]);
  const [selectedConcepts, setSelectedConcepts] = useState<SelectedConcept[]>([]);
  const [currentStep, setCurrentStep] = useState<'select' | 'outline' | 'concepts' | 'preview'>('select');

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

  const materials = sampleMaterials.filter(m => selectedMaterials.includes(m.id));

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
        {currentStep === 'select' && (
          <MaterialSelector
            materials={sampleMaterials}
            onMaterialsSelected={handleMaterialsSelected}
          />
        )}

        {currentStep === 'outline' && (
          <OutlineComparison
            materials={materials}
            onOutlineSelected={handleOutlineSelected}
            onBack={() => setCurrentStep('select')}
          />
        )}

        {currentStep === 'concepts' && (
          <ConceptSelector
            materials={materials}
            selectedOutlineItems={selectedOutlineItems}
            onConceptsSelected={handleConceptsSelected}
            onBack={() => setCurrentStep('outline')}
          />
        )}

        {currentStep === 'preview' && (
          <PreviewBuilder
            materials={materials}
            selectedConcepts={selectedConcepts}
            onBack={() => setCurrentStep('concepts')}
            onReset={resetWorkflow}
          />
        )}
      </main>
    </div>
  );
}

export default App;
