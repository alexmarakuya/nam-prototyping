'use client';

import { useEffect, useState } from 'react';

export default function AcaiRedirectPage() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animate dots
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    // Simulate redirect after 3 seconds
    const redirectTimer = setTimeout(() => {
      // In a real implementation, you would redirect to the actual Acai service
      // For now, we'll show a message that it would redirect
      console.log('Would redirect to Acai service');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Acai Logo/Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.77527 0.0955505C11.4023 -0.38485 13.8874 0.974207 16.4559 3.54282C19.0248 6.11189 20.3846 8.59791 19.9042 11.2254C19.6787 12.4582 19.0815 13.4661 18.4579 14.2772C17.8633 15.0504 17.137 15.7759 16.5077 16.4051C16.4903 16.4225 16.4731 16.4407 16.4559 16.4579C16.4389 16.4749 16.4214 16.4924 16.4042 16.5096C15.7751 17.1389 15.0493 17.8643 14.2762 18.4588C13.4652 19.0825 12.4572 19.6796 11.2245 19.9051C8.59725 20.3856 6.11164 19.0268 3.54285 16.4579C0.974152 13.8888 -0.384976 11.4027 0.0955811 8.77524C0.321149 7.5425 0.918258 6.53452 1.54187 5.72348C2.13643 4.95024 2.8618 4.22378 3.49109 3.59457L3.5946 3.49106C4.22364 2.86183 4.94953 2.13639 5.72253 1.54184C6.53354 0.918146 7.54257 0.321115 8.77527 0.0955505ZM9.99988 6.00082C8.40837 6.00082 7.21761 6.34954 6.55261 7.31235C6.24061 7.76411 6.11358 8.26145 6.05554 8.7059C6.00025 9.12947 5.99984 9.57886 5.99988 9.9686V10.0331C5.99984 10.4229 6.00021 10.873 6.05554 11.2967C6.1136 11.741 6.2408 12.2377 6.55261 12.6893C7.21761 13.6521 8.40837 14.0008 9.99988 14.0008C11.5914 14.0008 12.7822 13.6521 13.4471 12.6893C13.7589 12.2378 13.8862 11.741 13.9442 11.2967C13.9995 10.873 13.9999 10.4229 13.9999 10.0331V9.9686C13.9999 9.57887 13.9995 9.12946 13.9442 8.7059C13.8862 8.26147 13.7591 7.76409 13.4471 7.31235C12.7822 6.34955 11.5914 6.00083 9.99988 6.00082Z" fill="white"/>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Redirecting to Acai{dots}
          </h1>
          
          <p className="text-gray-600 mb-6">
            Please wait while we connect you to the Acai assistant.
          </p>

          {/* Loading Animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer ring */}
              <div className="w-12 h-12 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
              
              {/* Inner pulsing dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-3 text-sm text-gray-500">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Connecting to Acai service</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Preparing your session</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>Almost ready...</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-xs text-gray-400">
          Powered by Acai Travel AI Assistant
        </div>
      </div>
    </div>
  );
}
