#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const projectId = args[0];
const description = args[1] || 'Manual update';

if (!projectId) {
  console.log('Usage: node scripts/update-project.js <project-id> [description]');
  console.log('');
  console.log('Available project IDs:');
  console.log('  - travel-toolbox-feedback');
  console.log('  - ai-studios');
  console.log('  - teamstack-dashboard');
  console.log('  - creative-studio');
  console.log('  - support');
  process.exit(1);
}

try {
  // Read current projects data
  const projectsPath = path.join(__dirname, '../src/data/projects.json');
  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  
  // Find and update the project
  let projectFound = false;
  const now = new Date().toISOString();
  
  for (const client of projectsData.clients) {
    for (const prototype of client.prototypes) {
      if (prototype.id === projectId) {
        prototype.lastUpdated = now;
        prototype.updateDescription = description;
        projectFound = true;
        console.log(`✅ Updated ${prototype.name} (${projectId})`);
        console.log(`   Timestamp: ${now}`);
        console.log(`   Description: ${description}`);
        break;
      }
    }
    if (projectFound) break;
  }
  
  if (!projectFound) {
    console.error(`❌ Project "${projectId}" not found`);
    process.exit(1);
  }
  
  // Write updated data back to file
  fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));
  console.log('📝 Projects data updated successfully');
  
} catch (error) {
  console.error('❌ Error updating project:', error.message);
  process.exit(1);
}
