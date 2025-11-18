# Training Material Consolidation Tool

A React-based frontend application for consolidating multiple training materials into a single unified slide deck. This tool helps domain experts combine similar training content from various sources (PowerPoint, PDF, Word, etc.) into a cohesive training package.

## Features

- **Material Selection**: Choose from multiple training sources to consolidate
- **Outline Comparison**: View and compare outlines from different materials side-by-side
- **Concept Selection**: Pick specific concepts and topics to include in the final deck
- **Preview & Export**: Review the consolidated material and export as Markdown

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- React Markdown for rendering content
- CSS Modules for styling

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # React components
│   ├── MaterialSelector.tsx    # Step 1: Select source materials
│   ├── OutlineComparison.tsx   # Step 2: Compare and select outlines
│   ├── ConceptSelector.tsx     # Step 3: Select specific concepts
│   └── PreviewBuilder.tsx      # Step 4: Preview and export
├── data/
│   └── sampleMaterials.ts      # Sample training materials
├── App.tsx               # Main application component
├── main.tsx             # Application entry point
└── *.css                # Component styles
```

## Workflow

1. **Select Materials**: Choose which training materials to consolidate
2. **Compare Outlines**: Review outlines from selected materials and pick sections
3. **Select Concepts**: Choose specific concepts from the selected outline sections
4. **Build Preview**: Review the consolidated content and export as Markdown

## Sample Data

The application includes three sample training materials:
- Software Architecture Fundamentals
- Modern Architecture Patterns
- Enterprise Architecture Guide

These demonstrate the consolidation workflow with realistic engineering training content.

## Future Enhancements

- Upload actual PowerPoint, PDF, and Word files
- AI-powered content extraction and analysis
- Semantic similarity detection across materials
- Custom slide template generation
- Export to multiple formats (PPTX, PDF, DOCX)
- Collaborative editing features
