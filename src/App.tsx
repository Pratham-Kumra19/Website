/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NEStateId } from './types/flood';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { StateExplorer } from './components/StateExplorer';
import { MLModelsShowcase } from './components/MLModelsShowcase';
import { FloodSimulator } from './components/FloodSimulator';
import { GlobalImpact } from './components/GlobalImpact';
import { MitigationHub } from './components/MitigationHub';
import { SignInModal } from './components/SignInModal';
import { ReportFloodModal } from './components/ReportFloodModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'states' | 'mlmodels' | 'simulator' | 'global' | 'mitigation'>('states');
  const [selectedStateId, setSelectedStateId] = useState<NEStateId>('assam');
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isReportFloodOpen, setIsReportFloodOpen] = useState<boolean>(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Top Header with live river alerts, navigation, user sign-in & report flood */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSignIn={() => setIsSignInOpen(true)}
          onOpenReportFlood={() => setIsReportFloodOpen(true)}
          onSelectState={setSelectedStateId}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeTab === 'states' && (
            <StateExplorer
              selectedStateId={selectedStateId}
              onSelectState={setSelectedStateId}
              onOpenReportFlood={() => setIsReportFloodOpen(true)}
            />
          )}

          {activeTab === 'mlmodels' && <MLModelsShowcase />}

          {activeTab === 'simulator' && <FloodSimulator />}

          {activeTab === 'global' && <GlobalImpact />}

          {activeTab === 'mitigation' && (
            <MitigationHub onOpenReportFlood={() => setIsReportFloodOpen(true)} />
          )}
        </main>

        {/* Institutional Sources & Disaster Helplines Footer */}
        <Footer />

        {/* Sign In & Registration Modal */}
        <SignInModal
          isOpen={isSignInOpen}
          onClose={() => setIsSignInOpen(false)}
        />

        {/* Report a Flood & Coordinate Alert Warning Subscription Modal */}
        <ReportFloodModal
          isOpen={isReportFloodOpen}
          onClose={() => setIsReportFloodOpen(false)}
          onOpenSignIn={() => setIsSignInOpen(true)}
        />
      </div>
    </AuthProvider>
  );
}
