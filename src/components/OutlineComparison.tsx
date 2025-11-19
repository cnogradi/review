import { useState } from 'react';
import { TrainingMaterial, OutlineItem } from '../data/sampleMaterials';
import PreviewPanel from './PreviewPanel';
import { generateConceptsPreview } from '../utils/contentExtractor';
import './OutlineComparison.css';

interface OutlineComparisonProps {
  materials: TrainingMaterial[];
  onOutlineSelected: (outlineIds: string[]) => void;
  onBack: () => void;
}

interface PreviewState {
  material: TrainingMaterial;
  outlineItem: OutlineItem;
}

function OutlineComparison({ materials, onOutlineSelected, onBack }: OutlineComparisonProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState<PreviewState | null>(null);

  const toggleOutlineItem = (itemId: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelected(newSelected);
  };

  const handleContinue = () => {
    if (selected.size > 0) {
      onOutlineSelected(Array.from(selected));
    }
  };

  return (
    <div className="outline-comparison">
      <h2>Compare and Select Outline Items</h2>
      <p className="description">
        Review the outlines from selected materials and choose which sections to include
        in your consolidated training deck. Click "Preview" to see the concepts and their content.
      </p>

      <div className="outlines-container">
        {materials.map((material) => (
          <div key={material.id} className="outline-column">
            <div className="outline-header">
              <h3>{material.title}</h3>
              <span className="source-label">{material.source}</span>
            </div>

            <div className="outline-items">
              {material.outline.map((item) => (
                <div
                  key={item.id}
                  className={`outline-item ${selected.has(item.id) ? 'selected' : ''}`}
                  onClick={() => toggleOutlineItem(item.id)}
                >
                  <div className="outline-item-header">
                    <input
                      type="checkbox"
                      checked={selected.has(item.id)}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <h4 style={{ paddingLeft: `${item.level * 12}px` }}>{item.title}</h4>
                  </div>
                  <div className="concepts-preview">
                    {item.concepts.map((concept, idx) => (
                      <span key={idx} className="concept-tag">{concept}</span>
                    ))}
                  </div>
                  <button
                    className="preview-btn-small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview({ material, outlineItem: item });
                    }}
                  >
                    Preview
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <PreviewPanel
        isOpen={preview !== null}
        onClose={() => setPreview(null)}
        title={preview ? `${preview.outlineItem.title}` : ''}
        content={preview ? generateConceptsPreview(preview.material, preview.outlineItem) : ''}
        position="left"
      />

      <div className="actions">
        <button className="btn-secondary" onClick={onBack}>
          Back to Material Selection
        </button>
        <button
          className="btn-primary"
          onClick={handleContinue}
          disabled={selected.size === 0}
        >
          Continue to Concept Selection ({selected.size} sections)
        </button>
      </div>
    </div>
  );
}

export default OutlineComparison;
