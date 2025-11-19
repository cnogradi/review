import { useState } from 'react';
import { TrainingMaterial } from '../data/sampleMaterials';
import './ConceptSelector.css';

interface SelectedConcept {
  materialId: string;
  outlineItemId: string;
  concept: string;
}

interface ConceptSelectorProps {
  materials: TrainingMaterial[];
  selectedOutlineItems: string[];
  onConceptsSelected: (concepts: SelectedConcept[]) => void;
  onBack: () => void;
}

function ConceptSelector({
  materials,
  selectedOutlineItems,
  onConceptsSelected,
  onBack
}: ConceptSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const relevantItems = materials.flatMap(material =>
    material.outline
      .filter(item => selectedOutlineItems.includes(item.id))
      .map(item => ({ material, item }))
  );

  const toggleConcept = (materialId: string, itemId: string, concept: string) => {
    const key = `${materialId}-${itemId}-${concept}`;
    const newSelected = new Set(selected);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelected(newSelected);
  };

  const handleContinue = () => {
    const concepts: SelectedConcept[] = Array.from(selected).map(key => {
      const [materialId, itemId] = key.split('-');
      return { materialId, outlineItemId: itemId, concept: key.substring(materialId.length + itemId.length + 2) };
    });
    onConceptsSelected(concepts);
  };

  return (
    <div className="concept-selector">
      <h2>Select Concepts to Include</h2>
      <p className="description">
        Choose specific concepts from the selected outline sections. These concepts will form
        the building blocks of your consolidated training material.
      </p>

      <div className="concepts-container">
        {relevantItems.map(({ material, item }) => (
          <div key={`${material.id}-${item.id}`} className="concept-section">
            <div className="concept-section-header">
              <h3>{item.title}</h3>
              <span className="material-badge">{material.title}</span>
            </div>

            <div className="concepts-list">
              {item.concepts.map((concept, idx) => {
                const key = `${material.id}-${item.id}-${concept}`;
                const isSelected = selected.has(key);
                return (
                  <div
                    key={idx}
                    className={`concept-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleConcept(material.id, item.id, concept)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="concept-name">{concept}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="actions">
        <button className="btn-secondary" onClick={onBack}>
          Back to Outline Comparison
        </button>
        <button
          className="btn-primary"
          onClick={handleContinue}
          disabled={selected.size === 0}
        >
          Generate Preview ({selected.size} concepts)
        </button>
      </div>
    </div>
  );
}

export default ConceptSelector;
