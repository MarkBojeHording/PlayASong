export interface Song {
  id: string;
  title: string;
  artist: string;
  chords: Chord[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  previewUrl: string;
  imageUrl: string;
}

export interface Chord {
  name: string;
  position: string;
  fingering: string;
  diagramUrl: string;
}

export interface TuningNote {
  name: string;
  frequency: number;
  isInTune: boolean;
}

export interface User {
  name: string;
  isPremium: boolean;
  songsCompleted: string[];
}