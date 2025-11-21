# System Specification: Training Material Consolidation Tool

## 1. System Overview
The Training Material Consolidation Tool is a web-based application designed to help domain experts consolidate multiple training materials (PPTX, PDF, DOCX) into a single unified slide deck. It features an automated ETL pipeline that extracts content and structure from source documents and a React frontend for interactive selection and preview.

## 2. Architecture

```mermaid
graph TD
    subgraph "ETL Pipeline (Python)"
        Docs[Source Documents] -->|process_docs.py| Parser[Document Parser]
        Parser -->|python-pptx| PPTX[PPTX Handler]
        Parser -->|unstructured| Unstruct[PDF/DOCX Handler]
        PPTX -->|LibreOffice/COM| Images[Slide Images]
        PPTX -->|Text Extraction| Structure[Structure & Concepts]
        Unstruct --> Structure
        Images --> S3[S3 Bucket]
        Structure --> S3
    end

    subgraph "Frontend (React)"
        S3 -->|Fetch JSON| Service[MaterialService]
        Service -->|TrainingMaterial[]| State[App State]
        State --> Select[Material Selection]
        State --> Outline[Outline Comparison]
        State --> Concepts[Concept Selection]
        State --> Preview[Preview Builder]
    end
```

## 3. Data Models

### TrainingMaterial
Represents a single source document (e.g., a slide deck or PDF).

```typescript
interface TrainingMaterial {
  id: string;        // Unique identifier (e.g., "mat-software_arch")
  title: string;     // Display title
  source: string;    // Original filename
  outline: OutlineItem[]; // Hierarchical structure
  content: string;   // Full markdown content
}
```

### OutlineItem
Represents a section or slide within a material.

```typescript
interface OutlineItem {
  id: string;        // Unique identifier (e.g., "slide-1")
  title: string;     // Slide title or section header
  level: number;     // Hierarchy level (1 for slides)
  concepts: string[]; // Extracted semantic concepts
  preview_image?: string; // Path to slide preview image (relative to module root)
}
```

## 4. ETL Pipeline Specification

### Input
- **Source Directory**: Contains `.pptx`, `.pdf`, `.docx` files.
- **Target**: S3 Bucket (or local output directory).

### Processing Logic
1.  **PPTX Processing**:
    -   **Text**: Extracted using `python-pptx`.
    -   **Images**:
        -   *Linux*: Converted to PDF via LibreOffice, then to images via `pdf2image`.
        -   *Windows*: Converted via PowerPoint COM automation.
    -   **Concepts**: Heuristic extraction (capitalized phrases > 5 chars).
2.  **PDF/DOCX Processing**:
    -   Partitioned using `unstructured` library.
    -   Structure inferred from Title elements.
3.  **Output Structure**:
    ```
    bucket/
      module_code/
        data.json       # TrainingMaterial JSON
        original.pptx   # Source file
        images/         # Slide previews
          slide_1.jpg
          ...
    ```

## 5. Frontend Integration

### MaterialService
- **Source**: Checks `VITE_S3_BUCKET_URL` environment variable.
- **Logic**:
    -   If configured: Fetches `index.json` (or iterates known modules) from S3.
    -   Fallback: Uses local `sampleMaterials.ts`.
- **Data Transformation**: Ensures image paths are absolute URLs when fetching from S3.

## 6. Deployment & Configuration

### Environment Variables
- `VITE_S3_BUCKET_URL`: Base URL for the S3 bucket containing processed materials.

### Dependencies
- **Frontend**: Node.js 18+, Vite, React.
- **ETL**: Python 3.8+, `unstructured`, `python-pptx`, `boto3`.
- **System (ETL)**: LibreOffice, Poppler (for Linux image generation).
