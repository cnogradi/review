import pandas as pd
import duckdb
import os
from datetime import datetime
import random

# Configuration
OUTPUT_DIR = "public/data"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_mock_data():
    print("Generating mock data...")

    # 1. Files Table
    files_data = [
        {
            "file_id": "file_001",
            "filename": "Global_Safety_Standards_2024.pdf",
            "s3_path": "s3://bucket/sources/Global_Safety_Standards_2024.pdf",
            "ingestion_date": datetime.now(),
            "business_unit": "Global",
            "doc_type": "PDF"
        },
        {
            "file_id": "file_002",
            "filename": "US_Regional_Safety_Addendum.pptx",
            "s3_path": "s3://bucket/sources/US_Regional_Safety_Addendum.pptx",
            "ingestion_date": datetime.now(),
            "business_unit": "US",
            "doc_type": "PPTX"
        },
        {
            "file_id": "file_003",
            "filename": "EU_Compliance_Guide.docx",
            "s3_path": "s3://bucket/sources/EU_Compliance_Guide.docx",
            "ingestion_date": datetime.now(),
            "business_unit": "EU",
            "doc_type": "DOCX"
        }
    ]
    df_files = pd.DataFrame(files_data)

    # 2. Slides Table
    slides_data = []
    clusters = ["PPE_Reqs", "Work_Hours", "Reporting_Procedures", "Emergency_Response"]
    
    # Generate slides for File 1 (Global)
    for i in range(1, 11):
        cluster = clusters[i % len(clusters)]
        slides_data.append({
            "slide_id": f"slide_001_{i:03d}",
            "file_id": "file_001",
            "page_number": i,
            "text_content": f"Global Standard for {cluster}. Section {i}. All personnel must adhere to strict guidelines regarding {cluster.replace('_', ' ')}. Compliance is mandatory.",
            "has_images": i % 2 == 0,
            "image_s3_url": f"https://placehold.co/600x400?text=Global+Slide+{i}",
            "semantic_embedding": [random.random() for _ in range(5)], # Mock 5-dim vector
            "cluster_id": cluster
        })

    # Generate slides for File 2 (US)
    for i in range(1, 6):
        cluster = clusters[i % len(clusters)]
        slides_data.append({
            "slide_id": f"slide_002_{i:03d}",
            "file_id": "file_002",
            "page_number": i,
            "text_content": f"US Regional Addendum for {cluster}. In the US, specific OSHA regulations apply to {cluster.replace('_', ' ')}. Note the variations in reporting timelines.",
            "has_images": True,
            "image_s3_url": f"https://placehold.co/600x400?text=US+Slide+{i}",
            "semantic_embedding": [random.random() for _ in range(5)],
            "cluster_id": cluster
        })

    # Generate slides for File 3 (EU)
    for i in range(1, 8):
        cluster = clusters[i % len(clusters)]
        slides_data.append({
            "slide_id": f"slide_003_{i:03d}",
            "file_id": "file_003",
            "page_number": i,
            "text_content": f"EU Directive on {cluster}. European standards require additional documentation for {cluster.replace('_', ' ')}. GDPR implications must be considered.",
            "has_images": False,
            "image_s3_url": None,
            "semantic_embedding": [random.random() for _ in range(5)],
            "cluster_id": cluster
        })

    df_slides = pd.DataFrame(slides_data)

    # 3. Conflicts Table
    conflicts_data = [
        {
            "conflict_id": "conf_001",
            "cluster_id": "PPE_Reqs",
            "severity": "HIGH",
            "category": "NUMERIC_MISMATCH",
            "description": "Hard hat impact rating differs: Global says Type 1, US Addendum specifies Type 2.",
            "ai_recommendation": "Adopt the stricter standard (Type 2) for all regions to ensure universal compliance.",
            "status": "OPEN",
            "resolution_text": None
        },
        {
            "conflict_id": "conf_002",
            "cluster_id": "Reporting_Procedures",
            "severity": "MEDIUM",
            "category": "POLICY_VARIANCE",
            "description": "Incident reporting timeline: Global = 24 hours, EU = 72 hours.",
            "ai_recommendation": "Acknowledge both timelines in the training, specifying that local regulations take precedence.",
            "status": "OPEN",
            "resolution_text": None
        }
    ]
    df_conflicts = pd.DataFrame(conflicts_data)

    # Write to Parquet
    print(f"Writing Parquet files to {OUTPUT_DIR}...")
    df_files.to_parquet(f"{OUTPUT_DIR}/files.parquet")
    df_slides.to_parquet(f"{OUTPUT_DIR}/slides.parquet")
    df_conflicts.to_parquet(f"{OUTPUT_DIR}/conflicts.parquet")
    
    print("Done!")

if __name__ == "__main__":
    generate_mock_data()
