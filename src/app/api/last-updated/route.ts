import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read timestamps from the JSON file
    const projectsPath = path.join(process.cwd(), 'src/data/projects.json');
    const projectsData = JSON.parse(await fs.readFile(projectsPath, 'utf8'));
    
    const lastUpdatedTimes: Record<string, string> = {};
    
    // Extract timestamps from all projects
    for (const client of projectsData.clients) {
      for (const prototype of client.prototypes) {
        lastUpdatedTimes[prototype.id] = prototype.lastUpdated;
      }
    }
    
    return NextResponse.json(lastUpdatedTimes);
  } catch (error) {
    console.error('Error fetching last updated times:', error);
    
    // Fallback to reasonable defaults if JSON file can't be read
    const now = new Date();
    const fallbackTimes: Record<string, string> = {
      'travel-toolbox-feedback': new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      'ai-studios': new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      'support': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      'teamstack-dashboard': new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      'creative-studio': new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    return NextResponse.json(fallbackTimes);
  }
}
