import React from 'react';
import { Chord } from '../../types';

interface ChordDiagramProps {
  chord: Chord;
  isActive: boolean;
}

const ChordDiagram: React.FC<ChordDiagramProps> = ({ chord, isActive }) => {
  // In a real app, you would use SVG to render a proper chord diagram
  // This is a simplified version with a placeholder
  return (
    <div className={`p-4 rounded-lg border ${isActive ? 'border-coral-500 shadow-coral' : 'border-gray-200'}`}>
      <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-coral-500' : 'text-charcoal-900'}`}>
        {chord.name}
      </h3>
      <div className="w-24 h-32 bg-cream-100 rounded mb-2 flex items-center justify-center">
        {/* Placeholder for chord diagram image */}
        <span className="text-charcoal-700 text-sm">
          {chord.position}
        </span>
      </div>
      <p className="text-sm text-charcoal-700">
        <span className="font-medium">Fingering:</span> {chord.fingering}
      </p>
    </div>
  );
};

export default ChordDiagram;