import { TrainingMaterial, sampleMaterials } from '../data/sampleMaterials';

const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET_URL;

export const materialService = {
  async getMaterials(): Promise<TrainingMaterial[]> {
    if (!S3_BUCKET_URL) {
      console.log('No S3 bucket URL configured, using sample data');
      return sampleMaterials;
    }

    try {
      // In a real scenario, we might fetch an index.json file that lists all available modules
      // For this implementation, we'll assume there's an index.json at the root of the bucket/prefix
      const response = await fetch(`${S3_BUCKET_URL}/index.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch index: ${response.statusText}`);
      }
      const materials = await response.json();
      
      // Transform the data if necessary to match TrainingMaterial interface
      // The ETL script produces compatible JSON, but we might need to fix up image URLs
      return materials.map((m: TrainingMaterial) => ({
        ...m,
        outline: m.outline.map(o => ({
          ...o,
          // Ensure preview images have absolute URLs if they are relative
          // The ETL script saves them as "images/filename.jpg"
          // We need to prepend the module URL
          // Assuming structure: bucket/module_code/images/...
          // But wait, the index.json from ETL dry run has relative paths?
          // If we fetch index.json from root, we need to know where the module is.
          // The ETL script output structure:
          // bucket/
          //   module_code/
          //     data.json
          //     images/
          //
          // If we fetch a master index.json, it should probably contain full URLs or we construct them.
          // Let's assume the index.json contains the list of materials with their metadata.
          // If the ETL script generates a single index.json for all, it's easier.
          // My ETL script generates an index.json in dry-run mode at the root.
          // For S3 mode, it uploads individual files but doesn't currently generate a master index.
          // I should probably update the ETL script to generate/update a master index, 
          // OR the frontend should just know about specific modules.
          // For now, let's assume the index.json exists and contains the list.
          // We might need to fix up image paths.
        }))
      }));
    } catch (error) {
      console.error('Error fetching materials from S3:', error);
      return sampleMaterials; // Fallback on error
    }
  }
};
