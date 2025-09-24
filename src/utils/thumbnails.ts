export function generateThumbnail(colorTheme: { primary: string; secondary: string }): string {
  const svg = `
    <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" fill="${colorTheme.primary}"/>
      <rect x="50" y="50" width="300" height="150" rx="12" fill="${colorTheme.secondary}" opacity="0.8"/>
      <rect x="80" y="80" width="240" height="20" rx="4" fill="white" opacity="0.9"/>
      <rect x="80" y="120" width="180" height="16" rx="4" fill="white" opacity="0.7"/>
      <rect x="80" y="150" width="200" height="16" rx="4" fill="white" opacity="0.7"/>
    </svg>
  `;
  
  return 'data:image/svg+xml;base64,' + btoa(svg.trim());
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Updated today';
  if (diffInDays === 1) return 'Updated yesterday';
  if (diffInDays < 7) return `Updated ${diffInDays} days ago`;
  if (diffInDays < 30) return `Updated ${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `Updated ${Math.floor(diffInDays / 30)} months ago`;
  return `Updated ${Math.floor(diffInDays / 365)} years ago`;
}
