import React, { useState } from 'react';
import SongCard from '../ui/SongCard';
import { Song } from '../../types';

interface StepSongSelectionProps {
  onNext: () => void;
  onSelectSong: (song: Song) => void;
  onSaveSong: (song: Song) => void;
  savedSongs: Song[];
}

const StepSongSelection: React.FC<StepSongSelectionProps> = ({
  onNext,
  onSelectSong,
  onSaveSong,
  savedSongs
}) => {
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<'all' | 'rock' | 'pop'>('all');

  const songs: Song[] = [
    {
      id: '1',
      title: 'Wonderwall',
      artist: 'Oasis',
      genre: 'rock',
      chords: [
        {
          name: 'Em',
          position: '0-2-2-0-0-0',
          fingering: '0-1-2-0-0-0',
          diagramUrl: '',
          audioUrl: '/audio/chords/Em.mp3',
          videoUrl: '/video/chords/Em.mp4'
        },
      ],
      difficulty: 'beginner',
      previewUrl: '/audio/previews/wonderwall.mp3',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      videoUrl: '/video/tutorials/wonderwall.mp4',
      lyrics: [
        { line: "Today is gonna be the day", chords: ['Em', 'G'], timing: 0 },
        { line: "That they're gonna throw it back to you", chords: ['D', 'A7sus4'], timing: 4 }
      ]
    },
    {
      id: '2',
      title: 'Let It Be',
      artist: 'The Beatles',
      genre: 'pop',
      chords: [{ name: 'C', position: '', fingering: '', diagramUrl: '', audioUrl: '', videoUrl: '' }],
      difficulty: 'beginner',
      previewUrl: '',
      imageUrl: 'https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg?auto=compress&w=400',
      videoUrl: '',
      lyrics: []
    },
    {
      id: '3',
      title: 'Hey Jude',
      artist: 'The Beatles',
      genre: 'pop',
      chords: [{ name: 'F', position: '', fingering: '', diagramUrl: '', audioUrl: '', videoUrl: '' }],
      difficulty: 'beginner',
      previewUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      videoUrl: '',
      lyrics: []
    },
    {
      id: '6',
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      genre: 'pop',
      chords: [{ name: 'Am', position: '', fingering: '', diagramUrl: '', audioUrl: '', videoUrl: '' }],
      difficulty: 'beginner',
      previewUrl: '',
      imageUrl: 'https://images.pexels.com/photos/713664/pexels-photo-713664.jpeg?auto=compress&w=400',
      videoUrl: '',
      lyrics: []
    },
    {
      id: '10',
      title: 'Rolling in the Deep',
      artist: 'Adele',
      genre: 'pop',
      chords: [{ name: 'Am', position: '', fingering: '', diagramUrl: '', audioUrl: '', videoUrl: '' }],
      difficulty: 'beginner',
      previewUrl: '',
      imageUrl: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&w=400',
      videoUrl: '',
      lyrics: []
    },
    {
      id: '11',
      title: 'Yellow',
      artist: 'Coldplay',
      genre: 'rock',
      chords: [{ name: 'G', position: '', fingering: '', diagramUrl: '', audioUrl: '', videoUrl: '' }],
      difficulty: 'beginner',
      previewUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?auto=format&fit=crop&w=400&q=80',
      videoUrl: '',
      lyrics: []
    },
    {
      id: '12',
      title: 'Counting Stars',
      artist: 'OneRepublic',
      genre: 'pop',
      chords: [{ name: 'Am', position: '', fingering: '', diagramUrl: '', audioUrl: '', videoUrl: '' }],
      difficulty: 'beginner',
      previewUrl: '',
      imageUrl: 'https://images.pexels.com/photos/164461/pexels-photo-164461.jpeg?auto=compress&w=400',
      videoUrl: '',
      lyrics: []
    }
  ];

  const filteredSongs = selectedGenre === 'all'
    ? songs
    : songs.filter(song => song.genre === selectedGenre);

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
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-3 text-charcoal-900">Choose Your Song</h1>
        <p className="text-xl text-charcoal-700">Pick a song to learn today.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedGenre('all')}
                className={`px-4 py-2 rounded-lg ${
                  selectedGenre === 'all'
                    ? 'bg-coral-500 text-white'
                    : 'bg-cream-100 text-charcoal-800 hover:bg-cream-200'
                }`}
              >
                All Songs
              </button>
              <button
                onClick={() => setSelectedGenre('rock')}
                className={`px-4 py-2 rounded-lg ${
                  selectedGenre === 'rock'
                    ? 'bg-coral-500 text-white'
                    : 'bg-cream-100 text-charcoal-800 hover:bg-cream-200'
                }`}
              >
                Rock
              </button>
              <button
                onClick={() => setSelectedGenre('pop')}
                className={`px-4 py-2 rounded-lg ${
                  selectedGenre === 'pop'
                    ? 'bg-coral-500 text-white'
                    : 'bg-cream-100 text-charcoal-800 hover:bg-cream-200'
                }`}
              >
                Pop
              </button>
            </div>

            {savedSongs.length > 0 && (
              <div className="text-charcoal-700">
                {savedSongs.length} saved {savedSongs.length === 1 ? 'song' : 'songs'}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {filteredSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onSelect={handleSongSelect}
                onSave={() => onSaveSong(song)}
                isSelected={song.id === selectedSongId}
                isSaved={savedSongs.some(s => s.id === song.id)}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            className={`btn-secondary py-3 px-12 ${
              selectedSongId ? '' : 'opacity-75 cursor-not-allowed'
            }`}
            disabled={!selectedSongId}
          >
            {selectedSongId ? "Start Learning This Song" : "Select a Song to Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepSongSelection;
