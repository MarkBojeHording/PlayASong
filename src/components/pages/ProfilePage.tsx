import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { Heart, Music, LogOut, X } from 'lucide-react';
import { Song } from '../../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ProfilePageProps {
  savedSongs: Song[];
  onLogout: () => void;
  onSaveSong: (song: Song) => void;
  onRemoveSong: (song: Song) => void;
  onNavigate: (step: number, song?: Song) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ savedSongs, onLogout, onSaveSong, onRemoveSong, onNavigate }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleRemoveSong = (song: Song) => {
    onRemoveSong(song);
  };

  const handleBrowseSongs = () => {
    onNavigate(4);
  };

  return (
    <div className="min-h-screen bg-cream-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-charcoal-900">My Profile</h1>
                <p className="text-charcoal-700">Guitar Enthusiast</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleBrowseSongs}
                className="flex items-center gap-2 bg-teal-900 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors"
              >
                <Music className="h-5 w-5" />
                Browse Songs
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-coral-500 text-white px-4 py-2 rounded-lg hover:bg-coral-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Log Out
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-cream-100 p-6 rounded-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-coral-500 mr-2" />
                <h2 className="text-xl font-bold text-charcoal-900">Saved Songs</h2>
              </div>
              <p className="text-3xl font-bold text-charcoal-900">{savedSongs.length}</p>
            </div>

            <div className="bg-cream-100 p-6 rounded-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <Music className="h-6 w-6 text-coral-500 mr-2" />
                <h2 className="text-xl font-bold text-charcoal-900">Songs Learned</h2>
              </div>
              <p className="text-3xl font-bold text-charcoal-900">3</p>
            </div>
          </div>

          <div className="bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-charcoal-900">My Saved Songs</h2>
            {savedSongs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedSongs.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => onNavigate(5, song)}
                    className="flex items-center p-4 bg-cream-100 rounded-lg transform hover:scale-105 transition-transform cursor-pointer relative group"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSong(song);
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                      title="Remove song"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                    <img
                      src={song.imageUrl}
                      alt={song.title}
                      className="w-20 h-20 object-cover rounded-lg mr-4 shadow-md"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-charcoal-900">{song.title}</h3>
                      <p className="text-charcoal-700 mb-2">{song.artist}</p>
                      <div className="flex flex-wrap gap-2">
                        {song.chords.map((chord) => (
                          <span
                            key={chord.name}
                            className="text-xs bg-white px-2 py-1 rounded shadow-sm text-coral-500 font-medium"
                          >
                            {chord.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-charcoal-700 text-lg">No saved songs yet. Start exploring and save your favorites!</p>
                <button
                  onClick={handleBrowseSongs}
                  className="mt-4 bg-coral-500 text-white px-6 py-2 rounded-lg hover:bg-coral-600 transition-colors"
                >
                  Browse Songs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
