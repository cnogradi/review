# **System Specification: Training Material Consolidation Workbench**

## **1\. System Overview**

The Training Material Consolidation Workbench is an AI-augmented web application designed to help domain experts consolidate multiple fragmented training materials (PPTX, PDF, DOCX) into a unified "Golden Record."  
Unlike simple merging tools, this system focuses on **Risk Mitigation** and **Strategic Verification**. It uses an automated ETL pipeline to identify semantic conflicts (e.g., conflicting safety standards between regions) and provides a 4-phase workflow to guide SMEs from raw files to a published SCORM package.  
**Core Value Proposition:**

* **Shift:** Moves SME effort from "Administrative Assembly" (formatting) to "Strategic Verification" (policy decisions).  
* **Efficiency:** Reduces consolidation time from \~80 hours to \~16 hours per module.

## **2\. Architecture**

graph TD  
    subgraph "Orchestration (Dagster)"  
        Docs\[Source Documents\] \--\>|Watch S3/SharePoint| Ingest\[Ingestion Asset\]  
          
        subgraph "Phase A: Extraction"  
            Ingest \--\>|LibreOffice/PDF2Image| Images\[Slide Rasterization\]  
            Ingest \--\>|Unstructured.io| Text\[Text Extraction\]  
        end  
          
        subgraph "Phase B: Intelligence"  
            Text \--\>|Sentence-Transformers| Vectors\[Embeddings\]  
            Vectors \--\>|DBSCAN/K-Means| Clusters\[Concept Clustering\]  
            Text \--\>|LLM Comparison| Conflicts\[Conflict Detection\]  
        end  
          
        subgraph "Phase C: Data Publishing"  
            Text \--\> Parquet\[DuckDB Parquet Files\]  
            Clusters \--\> Parquet  
            Conflicts \--\> Parquet  
        end  
    end

    subgraph "Storage (S3)"  
        Images \--\> S3\_Assets\[Image Assets\]  
        Parquet \--\> S3\_Data\[Data Lake\]  
    end

    subgraph "Frontend (React \+ WASM)"  
        S3\_Data \--\>|Load .parquet| DuckDB\[DuckDB-WASM (In-Browser)\]  
        S3\_Assets \--\>|Lazy Load| UI\[Workbench UI\]  
          
        DuckDB \--\>|SQL Queries| UI  
        UI \--\>|Resolutions| State\[Local State / Sync\]  
        State \--\>|python-pptx| Export\[Final Deck Generation\]  
    end

## **3\. Data Models (DuckDB Schema)**

*Note: The system now uses a relational schema stored in Parquet files instead of nested JSON. This allows the frontend to perform zero-latency SQL queries for filtering and sorting.*

### **Table 1: files (Source Inventory)**

Describes the raw materials ingested.  
CREATE TABLE files (  
    file\_id VARCHAR PRIMARY KEY,  
    filename VARCHAR,  
    s3\_path VARCHAR,  
    ingestion\_date TIMESTAMP,  
    business\_unit VARCHAR, \-- 'US', 'EU', 'APAC'  
    doc\_type VARCHAR       \-- 'PDF', 'PPTX', 'SCORM'  
);

### **Table 2: slides (Content Atoms)**

Every single slide or logical page is a row. This is the core content.  
CREATE TABLE slides (  
    slide\_id VARCHAR PRIMARY KEY,  
    file\_id VARCHAR REFERENCES files(file\_id),  
    page\_number INTEGER,  
      
    \-- Content  
    text\_content TEXT,   
    has\_images BOOLEAN,  
    image\_s3\_url VARCHAR,  
      
    \-- Intelligence  
    semantic\_embedding FLOAT\[\], \-- Vector for similarity search  
    cluster\_id VARCHAR          \-- Assigned Concept Cluster (e.g., 'PPE\_Reqs')  
);

### **Table 3: conflicts (Work Items)**

Pre-calculated flags for the "Harmonize" phase.  
CREATE TABLE conflicts (  
    conflict\_id VARCHAR PRIMARY KEY,  
    cluster\_id VARCHAR,  
    severity VARCHAR, \-- 'HIGH', 'MEDIUM', 'LOW'  
    category VARCHAR, \-- 'NUMERIC\_MISMATCH', 'POLICY\_VARIANCE'  
    description TEXT, \-- e.g., "Height threshold differs: 6ft vs 2m"  
    ai\_recommendation TEXT,  
    status VARCHAR DEFAULT 'OPEN', \-- 'OPEN', 'RESOLVED'  
    resolution\_text TEXT  
);

## **4\. ETL Pipeline Specification (Dagster)**

### **Input**

* **Source**: S3 Bucket s3://course-factory/projects/{id}/sources/  
* **Orchestrator**: Dagster

### **Processing Stages**

1. **Ingestion & Extraction**:  
   * **Images**: Use LibreOffice (headless) to convert PPTX/DOCX to PDF, then pdf2image to rasterize slides (1920x1080).  
   * **Text**: Use unstructured library to extract text while maintaining slide/page boundaries.  
2. **Intelligence (The "Analyst")**:  
   * **Vectorization**: Generate embeddings for every slide using Sentence-Transformers.  
   * **Clustering**: Group slides into "Concept Clusters" (e.g., all slides discussing "PPE").  
   * **Conflict Detection**: Run the **Adversarial Prompt** (see Section 5\) against clusters to flag factual disagreements.  
3. **Output**:  
   * Write files, slides, and conflicts tables to .parquet files in S3.

## **5\. Frontend Specification**

### **Architecture**

* **Framework**: React \+ Vite \+ Tailwind CSS.  
* **Data Engine**: **DuckDB-WASM**. The browser downloads the Parquet files once and runs SQL queries in-memory.  
  * *Benefit:* Zero-latency filtering/sorting for the user.

### **User Workflow (4 Phases)**

1. **Ingest & Extract**: User uploads files; views progress of Dagster pipeline steps.  
2. **Curate & Structure**:  
   * User drags "Concept Clusters" from a sidebar into a "Master Outline."  
   * Powered by SELECT \* FROM slides WHERE cluster\_id \= ....  
3. **Harmonize (The Conflict Engine)**:  
   * **Conflict Workbench UI**: A side-by-side comparison view.  
   * Displays Source A vs. Source B.  
   * Provides an AI-drafted "Hybrid Resolution" text area for the SME to edit.  
4. **Finalize & Export**:  
   * **PPTX**: Backend generates a deck using python-pptx based on the SME's "Golden Record."  
   * **SCORM**: Deterministic Python script packages the imsmanifest.xml and assets.

## **6\. Key Algorithms & Prompts**

### **Conflict Detection (System Prompt)**

Used during the ETL pipeline to populate the conflicts table:  
"You are a Compliance Auditor. Compare Source A and Source B. Flag **factual contradictions** (numbers, units, mandatory actions). Ignore stylistic differences. If Source A says '6 feet' and Source B says '2 meters', flag as NUMERIC\_MISMATCH."

### **SCORM Packaging Strategy**

Do NOT use LLMs to generate XML. Use a deterministic Python script:

1. Generate imsmanifest.xml using a strict Jinja2 template.  
2. Ensure all resources are relative paths.  
3. Zip content at the **root level** (avoid nested folders which break LMS parsers).

## **7\. Deployment & Configuration**

### **Environment Variables**

* VITE\_S3\_BUCKET\_URL: Base URL for fetching Parquet files and Images.  
* DAGSTER\_HOME: Path for pipeline orchestration.  
* OPENAI\_API\_KEY (or HF Token): For vectorization and conflict detection logic.

### **Dependencies**

* **Frontend**: react, @duckdb/duckdb-wasm, lucide-react.  
* **Backend**: dagster, unstructured, sentence-transformers, python-pptx, duckdb.