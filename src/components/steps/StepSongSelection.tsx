import React, { useState } from 'react';
import SongCard from '../ui/SongCard';
import { Song } from '../../types';

interface StepSongSelectionProps {
  onNext: () => void;
  onSelectSong: (song: Song) => void;
  hasFreeTrialUsed: boolean;
}

const StepSongSelection: React.FC<StepSongSelectionProps> = ({ 
  onNext, 
  onSelectSong,
  hasFreeTrialUsed 
}) => {
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  
  const songs: Song[] = [
    {
      id: '1',
      title: 'Wonderwall',
      artist: 'Oasis',
      chords: [
        { name: 'Em', position: '0-2-2-0-0-0', fingering: '0-1-2-0-0-0', diagramUrl: '' },
        { name: 'G', position: '3-2-0-0-0-3', fingering: '2-1-0-0-0-3', diagramUrl: '' },
        { name: 'D', position: 'x-x-0-2-3-2', fingering: 'x-x-0-1-3-2', diagramUrl: '' },
        { name: 'A7sus4', position: 'x-0-2-0-3-0', fingering: 'x-0-1-0-2-0', diagramUrl: '' },
      ],
      difficulty: 'beginner',
      previewUrl: '',
      imageUrl: 'https://images.pexels.com/photos/4088010/pexels-photo-4088010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    {
      id: '2',
      title: 'Horse with No Name',
      artist: 'America',
      chords: [
        { name: 'Em', position: '0-2-2-0-0-0', fingering: '0-1-2-0-0-0', diagramUrl: '' },
        { name: 'D6/9', position: 'x-x-0-2-0-0', fingering: 'x-x-0-1-0-0', diagramUrl: '' },
      ],
      difficulty: 'beginner',
      previewUrl: '',
      imageUrl: 'https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    {
      id: '3',
      title: "Knockin' on Heaven's Door",
      artist: 'Bob Dylan',
      chords: [
        { name: 'G', position: '3-2-0-0-0-3', fingering: '2-1-0-0-0-3', diagramUrl: '' },
        { name: 'D', position: 'x-x-0-2-3-2', fingering: 'x-x-0-1-3-2', diagramUrl: '' },
        { name: 'Am', position: 'x-0-2-2-1-0', fingering: 'x-0-2-3-1-0', diagramUrl: '' },
        { name: 'C', position: 'x-3-2-0-1-0', fingering: 'x-3-2-0-1-0', diagramUrl: '' },
      ],
      difficulty: 'beginner',
      previewUrl: '',
      imageUrl: 'https://images.pexels.com/photos/164738/pexels-photo-164738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
  ];

  const handleSongSelect = (song: Song) => {
    setSelectedSongId(song.id);
    onSelectSong(song);
  };

  const handleContinue = () => {
    if (selectedSongId) {
      onNext();
    }
  };

  return (
    <div className="step-container fade-in">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-3 text-charcoal-900">Choose Your Song</h1>
        <p className="text-xl text-charcoal-700">Pick a classic to learn today.</p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-charcoal-800 mb-6">
            These beginner-friendly hits use simple chords, ideal for your first lesson. 
            Learn one song free, then subscribe for $9.99/month for more.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {songs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onSelect={handleSongSelect}
                isSelected={song.id === selectedSongId}
                isLocked={hasFreeTrialUsed && song.id !== '1'} // Lock all but first song if free trial used
              />
            ))}
          </div>
          
          {hasFreeTrialUsed && (
            <div className="bg-cream-200 border-l-4 border-coral-500 p-4 rounded-r-lg mb-8">
              <h3 className="font-medium text-charcoal-900 mb-2">Unlock All Songs</h3>
              <p className="text-charcoal-800 mb-4">
                You've used your free song. Subscribe for just $9.99/month to unlock our 
                full library of songs with advanced AI feedback.
              </p>
              <button className="btn-primary">
                Subscribe Now
              </button>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <button 
            onClick={handleContinue} 
            className={`btn-secondary py-3 px-12 ${selectedSongId ? '' : 'opacity-75 cursor-not-allowed'}`}
            disabled={!selectedSongId}
          >
            {selectedSongId ? "Continue to Learn This Song" : "Select a Song to Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepSongSelection;