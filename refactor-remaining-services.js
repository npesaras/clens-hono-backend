#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of service files to refactor
const serviceFiles = [
  'src/services/rewardMultipliersService.ts',
  'src/services/trashRecordService.ts',
  'src/services/truckRouteService.ts',
  'src/services/truckService.ts',
  'src/services/trashStatisticsService.ts',
  'src/services/waterQualityStatisticsService.ts',
  'src/services/locationService.ts',
  'src/services/civilianService.ts',
];

// Function to refactor a file
function refactorFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace import statement
    content = content.replace(
      /import\s*{\s*NotFoundError\s*}\s*from\s*'@\/utils\/error';?/g,
      "import { assertFound } from '@/middlewares/error-handler';"
    );

    // Also handle BadRequestError if present
    content = content.replace(
      /import\s*{\s*NotFoundError,\s*BadRequestError\s*}\s*from\s*'@\/utils\/error';?/g,
      "import { assertFound, throwBadRequest } from '@/middlewares/error-handler';"
    );

    content = content.replace(
      /import\s*{\s*BadRequestError,\s*NotFoundError\s*}\s*from\s*'@\/utils\/error';?/g,
      "import { assertFound, throwBadRequest } from '@/middlewares/error-handler';"
    );

    // Replace throw new NotFoundError patterns
    content = content.replace(
      /if\s*\(\s*!(\w+)\s*\)\s*{\s*throw\s+new\s+NotFoundError\([^)]+\);\s*}/g,
      (match, varName) => {
        // Extract entity name from variable name
        const entityMatch = varName.match(/^(found|updated|deleted)?(.+?)$/);
        let entityName = entityMatch ? entityMatch[2] : varName;

        // Convert camelCase to readable name
        entityName = entityName.replace(/([A-Z])/g, ' $1').toLowerCase();
        entityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);

        return `assertFound(${varName}, '${entityName}', id);`;
      }
    );

    // Also handle patterns with specific error messages
    content = content.replace(
      /if\s*\(\s*!(\w+)\s*\)\s*{\s*throw\s+new\s+NotFoundError\(['"]([^'"]+)['"]\);\s*}/g,
      (match, varName, errorMsg) => {
        return `assertFound(${varName}, '${errorMsg.replace(' not found', '')}', id);`;
      }
    );

    // Replace standalone throw new NotFoundError
    content = content.replace(
      /throw\s+new\s+NotFoundError\(['"]([^'"]+)['"]\);?/g,
      (match, errorMsg) => {
        const entityName = errorMsg.replace(' not found', '');
        return `throwNotFound('${entityName}', id);`;
      }
    );

    // Replace throw new BadRequestError
    content = content.replace(
      /throw\s+new\s+BadRequestError\(['"]([^'"]+)['"]\);?/g,
      (match, errorMsg) => {
        return `throwBadRequest('${errorMsg}');`;
      }
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refactored: ${filePath}`);
  } catch (error) {
    console.error(`Error refactoring ${filePath}:`, error.message);
  }
}

// Refactor all service files
serviceFiles.forEach(refactorFile);

console.log('Refactoring complete!');
