import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './PreviewPanel.css';

interface PreviewPanelProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  content: string;
  position?: 'left' | 'right';
}

function PreviewPanel({ isOpen, onClose, title, content, position = 'left' }: PreviewPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={`preview-panel-overlay ${isVisible ? 'visible' : ''}`} onClick={onClose} />
      <div className={`preview-panel ${position} ${isVisible ? 'visible' : ''}`}>
        <div className="preview-panel-header">
          <h3>{title}</h3>
          {onClose && (
            <button className="preview-close-btn" onClick={onClose}>
              ✕
            </button>
          )}
        </div>
        <div className="preview-panel-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default PreviewPanel;
