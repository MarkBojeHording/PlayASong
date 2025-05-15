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
    const note = tuningNotes[index];
    if (!note || typeof note.frequency !== 'number') {
      console.error('Invalid note or frequency for index:', index);
      return;
    }

    // Create a new AudioContext
    // @ts-expect-error: webkitAudioContext is not typed on window but needed for Safari support
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.error("Browser doesn't support AudioContext.");
      return;
    }
    const audioContext = new AudioContextClass();

    // Create an OscillatorNode
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Sine wave for a pure tone
    oscillator.frequency.setValueAtTime(note.frequency, audioContext.currentTime);

    // Create a GainNode for volume control and smooth start/stop
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start silent
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05); // Fade in quickly to 50% volume
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.95); // Fade out starting at 0.95s

    // Connect nodes: oscillator -> gain -> destination (speakers)
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start the oscillator now
    oscillator.start(audioContext.currentTime);

    // Stop the oscillator after 1 second
    oscillator.stop(audioContext.currentTime + 1);

    // Close the AudioContext after the sound has finished to free resources
    setTimeout(() => {
      audioContext.close();
    }, 1500); // Allow a bit more time before closing
  };

  const markNoteAsTuned = (index: number) => {
    setTuningNotes(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, isInTune: true } : note
      )
    );
  };

  const markAllAsTuned = () => {
    setTuningNotes(prev =>
      prev.map(note => ({ ...note, isInTune: true }))
    );
  };

  return (
    <div className="step-container fade-in">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-3 text-white">Tune Your Guitar Perfectly</h1>
        <p className="text-xl text-white">Set up for standard tuning (EADGBE).</p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-charcoal-900 text-center">Understanding Your Guitar Strings</h2>
          <p className="text-charcoal-800 mb-4 text-center">
            Your guitar has 6 strings, each with its own note. From thickest to thinnest:
          </p>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
            <div className="flex-[2] flex justify-center items-center">
              <div className="w-full bg-cream-100 rounded-lg p-4 flex flex-col justify-center mx-auto h-[340px]">
                {[
                  { num: 6, label: 'Low E (6th string)' },
                  { num: 5, label: 'A (5th string)' },
                  { num: 4, label: 'D (4th string)' },
                  { num: 3, label: 'G (3rd string)' },
                  { num: 2, label: 'B (2nd string)' },
                  { num: 1, label: 'High E (1st string)' },
                ].map(({ num, label }) => {
                  const thickness = [6, 5, 4].includes(num) ? 'h-2' : [3, 2].includes(num) ? 'h-1.5' : 'h-1';
                  return (
                    <div key={num} className="flex flex-row items-center mb-4 last:mb-0 w-full px-2">
                      <div className="text-charcoal-800 text-sm mr-3 whitespace-nowrap flex-shrink-0 text-right min-w-[140px]">
                        {label}
                      </div>
                      <div className="w-10 h-10 bg-coral-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-3 flex-shrink-0">
                        {num}
                      </div>
                      <div className={`bg-charcoal-800 rounded-full flex-grow ${thickness}`}></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="h-[340px] flex items-center">
                <img
                  src="/images/guitar-string.png"
                  alt="Close-up of fingers on guitar strings"
                  className="rounded-lg shadow-lg object-cover h-full"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-charcoal-800">
              Click a string to hear its correct pitch, then play it on your guitar.
              Adjust the tuning pegs until our AI confirms it's spot-on.
            </p>
            <button
              onClick={markAllAsTuned}
              className="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Mark All as Tuned
            </button>
          </div>

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