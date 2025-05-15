import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { Heart, Music, Trophy } from 'lucide-react';
import { Song } from '../../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ProfilePageProps {
  savedSongs: Song[];
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ savedSongs, onLogout }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-cream-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-charcoal-900">My Profile</h1>
            <button
              onClick={handleLogout}
              className="bg-coral-500 text-white px-4 py-2 rounded-lg hover:bg-coral-600 transition-colors"
            >
              Log Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-cream-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-coral-500 mr-2" />
                <h2 className="text-xl font-bold text-charcoal-900">Saved Songs</h2>
              </div>
              <p className="text-3xl font-bold text-charcoal-900">{savedSongs.length}</p>
            </div>

            <div className="bg-cream-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Music className="h-6 w-6 text-coral-500 mr-2" />
                <h2 className="text-xl font-bold text-charcoal-900">Songs Learned</h2>
              </div>
              <p className="text-3xl font-bold text-charcoal-900">3</p>
            </div>

            <div className="bg-cream-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Trophy className="h-6 w-6 text-coral-500 mr-2" />
                <h2 className="text-xl font-bold text-charcoal-900">Achievement Score</h2>
              </div>
              <p className="text-3xl font-bold text-charcoal-900">250</p>
            </div>
          </div>

          <div className="bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-charcoal-900">My Saved Songs</h2>
            {savedSongs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedSongs.map((song) => (
                  <div key={song.id} className="flex items-center p-4 bg-cream-100 rounded-lg">
                    <img
                      src={song.imageUrl}
                      alt={song.title}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-charcoal-900">{song.title}</h3>
                      <p className="text-charcoal-700">{song.artist}</p>
                      <div className="flex gap-2 mt-1">
                        {song.chords.map((chord) => (
                          <span key={chord.name} className="text-xs bg-white px-2 py-1 rounded">
                            {chord.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-charcoal-700">No saved songs yet. Start exploring and save your favorites!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;