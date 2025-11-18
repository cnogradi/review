import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { TrainingMaterial } from '../data/sampleMaterials';
import './PreviewBuilder.css';

interface SelectedConcept {
  materialId: string;
  outlineItemId: string;
  concept: string;
}

interface PreviewBuilderProps {
  materials: TrainingMaterial[];
  selectedConcepts: SelectedConcept[];
  onBack: () => void;
  onReset: () => void;
}

function PreviewBuilder({ materials, selectedConcepts, onBack, onReset }: PreviewBuilderProps) {
  const consolidatedContent = useMemo(() => {
    let content = '# Consolidated Training Material\n\n';
    
    const groupedConcepts = selectedConcepts.reduce((acc, concept) => {
      const material = materials.find(m => m.id === concept.materialId);
      const outlineItem = material?.outline.find(o => o.id === concept.outlineItemId);
      
      if (outlineItem) {
        if (!acc[outlineItem.title]) {
          acc[outlineItem.title] = [];
        }
        acc[outlineItem.title].push({
          concept: concept.concept,
          material: material!,
          outlineItem
        });
      }
      return acc;
    }, {} as Record<string, Array<{concept: string, material: TrainingMaterial, outlineItem: any}>>);

    Object.entries(groupedConcepts).forEach(([section, items]) => {
      content += `## ${section}\n\n`;
      
      items.forEach(({ concept, material }) => {
        content += `### ${concept}\n\n`;
        
        const conceptRegex = new RegExp(`###\\s+${concept}[\\s\\S]*?(?=###|##|$)`, 'i');
        const match = material.content.match(conceptRegex);
        
        if (match) {
          const conceptContent = match[0]
            .replace(new RegExp(`###\\s+${concept}`, 'i'), '')
            .trim();
          content += conceptContent + '\n\n';
        } else {
          content += `*Content for ${concept} from ${material.title}*\n\n`;
        }
      });
    });

    return content;
  }, [materials, selectedConcepts]);

  const handleExport = () => {
    const blob = new Blob([consolidatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'consolidated-training.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="preview-builder">
      <h2>Consolidated Training Material Preview</h2>
      <p className="description">
        Review the consolidated training material. You can export it as markdown or go back to make adjustments.
      </p>

      <div className="preview-stats">
        <div className="stat">
          <span className="stat-value">{materials.length}</span>
          <span className="stat-label">Source Materials</span>
        </div>
        <div className="stat">
          <span className="stat-value">{selectedConcepts.length}</span>
          <span className="stat-label">Selected Concepts</span>
        </div>
        <div className="stat">
          <span className="stat-value">{Object.keys(selectedConcepts.reduce((acc, c) => {
            acc[c.outlineItemId] = true;
            return acc;
          }, {} as Record<string, boolean>)).length}</span>
          <span className="stat-label">Sections</span>
        </div>
      </div>

      <div className="preview-container">
        <div className="preview-content">
          <ReactMarkdown>{consolidatedContent}</ReactMarkdown>
        </div>
      </div>

      <div className="actions">
        <button className="btn-secondary" onClick={onBack}>
          Back to Concept Selection
        </button>
        <button className="btn-secondary" onClick={handleExport}>
          Export as Markdown
        </button>
        <button className="btn-primary" onClick={onReset}>
          Start New Consolidation
        </button>
      </div>
    </div>
  );
}

export default PreviewBuilder;
