'use client';

import dynamic from 'next/dynamic';

const BuilderApp = dynamic(() => import('../../../BuilderApp'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading Shade Builder...</p>
      </div>
    </div>
  ),
});

export default function BuilderPage() {
  return (
    <div className="builder-fullscreen">
      <BuilderApp />
    </div>
  );
}
