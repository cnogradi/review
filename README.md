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

## Document Processing Pipeline

I have implemented the document processing pipeline and integrated it with the frontend application.

### Changes

#### ETL Pipeline
- **`etl/process_docs.py`**: Main script to process PPTX, PDF, and DOCX files.
    - Extracts text and structure.
    - Extracts slide images (for PPTX).
    - Uploads to S3 (or local output in dry-run).
- **`etl/requirements.txt`**: Python dependencies.

#### Frontend
- **`src/services/materialService.ts`**: New service to fetch materials from S3 if `VITE_S3_BUCKET_URL` is configured.
- **`src/App.tsx`**: Updated to use `materialService` for data loading.

### Verification

#### Prerequisites
1.  Install Python 3.8+.
2.  **System Dependencies** (for slide generation):
    -   **Linux**:
        -   **LibreOffice**: `sudo apt-get install libreoffice`
        -   **Poppler**: `sudo apt-get install poppler-utils`
    -   **Windows**:
        -   **LibreOffice**: Install from [libreoffice.org](https://www.libreoffice.org/). Ensure `soffice.exe` is in your PATH or default install location.
        -   **Poppler**: Download binary release (e.g., from [github.com/oschwartz10612/poppler-windows](https://github.com/oschwartz10612/poppler-windows)), extract, and add the `bin` folder to your system PATH.
3.  Install dependencies:
    ```bash
    pip install -r etl/requirements.txt
    ```

#### Running the ETL Pipeline
1.  **Generate Test Data** (Optional):
    ```bash
    python etl/generate_test_data.py
    ```
    This creates `test_docs/test_presentation.pptx`.

2.  **Dry Run** (Local Verification):
    ```bash
    python etl/process_docs.py --source-dir ./test_docs --bucket my-test-bucket --dry-run
    ```
    - Check `output/` directory for `index.json` and processed modules.

3.  **S3 Upload** (Production):
    ```bash
    python etl/process_docs.py --source-dir ./real_docs --bucket my-real-bucket
    ```

#### Running the Frontend
1.  **Default Mode** (Uses sample data):
    ```bash
    npm run dev
    ```
2.  **S3 Mode**:
    - Create `.env.local` with `VITE_S3_BUCKET_URL=https://my-bucket.s3.amazonaws.com/prefix`
    - Run `npm run dev`.

### Next Steps
- Configure the actual S3 bucket and CORS settings.
- Set up the `VITE_S3_BUCKET_URL` in the deployment environment.
