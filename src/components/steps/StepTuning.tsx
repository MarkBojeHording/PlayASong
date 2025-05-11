import React, { useState, useEffect } from 'react';
import TuningString from '../ui/TuningString';
import { TuningNote } from '../../types';

interface StepTuningProps {
  onNext: () => void;
}

const StepTuning: React.FC<StepTuningProps> = ({ onNext }) => {
  const [tuningNotes, setTuningNotes] = useState<TuningNote[]>([
    { name: 'Low E (6th string)', frequency: 82.41, isInTune: false, audioUrl: '/audio/tuning/low-e.mp3', videoUrl: '/video/tuning/low-e.mp4' },
    { name: 'A (5th string)', frequency: 110.00, isInTune: false, audioUrl: '/audio/tuning/a.mp3', videoUrl: '/video/tuning/a.mp4' },
    { name: 'D (4th string)', frequency: 146.83, isInTune: false, audioUrl: '/audio/tuning/d.mp3', videoUrl: '/video/tuning/d.mp4' },
    { name: 'G (3rd string)', frequency: 196.00, isInTune: false, audioUrl: '/audio/tuning/g.mp3', videoUrl: '/video/tuning/g.mp4' },
    { name: 'B (2nd string)', frequency: 246.94, isInTune: false, audioUrl: '/audio/tuning/b.mp3', videoUrl: '/video/tuning/b.mp4' },
    { name: 'High E (1st string)', frequency: 329.63, isInTune: false, audioUrl: '/audio/tuning/high-e.mp3', videoUrl: '/video/tuning/high-e.mp4' },
  ]);

  const [allTuned, setAllTuned] = useState(false);

  useEffect(() => {
    setAllTuned(tuningNotes.every(note => note.isInTune));
  }, [tuningNotes]);

  const playReferenceNote = (index: number) => {
    // In a real app, you would play the actual note using Web Audio API
    console.log(`Playing reference note: ${tuningNotes[index].name}`);
  };

  const markNoteAsTuned = (index: number) => {
    setTuningNotes(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, isInTune: true } : note
      )
    );
  };

  return (
    <div className="step-container fade-in">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-3 text-charcoal-900">Tune Your Guitar Perfectly</h1>
        <p className="text-xl text-charcoal-700">Set up for standard tuning (EADGBE).</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-charcoal-800 mb-6">
            Click a string to hear its correct pitch, then play it on your guitar.
            Adjust the tuning pegs until our AI confirms it's spot-on. For this demo,
            you can manually mark each string as tuned.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {tuningNotes.map((note, index) => (
              <TuningString
                key={note.name}
                note={note}
                onPlay={() => playReferenceNote(index)}
                onTuned={() => markNoteAsTuned(index)}
              />
            ))}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-coral-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(tuningNotes.filter(n => n.isInTune).length / tuningNotes.length) * 100}%` }}
            ></div>
          </div>

          <div className="text-center text-charcoal-700 mb-6">
            <p>{tuningNotes.filter(n => n.isInTune).length}/{tuningNotes.length} strings tuned</p>
          </div>
        </div>

        <div className="bg-cream-200 rounded-lg p-6 mb-8 flex items-center">
          <div className="mr-4 flex-shrink-0">
            <svg className="h-12 w-12 text-teal-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-charcoal-900 mb-1">Tuning Tip</h3>
            <p className="text-charcoal-800">
              Always tune up to the note, not down. If your string is too sharp (high),
              loosen it below the target pitch, then tighten it back up to the correct note.
              This helps your guitar stay in tune longer.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onNext}
            className={`btn-secondary py-3 px-12 ${allTuned ? '' : 'opacity-75 cursor-not-allowed'}`}
            disabled={!allTuned}
          >
            {allTuned ? "Tuning Complete - Continue" : "Tune All Strings to Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTuning;
