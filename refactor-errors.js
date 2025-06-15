#!/usr/bin/env node

/**
 * Automated Refactoring Script for Error Handling
 * This script replaces manual error throwing with centralized error handler functions
 *
 * Usage: node refactor-errors.js
 */

const fs = require('fs');
const path = require('path');

// Services directory
const servicesDir = './src/services';
const utilsDir = './src/utils';

// Pattern replacements
const replacements = [
  // NotFoundError patterns
  {
    search: /throw new NotFoundError\('(\w+) not found'\);/g,
    replace: "assertFound(result[0], '$1', id);",
  },
  {
    search: /throw new NotFoundError\('(\w+) with ID \${?\w+\}? not found'\);/g,
    replace: "assertFound(result[0], '$1', id);",
  },
  {
    search: /if \(!(\w+)\) \{\s*throw new NotFoundError\('([^']+)'\);\s*\}/gs,
    replace: "assertFound($1, '$2');",
  },

  // BadRequestError patterns
  {
    search: /throw new BadRequestError\('([^']+)'\);/g,
    replace: "throwBadRequest('$1');",
  },

  // Import replacements
  {
    search:
      /import { NotFoundError, BadRequestError } from '@\/utils\/error';/g,
    replace:
      "import { assertFound, throwBadRequest } from '@/middlewares/error-handler';",
  },
  {
    search: /import { NotFoundError } from '@\/utils\/error';/g,
    replace: "import { assertFound } from '@/middlewares/error-handler';",
  },
  {
    search: /import { BadRequestError } from '@\/utils\/error';/g,
    replace: "import { throwBadRequest } from '@/middlewares/error-handler';",
  },
];

function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  replacements.forEach(({ search, replace }) => {
    const newContent = content.replace(search, replace);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Refactored: ${filePath}`);
  } else {
    console.log(`⏭️  No changes: ${filePath}`);
  }
}

function refactorDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      refactorDirectory(filePath);
    } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
      refactorFile(filePath);
    }
  });
}

console.log('🚀 Starting error handling refactoring...\n');

// Refactor services
if (fs.existsSync(servicesDir)) {
  console.log('📁 Refactoring services...');
  refactorDirectory(servicesDir);
}

// Refactor utils
if (fs.existsSync(utilsDir)) {
  console.log('📁 Refactoring utils...');
  refactorDirectory(utilsDir);
}

console.log('\n✨ Refactoring complete!');
console.log('\n📋 Manual steps still needed:');
console.log('1. Review and test the refactored files');
console.log(
  "2. Handle complex error scenarios that couldn't be auto-refactored"
);
console.log('3. Update any remaining imports');
console.log('4. Run type checking: npm run type-check');
console.log('5. Run linting: npm run lint:fix');
