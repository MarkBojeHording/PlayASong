import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StepWelcome from './components/steps/StepWelcome';
import StepPickup from './components/steps/StepPickup';
import StepTuning from './components/steps/StepTuning';
import StepSongSelection from './components/steps/StepSongSelection';
import StepLearnChords from './components/steps/StepLearnChords';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import { Song } from './types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function getStepFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const step = parseInt(params.get('step') || '1', 10);
  return isNaN(step) ? 1 : step;
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(getStepFromUrl());
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [savedSongs, setSavedSongs] = useState<Song[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  useEffect(() => {
    // Check initial auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Update the URL when currentStep changes
    const params = new URLSearchParams(window.location.search);
    params.set('step', String(currentStep));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ step: currentStep }, '', newUrl);
  }, [currentStep]);

  useEffect(() => {
    // Handle browser back/forward navigation
    const handlePopState = () => {
      const step = getStepFromUrl();
      setCurrentStep(step);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleStepChange = (step: number) => {
    window.scrollTo(0, 0);
    setCurrentStep(step);
    // Update history state when step changes
    const params = new URLSearchParams(window.location.search);
    params.set('step', String(step));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ step }, '', newUrl);
  };

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
  };

  const handleSaveSong = (song: Song) => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
    if (!savedSongs.find(s => s.id === song.id)) {
      setSavedSongs([...savedSongs, song]);
    }
  };

  const handleLogin = () => {
    setShowLogin(false);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowProfile(false);
  };

  if (showLogin) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (showProfile) {
    return (
      <>
        <Navbar
          currentStep={currentStep}
          onNavigate={handleStepChange}
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setShowLogin(true)}
          onProfileClick={() => setShowProfile(true)}
        />
        <ProfilePage savedSongs={savedSongs} onLogout={handleLogout} />
        <Footer />
      </>
    );
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepWelcome onNext={() => handleStepChange(2)} />;
      case 2:
        return <StepPickup onNext={() => handleStepChange(3)} />;
      case 3:
        return <StepTuning onNext={() => handleStepChange(4)} />;
      case 4:
        return (
          <StepSongSelection
            onNext={() => handleStepChange(5)}
            onSelectSong={handleSongSelect}
            onSaveSong={handleSaveSong}
            savedSongs={savedSongs}
          />
        );
      case 5:
        return (
          <StepLearnChords
            song={selectedSong}
            onComplete={() => handleStepChange(1)}
            onSaveSong={handleSaveSong}
            onReturnHome={() => handleStepChange(1)}
            hasFreeTrialUsed={false}
          />
        );
      default:
        return <StepWelcome onNext={() => handleStepChange(2)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        currentStep={currentStep}
        onNavigate={handleStepChange}
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setShowLogin(true)}
        onProfileClick={() => setShowProfile(true)}
      />
      <main className="flex-grow bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1920')",
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(0, 0, 0, 0.35)"
            }}>
        {renderCurrentStep()}
      </main>
      <Footer />
    </div>
  );
};

export default App;