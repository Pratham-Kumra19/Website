/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NEStateId } from './types/flood';
import { Header } from './components/Header';
import { StateExplorer } from './components/StateExplorer';
import { MLModelsShowcase } from './components/MLModelsShowcase';
import { FloodSimulator } from './components/FloodSimulator';
import { GlobalImpact } from './components/GlobalImpact';
import { MitigationHub } from './components/MitigationHub';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'states' | 'mlmodels' | 'simulator' | 'global' | 'mitigation'>('states');
  const [selectedStateId, setSelectedStateId] = useState<NEStateId>('assam');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header with live river alerts & navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'states' && (
          <StateExplorer
            selectedStateId={selectedStateId}
            onSelectState={setSelectedStateId}
          />
        )}

        {activeTab === 'mlmodels' && <MLModelsShowcase />}

        {activeTab === 'simulator' && <FloodSimulator />}

        {activeTab === 'global' && <GlobalImpact />}

        {activeTab === 'mitigation' && <MitigationHub />}
      </main>

      {/* Institutional Sources & Disaster Helplines Footer */}
      <Footer />
    </div>
  );
}
