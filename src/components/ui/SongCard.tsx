import React from 'react';
import { Music, Heart } from 'lucide-react';
import { Song } from '../../types';

interface SongCardProps {
  song: Song;
  onSelect: (song: Song) => void;
  onSave: () => void;
  isSelected: boolean;
  isSaved: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  onSelect, 
  onSave,
  isSelected,
  isSaved
}) => {
  const playPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = new Audio(song.previewUrl);
    audio.play();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave();
  };

  return (
    <div 
      className={`border rounded-lg overflow-hidden shadow-md cursor-pointer transition-all hover:shadow-coral hover:scale-105 ${
        isSelected ? 'border-coral-500 shadow-coral' : 'border-gray-200'
      }`}
      onClick={() => onSelect(song)}
    >
      <div className="relative h-40">
        <img
          src={song.imageUrl}
          alt={`${song.title} by ${song.artist}`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={playPreview}
          className="absolute bottom-2 right-2 bg-teal-900 text-white p-2 rounded-full hover:bg-teal-800 transition-colors"
          aria-label="Play preview"
        >
          <Music size={16} />
        </button>
        <button
          onClick={handleSave}
          className={`absolute bottom-2 right-12 p-2 rounded-full transition-colors ${
            isSaved 
              ? 'bg-coral-500 text-white' 
              : 'bg-teal-900 text-white hover:bg-teal-800'
          }`}
          aria-label={isSaved ? "Saved" : "Save song"}
        >
          <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
        </button>
        <div className="absolute top-2 left-2 bg-cream-100 text-charcoal-800 px-2 py-1 text-xs font-medium rounded">
          {song.difficulty}
        </div>
        <div className="absolute top-2 right-2 bg-cream-100 text-charcoal-800 px-2 py-1 text-xs font-medium rounded capitalize">
          {song.genre}
        </div>
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-bold text-charcoal-900 mb-1">{song.title}</h3>
        <p className="text-charcoal-700 text-sm mb-2">{song.artist}</p>
        <div className="flex flex-wrap gap-1">
          {song.chords.map((chord) => (
            <span key={chord.name} className="bg-cream-100 text-charcoal-800 px-2 py-1 text-xs rounded">
              {chord.name}
            </span>
          ))}
        </div>
        <button
          className={`w-full mt-4 py-2 rounded ${
            isSelected 
              ? 'bg-coral-500 text-white'
              : 'bg-teal-900 text-white hover:bg-teal-800'
          }`}
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>
      </div>
    </div>
  );
};

export default SongCard;