'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const clients = [
    {
      id: 'amexgbt',
      name: 'AmexGBT',
      description: 'American Express Global Business Travel',
      color: 'bg-gradient-to-br from-slate-700 to-slate-900',
      uiLibrary: 'Custom UI Components',
      prototypes: [
        {
          id: 'travel-toolbox-feedback',
          name: 'Travel Toolbox Feedback Form',
          description: 'User feedback collection system',
        }
      ]
    },
    {
      id: '30secondstofly',
      name: '30SecondsToFly',
      description: 'Flight booking and support services',
      color: 'bg-gradient-to-br from-blue-700 to-blue-900',
      uiLibrary: 'Ant Design UI',
      prototypes: [
        // No prototypes for now as requested
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

  const handleBackToClients = () => {
    setSelectedClient(null);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <button
              onClick={handleBackToClients}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors mx-auto"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Clients
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {client?.name}
            </h1>
            <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-800 mb-6">
              {client?.uiLibrary}
            </div>
          </div>

          {client?.prototypes && client.prototypes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {client.prototypes.map((prototype) => (
                <div
                  key={prototype.id}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handlePrototypeSelect(prototype.id)}
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <div className={`${client.color} p-8 text-white`}>
                      <h2 className="text-xl font-bold mb-2">{prototype.name}</h2>
                      <p className="text-white/80 text-sm">{client.uiLibrary}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{prototype.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Click to explore</span>
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NAM Prototype Clients
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client) => (
            <div
              key={client.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleClientSelect(client.id)}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className={`${client.color} p-8 text-white`}>
                  <h2 className="text-2xl font-bold mb-3">{client.name}</h2>
                  <p className="text-white/80 text-sm">
                    {client.prototypes.length > 0 
                      ? `${client.prototypes.length} prototype${client.prototypes.length !== 1 ? 's' : ''}`
                      : 'In development'
                    }
                  </p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      {client.uiLibrary}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{client.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {client.prototypes.length > 0 ? 'View prototypes' : 'In development'}
                    </span>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Client-specific design systems and UI implementations
          </p>
        </div>
      </div>
    </div>
  );
}