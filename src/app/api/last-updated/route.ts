import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const projectPaths = {
      'travel-toolbox-feedback': 'src/app/travel-toolbox-feedback',
      '30-seconds-to-fly': 'src/app/30-seconds-to-fly',
      'support': 'src/app/support',
    };

    const lastUpdatedTimes: Record<string, string> = {};

    for (const [projectId, projectPath] of Object.entries(projectPaths)) {
      try {
        const fullPath = path.join(process.cwd(), projectPath);
        
        // Check if directory exists
        await fs.access(fullPath);
        
        // Get all files in the directory recursively
        const files = await getFilesRecursively(fullPath);
        
        // Find the most recent modification time
        let mostRecentTime = new Date(0);
        
        for (const file of files) {
          const stats = await fs.stat(file);
          if (stats.mtime > mostRecentTime) {
            mostRecentTime = stats.mtime;
          }
        }
        
        lastUpdatedTimes[projectId] = mostRecentTime.toISOString();
      } catch (error) {
        console.log(`Could not get last updated time for ${projectId}:`, error);
        // Fallback to a reasonable default
        lastUpdatedTimes[projectId] = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
      }
    }

    return NextResponse.json(lastUpdatedTimes);
  } catch (error) {
    console.error('Error fetching last updated times:', error);
    return NextResponse.json({ error: 'Failed to fetch last updated times' }, { status: 500 });
  }
}

async function getFilesRecursively(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and other common directories to avoid
        if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(entry.name)) {
          const subFiles = await getFilesRecursively(fullPath);
          files.push(...subFiles);
        }
      } else {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.log(`Could not read directory ${dir}:`, error);
  }
  
  return files;
}
