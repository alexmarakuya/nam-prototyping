'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);

  const environments = [
    {
      id: 'support',
      name: 'NAM Support Interface',
      description: 'Tailwind CSS based support ticket system with AI assistant',
      theme: 'Modern & Clean',
      color: 'bg-gradient-to-br from-purple-600 to-blue-600',
      icon: '🎯',
    },
    {
      id: '30-seconds-to-fly',
      name: '30 Seconds to Fly',
      description: 'Ant Design based flight support system with aviation theme',
      theme: 'Professional & Aviation',
      color: 'bg-gradient-to-br from-blue-600 to-cyan-600',
      icon: '🚀',
    },
  ];

  const handleEnvironmentSelect = (envId: string) => {
    setSelectedEnvironment(envId);
    setTimeout(() => {
      router.push(`/${envId}`);
    }, 500);
  };

  if (selectedEnvironment) {
    const env = environments.find(e => e.id === selectedEnvironment);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">{env?.icon}</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {env?.name}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NAM Prototype Environments
          </h1>
          <p className="text-xl text-gray-600">
            Choose an environment to explore different UI implementations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {environments.map((env) => (
            <div
              key={env.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleEnvironmentSelect(env.id)}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                <div className={`${env.color} p-8 text-white text-center`}>
                  <div className="text-6xl mb-4">{env.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{env.name}</h2>
                  <p className="text-white/90">{env.theme}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{env.description}</p>
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

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Each environment showcases different UI frameworks and design approaches
          </p>
        </div>
      </div>
    </div>
  );
}