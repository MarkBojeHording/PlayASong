import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StepWelcome from './components/steps/StepWelcome';
import StepPickup from './components/steps/StepPickup';
import StepTuning from './components/steps/StepTuning';
import StepSongSelection from './components/steps/StepSongSelection';
import StepLearnChords from './components/steps/StepLearnChords';
import { Song } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [savedSongs, setSavedSongs] = useState<Song[]>([]);

  const handleStepChange = (step: number) => {
    window.scrollTo(0, 0);
    setCurrentStep(step);
  };

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
  };

  const handleSaveSong = (song: Song) => {
    if (!savedSongs.find(s => s.id === song.id)) {
      setSavedSongs([...savedSongs, song]);
    }
  };

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
          />
        );
      default:
        return <StepWelcome onNext={() => handleStepChange(2)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream-100">
      <Navbar 
        currentStep={currentStep} 
        onNavigate={handleStepChange}
      />
      <main className="flex-grow">
        {renderCurrentStep()}
      </main>
      <Footer />
    </div>
  );
};

export default App;