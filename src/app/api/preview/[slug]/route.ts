import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  // Valid prototype slugs
  const validSlugs = ['travel-toolbox-feedback', '30-seconds-to-fly', 'support'];
  
  if (!validSlugs.includes(slug)) {
    return NextResponse.json({ error: 'Invalid prototype slug' }, { status: 404 });
  }

  try {
    // Get the base URL dynamically
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    
    // URL to screenshot
    const targetUrl = `${baseUrl}/${slug}`;
    
    console.log(`Generating screenshot for: ${targetUrl}`);
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
      ],
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent screenshots
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 1,
    });

    // Navigate to the prototype page
    await page.goto(targetUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait a bit more for any animations or dynamic content
    await page.waitForTimeout(2000);

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 800,
      },
    });

    await browser.close();

    return new NextResponse(screenshot, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Screenshot generation failed:', error);
    
    // Fallback to a simple placeholder
    const fallbackSvg = `
      <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="250" fill="#f8fafc"/>
        <rect x="20" y="20" width="360" height="210" rx="8" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
        <text x="200" y="130" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="#64748b">
          Preview Loading...
        </text>
        <text x="200" y="150" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#94a3b8">
          ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </text>
      </svg>
    `;

    return new NextResponse(Buffer.from(fallbackSvg), {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300', // Cache fallback for 5 minutes
      },
    });
  }
}
