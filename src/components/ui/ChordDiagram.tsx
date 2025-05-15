import React from 'react';
import { Chord } from '../../types';

interface ChordDiagramProps {
  chord: Chord;
  isActive: boolean;
}

const ChordDiagram: React.FC<ChordDiagramProps> = ({ chord, isActive }) => {
  return (
    <div className={`p-4 rounded-lg ${isActive ? 'bg-white' : 'bg-cream-100'}`}>
      <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-coral-500' : 'text-charcoal-900'}`}>
        {chord.name}
      </h3>
      
      {/* Chord diagram */}
      <div className="w-48 h-64 relative mb-4">
        {/* Fretboard */}
        <div className="absolute inset-0 flex flex-col">
          {/* Nut */}
          <div className="h-2 bg-charcoal-900 rounded-t"></div>
          
          {/* Frets */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-1 border-b-2 border-charcoal-700 relative">
              {/* Strings */}
              <div className="absolute inset-0 flex justify-between px-1">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="w-px bg-charcoal-600"></div>
                ))}
              </div>
              
              {/* Fret number */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-sm text-charcoal-700">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
        
        {/* Finger positions */}
        {chord.fingering.split('-').map((pos, stringIndex) => {
          const fret = parseInt(pos);
          if (fret > 0) {
            return (
              <div
                key={stringIndex}
                className="absolute w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(stringIndex * 20) + 10}%`,
                  top: `${(fret * 20) - 10}%`,
                }}
              >
                {fret}
              </div>
            );
          }
          return null;
        })}
      </div>
      
      <div className="text-sm text-charcoal-700">
        <p className="mb-1"><span className="font-medium">Position:</span> {chord.position}</p>
        <p><span className="font-medium">Fingering:</span> {chord.fingering}</p>
      </div>
    </div>
  );
};

export default ChordDiagram;