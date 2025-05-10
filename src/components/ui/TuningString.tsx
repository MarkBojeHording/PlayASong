import React from 'react';
import { TuningNote } from '../../types';

interface TuningStringProps {
  note: TuningNote;
  onPlay: () => void;
  onTuned: () => void;
}

const TuningString: React.FC<TuningStringProps> = ({ note, onPlay, onTuned }) => {
  return (
    <div className={`p-4 rounded-lg border ${
      note.isInTune ? 'border-green-500 bg-green-50' : 'border-gray-200'
    } flex items-center`}>
      <div className="flex-grow">
        <h3 className="text-lg font-medium">{note.name}</h3>
        <p className="text-sm text-charcoal-700">
          {note.isInTune ? (
            <span className="text-green-600">In tune!</span>
          ) : (
            <span>Waiting for tuning...</span>
          )}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onPlay}
          className="bg-coral-500 hover:bg-coral-600 text-white px-3 py-1 rounded transition-colors"
        >
          Play
        </button>
        {!note.isInTune && (
          <button
            onClick={onTuned}
            className="bg-teal-900 hover:bg-teal-800 text-white px-3 py-1 rounded transition-colors"
          >
            Mark Tuned
          </button>
        )}
      </div>
    </div>
  );
};

export default TuningString;