import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StepWelcome from './components/steps/StepWelcome';
import StepTuning from './components/steps/StepTuning';
import StepSongSelection from './components/steps/StepSongSelection';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import NewPasswordPage from './components/pages/NewPasswordPage';
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
  const setSelectedSong = useState<Song | null>(null)[1];
  const [savedSongs, setSavedSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem('savedSongs');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('step', String(currentStep));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ step: currentStep }, '', newUrl);
  }, [currentStep]);

  useEffect(() => {
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
    const params = new URLSearchParams(window.location.search);
    params.set('step', String(step));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ step }, '', newUrl);
  };

  const handleSaveSong = (song: Song) => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
    if (!savedSongs.find(s => s.id === song.id)) {
      const newSavedSongs = [...savedSongs, song];
      setSavedSongs(newSavedSongs);
      localStorage.setItem('savedSongs', JSON.stringify(newSavedSongs));
    }
  };

  const handleRemoveSong = (song: Song) => {
    const newSavedSongs = savedSongs.filter(s => s.id !== song.id);
    setSavedSongs(newSavedSongs);
    localStorage.setItem('savedSongs', JSON.stringify(newSavedSongs));
  };

  const handleLogin = () => {
    setShowLogin(false);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setCurrentStep(1);
    setSavedSongs([]);
    localStorage.removeItem('savedSongs');
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
        <ProfilePage
          savedSongs={savedSongs}
          onLogout={handleLogout}
          onSaveSong={handleSaveSong}
          onRemoveSong={handleRemoveSong}
          onNavigate={(step, song) => {
            if (song) {
              setSelectedSong(song);
            }
            setShowProfile(false);
            handleStepChange(step);
          }}
        />
        <Footer />
      </>
    );
  }

  return (
    <Router>
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
          <Routes>
            <Route path="/" element={<StepWelcome />} />
            <Route
              path="/step-tuning"
              element={
                <StepTuning onNext={() => { window.history.pushState({}, '', '/step1'); window.dispatchEvent(new PopStateEvent('popstate')); }} />
              }
            />
            <Route
              path="/step1"
              element={
                <StepSongSelection
                  onNext={() => handleStepChange(5)}
                  onSelectSong={setSelectedSong}
                  onSaveSong={handleSaveSong}
                  onRemoveSong={handleRemoveSong}
                  savedSongs={savedSongs}
                />
              }
            />
            <Route
              path="/new-password"
              element={<NewPasswordPage />}
            />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
