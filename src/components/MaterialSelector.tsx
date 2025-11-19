import { useState } from 'react';
import { TrainingMaterial } from '../data/sampleMaterials';
import PreviewPanel from './PreviewPanel';
import { extractOutline } from '../utils/contentExtractor';
import './MaterialSelector.css';

interface MaterialSelectorProps {
  materials: TrainingMaterial[];
  onMaterialsSelected: (materialIds: string[]) => void;
}

function MaterialSelector({ materials, onMaterialsSelected }: MaterialSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [previewMaterial, setPreviewMaterial] = useState<TrainingMaterial | null>(null);

  const toggleMaterial = (materialId: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(materialId)) {
      newSelected.delete(materialId);
    } else {
      newSelected.add(materialId);
    }
    setSelected(newSelected);
  };

  const handleContinue = () => {
    if (selected.size > 0) {
      onMaterialsSelected(Array.from(selected));
    }
  };

  return (
    <div className="material-selector">
      <h2>Select Training Materials to Consolidate</h2>
      <p className="description">
        Choose the source materials you want to combine into a single training deck.
        You can select multiple materials to compare and merge their content.
        Click on a material card to see its outline preview.
      </p>

      <div className="materials-grid">
        {materials.map((material) => (
          <div
            key={material.id}
            className={`material-card ${selected.has(material.id) ? 'selected' : ''}`}
            onClick={() => toggleMaterial(material.id)}
          >
            <div className="material-card-header">
              <input
                type="checkbox"
                checked={selected.has(material.id)}
                onChange={() => {}}
                onClick={(e) => e.stopPropagation()}
              />
              <h3>{material.title}</h3>
            </div>
            <p className="material-source">{material.source}</p>
            <div className="material-stats">
              <span>{material.outline.length} sections</span>
              <span>{material.outline.reduce((acc, item) => acc + item.concepts.length, 0)} concepts</span>
            </div>
            <button
              className="preview-btn"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewMaterial(material);
              }}
            >
              Preview Outline
            </button>
          </div>
        ))}
      </div>

      <PreviewPanel
        isOpen={previewMaterial !== null}
        onClose={() => setPreviewMaterial(null)}
        title={previewMaterial?.title || ''}
        content={previewMaterial ? extractOutline(previewMaterial) : ''}
        position="left"
      />

      <div className="actions">
        <button
          className="btn-primary"
          onClick={handleContinue}
          disabled={selected.size === 0}
        >
          Continue to Outline Comparison ({selected.size} selected)
        </button>
      </div>
    </div>
  );
}

export default MaterialSelector;
