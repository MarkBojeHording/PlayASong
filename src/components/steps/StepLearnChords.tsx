import React, { useState, useEffect } from 'react';
import ChordDiagram from '../ui/ChordDiagram';
import { Song } from '../../types';

interface StepLearnChordsProps {
  song: Song | null;
  onComplete: () => void;
  hasFreeTrialUsed: boolean;
  onReturnHome: () => void;
  onSaveSong: (song: Song) => void;
}

const StepLearnChords: React.FC<StepLearnChordsProps> = ({
  song,
  onComplete,
  hasFreeTrialUsed,
  onReturnHome
}) => {
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (song) {
      setProgress((currentChordIndex / song.chords.length) * 100);
    }
  }, [currentChordIndex, song]);

  if (!song) {
    return (
      <div className="step-container fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-charcoal-900">No Song Selected</h1>
          <p className="mb-8 text-charcoal-700">Please go back and select a song to learn.</p>
          <button onClick={onReturnHome} className="btn-secondary">
            Return to Start
          </button>
        </div>
      </div>
    );
  }

  const listenForChord = () => {
    setIsListening(true);
    setFeedback('Listening...');

    // Simulate microphone listening with visual feedback
    setTimeout(() => {
      setIsListening(false);
      setFeedback(`Perfect! ${song.chords[currentChordIndex].name} sounds great!`);
    }, 2000);
  };

  const handleContinue = () => {
    if (currentChordIndex < song.chords.length - 1) {
      setCurrentChordIndex(prev => prev + 1);
      setFeedback('');
    } else {
      setIsCompleted(true);
      onComplete();
    }
  };

  return (
    <div className="step-container fade-in">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-3 text-white">
          Learn {song.title}'s Chords
        </h1>
        <p className="text-xl text-white">Master each chord one at a time.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {!isCompleted ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-charcoal-900">Chord Progression</h2>
                <div className="space-y-2 mb-6">
                  {song.chords.map((chord, index) => (
                    <div
                      key={chord.name + index}
                      className={`p-2 rounded-md ${
                        index === currentChordIndex
                          ? 'bg-coral-500 text-white font-medium'
                          : index < currentChordIndex
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-charcoal-800'
                      }`}
                    >
                      {index + 1}. {chord.name}
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{currentChordIndex + 1}/{song.chords.length} chords</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-coral-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-cream-200 rounded-lg p-4">
                <h3 className="font-medium text-charcoal-900 mb-2">Playing Tips</h3>
                <ul className="text-sm text-charcoal-800 space-y-2">
                  <li>• Press firmly just behind the fret</li>
                  <li>• Keep your thumb behind the neck</li>
                  <li>• Use the tips of your fingers</li>
                  <li>• Strum all strings evenly</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-charcoal-900">
                    Current Chord: <span className="text-coral-500">{song.chords[currentChordIndex].name}</span>
                  </h2>
                  <p className="text-charcoal-700 mb-4">
                    Follow the diagram below to place your fingers correctly on the fretboard.
                  </p>
                </div>

                <div className="flex justify-center mb-8">
                  <ChordDiagram
                    chord={song.chords[currentChordIndex]}
                    isActive={true}
                  />
                </div>

                {feedback && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    feedback.includes('Perfect')
                      ? 'bg-green-100 text-green-800'
                      : feedback.includes('Try again')
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {feedback}
                  </div>
                )}

                <div className="space-y-4">
                  <button
                    onClick={listenForChord}
                    disabled={isListening}
                    className={`w-full btn-primary py-3 ${isListening ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isListening ? 'Listening...' : `Play ${song.chords[currentChordIndex].name} Chord`}
                  </button>

                  {feedback.includes('Perfect') && (
                    <button
                      onClick={handleContinue}
                      className="w-full btn-secondary py-3"
                    >
                      Continue to Next Chord
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 rounded-full bg-coral-500 flex items-center justify-center mx-auto">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-3 text-charcoal-900">
              Congratulations!
            </h2>
            <p className="text-xl mb-6 text-charcoal-700">
              You've mastered {song.title}'s chords!
            </p>

            {hasFreeTrialUsed ? (
              <div className="mb-8">
                <p className="mb-4 text-charcoal-800">
                  You've used your free song. Subscribe now to unlock our full library of songs
                  with advanced AI feedback.
                </p>
                <button className="btn-primary py-3 px-8 mb-4">
                  Subscribe for $9.99/month
                </button>
                <div>
                  <button
                    onClick={onReturnHome}
                    className="text-charcoal-700 hover:text-coral-500 transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <p className="mb-4 text-charcoal-800">
                  Ready to learn more? Try another song or subscribe for unlimited access.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={onReturnHome}
                    className="btn-secondary py-3 px-8"
                  >
                    Try Another Free Song
                  </button>
                  <button className="btn-primary py-3 px-8">
                    Subscribe for $9.99/month
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepLearnChords;