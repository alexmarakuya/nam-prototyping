import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { projectId, description } = await request.json();
    
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Read current projects data
    const projectsPath = path.join(process.cwd(), 'src/data/projects.json');
    const projectsData = JSON.parse(await fs.readFile(projectsPath, 'utf8'));
    
    // Find and update the project
    let projectFound = false;
    const now = new Date().toISOString();
    
    for (const client of projectsData.clients) {
      for (const prototype of client.prototypes) {
        if (prototype.id === projectId) {
          prototype.lastUpdated = now;
          if (description) {
            prototype.updateDescription = description;
          }
          projectFound = true;
          break;
        }
      }
      if (projectFound) break;
    }
    
    if (!projectFound) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    // Write updated data back to file
    await fs.writeFile(projectsPath, JSON.stringify(projectsData, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      projectId, 
      lastUpdated: now,
      message: 'Project timestamp updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Read current projects data and return just the timestamps
    const projectsPath = path.join(process.cwd(), 'src/data/projects.json');
    const projectsData = JSON.parse(await fs.readFile(projectsPath, 'utf8'));
    
    const timestamps: Record<string, string> = {};
    
    for (const client of projectsData.clients) {
      for (const prototype of client.prototypes) {
        timestamps[prototype.id] = prototype.lastUpdated;
      }
    }
    
    return NextResponse.json(timestamps);
    
  } catch (error) {
    console.error('Error reading project timestamps:', error);
    return NextResponse.json({ error: 'Failed to read project timestamps' }, { status: 500 });
  }
}
