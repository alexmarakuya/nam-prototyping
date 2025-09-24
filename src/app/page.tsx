'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [lastUpdatedTimes, setLastUpdatedTimes] = useState<Record<string, Date>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const clients = [
    {
      id: 'amexgbt',
      name: 'AmexGBT',
      description: 'American Express Global Business Travel',
      color: 'bg-gradient-to-br from-blue-800 to-blue-950',
      uiLibrary: 'Custom UI Components',
      prototypes: [
        {
          id: 'travel-toolbox-feedback',
          name: 'Travel Toolbox',
          description: 'Travel management and feedback system',
          thumbnail: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="250" fill="#1e40af"/>
              <rect x="50" y="50" width="300" height="150" rx="12" fill="#3b82f6" opacity="0.8"/>
              <rect x="80" y="80" width="240" height="20" rx="4" fill="white" opacity="0.9"/>
              <rect x="80" y="120" width="180" height="16" rx="4" fill="white" opacity="0.7"/>
              <rect x="80" y="150" width="200" height="16" rx="4" fill="white" opacity="0.7"/>
            </svg>
          `),
        },
        {
          id: 'ai-studios',
          name: 'AI Studios',
          description: 'AI-powered flight booking and support services',
          thumbnail: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="250" fill="#7c3aed"/>
              <rect x="50" y="50" width="300" height="150" rx="12" fill="#8b5cf6" opacity="0.8"/>
              <rect x="80" y="80" width="240" height="20" rx="4" fill="white" opacity="0.9"/>
              <rect x="80" y="120" width="160" height="16" rx="4" fill="white" opacity="0.7"/>
              <rect x="80" y="150" width="220" height="16" rx="4" fill="white" opacity="0.7"/>
            </svg>
          `),
        }
      ]
    },
    {
      id: 'teamstack',
      name: 'Teamstack',
      description: 'Team collaboration and productivity platform',
      color: 'bg-gradient-to-br from-orange-600 to-orange-800',
      uiLibrary: 'Custom UI Components',
      prototypes: [
        {
          id: 'teamstack-dashboard',
          name: 'Team Dashboard',
          description: 'Collaborative workspace and project management',
          thumbnail: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="250" fill="#ea580c"/>
              <rect x="50" y="50" width="300" height="150" rx="12" fill="#f97316" opacity="0.8"/>
              <rect x="80" y="80" width="240" height="20" rx="4" fill="white" opacity="0.9"/>
              <rect x="80" y="120" width="190" height="16" rx="4" fill="white" opacity="0.7"/>
              <rect x="80" y="150" width="210" height="16" rx="4" fill="white" opacity="0.7"/>
            </svg>
          `),
        }
      ]
    },
    {
      id: 'simsalasim',
      name: 'Simsalasim',
      description: 'Digital innovation and creative solutions',
      color: 'bg-gradient-to-br from-black to-gray-800',
      uiLibrary: 'Custom UI Components',
      prototypes: [
        {
          id: 'creative-studio',
          name: 'Creative Studio',
          description: 'Digital design and innovation platform',
          thumbnail: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="250" fill="#1f2937"/>
              <rect x="50" y="50" width="300" height="150" rx="12" fill="#374151" opacity="0.8"/>
              <rect x="80" y="80" width="240" height="20" rx="4" fill="white" opacity="0.9"/>
              <rect x="80" y="120" width="170" height="16" rx="4" fill="white" opacity="0.7"/>
              <rect x="80" y="150" width="230" height="16" rx="4" fill="white" opacity="0.7"/>
            </svg>
          `),
        }
      ]
    },
    {
      id: 'acai-travel',
      name: 'AcaiTravel',
      description: 'Travel management platform',
      color: 'bg-gradient-to-br from-indigo-700 to-indigo-900',
      uiLibrary: 'Custom UI Components',
      prototypes: [
        {
          id: 'support',
          name: 'Front CRM Acai Integration',
          description: 'Support ticket system with AI assistant',
          thumbnail: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="250" fill="#059669"/>
              <rect x="50" y="50" width="300" height="150" rx="12" fill="#10b981" opacity="0.8"/>
              <rect x="80" y="80" width="240" height="20" rx="4" fill="white" opacity="0.9"/>
              <rect x="80" y="120" width="200" height="16" rx="4" fill="white" opacity="0.7"/>
              <rect x="80" y="150" width="160" height="16" rx="4" fill="white" opacity="0.7"/>
            </svg>
          `),
        }
      ]
    },
  ];

  const handleClientSelect = (clientId: string) => {
    setSelectedClient(clientId);
  };

  const handlePrototypeSelect = (prototypeId: string) => {
    setSelectedEnvironment(prototypeId);
    setTimeout(() => {
      router.push(`/${prototypeId}`);
    }, 500);
  };

  const getEnvironmentUrl = (prototypeId: string) => {
    const origin = window.location.origin;
    const hostname = window.location.hostname;
    
    // Check if we're on Vercel (production or preview)
    if (hostname.includes('vercel.app') || hostname.includes('vercel.com')) {
      return `${origin}/${prototypeId}`;
    }
    
    // Check if we're on a custom domain (production)
    if (!hostname.includes('localhost') && !hostname.includes('127.0.0.1') && !hostname.includes('192.168.')) {
      return `${origin}/${prototypeId}`;
    }
    
    // Local development - use localhost with current port
    return `${origin}/${prototypeId}`;
  };

  const handleCopyUrl = async (e: React.MouseEvent, prototypeId: string) => {
    e.stopPropagation();
    
    try {
      const url = getEnvironmentUrl(prototypeId);
      await navigator.clipboard.writeText(url);
      
      // Show feedback
      setCopiedId(prototypeId);
      
      // Clear feedback after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
      
      console.log('URL copied to clipboard:', url);
      console.log('Environment detected:', {
        hostname: window.location.hostname,
        origin: window.location.origin,
        isVercel: window.location.hostname.includes('vercel.app') || window.location.hostname.includes('vercel.com'),
        isLocal: window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
      });
    } catch (error) {
      console.error('Failed to copy URL:', error);
      
      // Fallback for browsers that don't support clipboard API
      try {
        const url = getEnvironmentUrl(prototypeId);
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setCopiedId(prototypeId);
        setTimeout(() => {
          setCopiedId(null);
        }, 2000);
      } catch (fallbackError) {
        console.error('Fallback copy also failed:', fallbackError);
      }
    }
  };

  const handleBackToClients = () => {
    setSelectedClient(null);
  };

  // Fetch last updated times for each project
  const fetchLastUpdatedTimes = async () => {
    try {
      const response = await fetch('/api/last-updated');
      if (response.ok) {
        const data = await response.json();
        const times: Record<string, Date> = {};
        Object.entries(data).forEach(([key, value]) => {
          times[key] = new Date(value as string);
        });
        setLastUpdatedTimes(times);
      }
    } catch (error) {
      console.log('Could not fetch last updated times, using fallback');
      // Fallback to current time minus some days for demo
      const fallbackTimes: Record<string, Date> = {
        'travel-toolbox-feedback': new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        'ai-studios': new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        'support': new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        'teamstack-dashboard': new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        'creative-studio': new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      };
      setLastUpdatedTimes(fallbackTimes);
    }
  };

  useEffect(() => {
    fetchLastUpdatedTimes();
  }, []);

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Updated today';
    if (diffInDays === 1) return 'Updated yesterday';
    if (diffInDays < 7) return `Updated ${diffInDays} days ago`;
    if (diffInDays < 30) return `Updated ${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `Updated ${Math.floor(diffInDays / 30)} months ago`;
    return `Updated ${Math.floor(diffInDays / 365)} years ago`;
  };

  if (selectedEnvironment) {
    const client = clients.find(c => c.prototypes.some(p => p.id === selectedEnvironment));
    const prototype = client?.prototypes.find(p => p.id === selectedEnvironment);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Loading {prototype?.name}</p>
        </div>
      </div>
    );
  }

  // Show prototypes for selected client
  if (selectedClient) {
    const client = clients.find(c => c.id === selectedClient);
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-2xl font-light text-gray-900 mb-4">
              {client?.name}
            </h1>
          </div>

          {client?.prototypes && client.prototypes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {client.prototypes
                .sort((a, b) => {
                  const timeA = lastUpdatedTimes[a.id]?.getTime() || 0;
                  const timeB = lastUpdatedTimes[b.id]?.getTime() || 0;
                  return timeB - timeA; // Most recent first
                })
                .map((prototype) => (
                <div
                  key={prototype.id}
                  className="cursor-pointer bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200 group overflow-hidden"
                  onClick={() => handlePrototypeSelect(prototype.id)}
                >
                  <div className="aspect-video bg-gray-100 relative">
                    <img 
                      src={prototype.thumbnail} 
                      alt={`${prototype.name} preview`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-sm" style={{display: 'none'}}>
                      Preview unavailable
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="leading-tight flex-1">
                      <h2 className="text-sm font-semibold text-gray-900">{prototype.name}</h2>
                      <span className="text-sm font-normal text-gray-500">{prototype.description}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-xs text-gray-400">
                        {lastUpdatedTimes[prototype.id] 
                          ? getRelativeTime(lastUpdatedTimes[prototype.id])
                          : 'Loading...'
                        }
                      </div>
                      <button
                        onClick={(e) => handleCopyUrl(e, prototype.id)}
                        className={`flex items-center space-x-2 px-3 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                          copiedId === prototype.id
                            ? 'text-green-700 bg-green-50 hover:bg-green-100'
                            : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
                        }`}
                        title={copiedId === prototype.id ? "URL copied!" : "Copy URL to share"}
                      >
                        {copiedId === prototype.id ? (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                        <span>{copiedId === prototype.id ? 'Copied!' : 'Share'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">In Development</h3>
              <p className="text-gray-600 mb-6">
                Prototypes for {client?.name} are currently being developed using {client?.uiLibrary}.
              </p>
              <div className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-100 text-slate-700">
                <div className="w-2 h-2 bg-slate-400 rounded-full mr-3 animate-pulse"></div>
                Development in progress
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show clients selection
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-2xl font-light text-gray-900 mb-4">
            NAM Prototypes
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clients
            .sort((a, b) => b.prototypes.length - a.prototypes.length)
            .map((client) => (
            <div
              key={client.id}
              className="cursor-pointer p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
              onClick={() => handleClientSelect(client.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <div className="leading-tight">
                  <h2 className="text-sm font-semibold text-gray-900">{client.name}</h2>
                  <span className="text-sm font-normal text-gray-500">
                    {client.prototypes.length > 0 
                      ? `${client.prototypes.length} project${client.prototypes.length !== 1 ? 's' : ''}`
                      : 'In development'
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}