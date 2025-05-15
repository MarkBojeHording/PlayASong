export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: 'rock' | 'pop';
  chords: Chord[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  previewUrl: string;
  imageUrl: string;
  videoUrl: string;
  lyrics: SongLyric[];
}

export interface SongLyric {
  line: string;
  chords: string[];
  timing: number;
}

export interface Chord {
  name: string;
  position: string;
  fingering: string;
  diagramUrl: string;
  audioUrl: string;
  videoUrl: string;
}

export interface TuningNote {
  name: string;
  frequency: number;
  isInTune: boolean;
  audioUrl: string;
  videoUrl: string;
}

export interface User {
  id: string;
  email: string;
  savedSongs: string[];
  songsCompleted: string[];
  createdAt: string;
}