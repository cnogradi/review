import { TrainingMaterial, OutlineItem } from '../data/sampleMaterials';

/**
 * Extracts the outline as markdown from a training material
 */
export function extractOutline(material: TrainingMaterial): string {
  let content = `# ${material.title}\n\n`;
  content += `**Source:** ${material.source}\n\n`;
  content += `## Outline\n\n`;
  
  material.outline.forEach((item) => {
    const indent = '  '.repeat(item.level - 1);
    content += `${indent}- **${item.title}**\n`;
    if (item.concepts.length > 0) {
      item.concepts.forEach((concept) => {
        content += `${indent}  - ${concept}\n`;
      });
    }
  });
  
  return content;
}

/**
 * Extracts specific concept content from a material's markdown content
 */
export function extractConceptContent(
  material: TrainingMaterial,
  outlineItem: OutlineItem,
  concept: string
): string {
  // Try to find the concept as a header (### Concept Name)
  const conceptRegex = new RegExp(
    `###\\s+${escapeRegExp(concept)}[\\s\\S]*?(?=###|##|$)`,
    'i'
  );
  const match = material.content.match(conceptRegex);
  
  if (match) {
    return match[0].trim();
  }
  
  // If not found as a header, try to find it within the outline item section
  const sectionRegex = new RegExp(
    `##\\s+${escapeRegExp(outlineItem.title)}[\\s\\S]*?(?=##|$)`,
    'i'
  );
  const sectionMatch = material.content.match(sectionRegex);
  
  if (sectionMatch) {
    const sectionContent = sectionMatch[0];
    // Look for the concept within this section
    const conceptInSectionRegex = new RegExp(
      `###\\s+${escapeRegExp(concept)}[\\s\\S]*?(?=###|##|$)`,
      'i'
    );
    const conceptInSectionMatch = sectionContent.match(conceptInSectionRegex);
    
    if (conceptInSectionMatch) {
      return conceptInSectionMatch[0].trim();
    }
  }
  
  return `### ${concept}\n\n*Content not found in source material.*`;
}

/**
 * Extracts all concepts content for an outline item
 */
export function extractOutlineItemContent(
  material: TrainingMaterial,
  outlineItem: OutlineItem
): string {
  let content = `# ${outlineItem.title}\n\n`;
  content += `**From:** ${material.title}\n\n`;
  
  if (outlineItem.concepts.length === 0) {
    // If no concepts, try to extract the whole section
    const sectionRegex = new RegExp(
      `##\\s+${escapeRegExp(outlineItem.title)}[\\s\\S]*?(?=##|$)`,
      'i'
    );
    const match = material.content.match(sectionRegex);
    if (match) {
      return match[0].trim();
    }
    return content + '*No content available.*';
  }
  
  // Extract content for each concept
  outlineItem.concepts.forEach((concept) => {
    const conceptContent = extractConceptContent(material, outlineItem, concept);
    content += conceptContent + '\n\n';
  });
  
  return content;
}

/**
 * Extracts a specific section by title
 */
export function extractSection(material: TrainingMaterial, sectionTitle: string): string {
  const sectionRegex = new RegExp(
    `##\\s+${escapeRegExp(sectionTitle)}[\\s\\S]*?(?=##|$)`,
    'i'
  );
  const match = material.content.match(sectionRegex);
  
  if (match) {
    return match[0].trim();
  }
  
  return `## ${sectionTitle}\n\n*Content not found in source material.*`;
}

/**
 * Escapes special regex characters in a string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Generates a preview of concepts with their content
 */
export function generateConceptsPreview(
  material: TrainingMaterial,
  outlineItem: OutlineItem
): string {
  let content = `# ${outlineItem.title}\n\n`;
  content += `**Source:** ${material.title}\n\n`;
  
  if (outlineItem.concepts.length === 0) {
    content += '*No concepts defined for this section.*';
    return content;
  }
  
  content += `## Concepts\n\n`;
  
  outlineItem.concepts.forEach((concept, index) => {
    content += `### ${index + 1}. ${concept}\n\n`;
    
    const conceptContent = extractConceptContent(material, outlineItem, concept);
    // Extract just the first paragraph or 200 characters as preview
    const lines = conceptContent.split('\n').filter(line => line.trim());
    const firstParagraph = lines.slice(1, 3).join('\n'); // Skip the header, take next 2 lines
    
    if (firstParagraph) {
      content += firstParagraph + '\n\n';
    } else {
      content += '*Content preview not available.*\n\n';
    }
  });
  
  return content;
}
