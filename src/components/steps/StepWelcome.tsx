import React from 'react';

interface StepWelcomeProps {
  onNext: () => void;
}

const StepWelcome: React.FC<StepWelcomeProps> = ({ onNext }) => {
  return (
    <div className="step-container fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Play a Song</h1>
        <p className="text-xl text-white">
          Learn your favorite guitar song in minutes with AI-guided lessons.
        </p>
      </div>

      <div className="mt-16 p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-charcoal-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-teal-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-medium mb-2">Pick Up Your Guitar</h3>
            <p className="text-charcoal-700">Get comfortable with your instrument and prepare to play.</p>
          </div>

          <div className="text-center">
            <div className="bg-teal-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-medium mb-2">Tune & Select Song</h3>
            <p className="text-charcoal-700">Our AI helps you tune perfectly and choose a beginner-friendly song.</p>
          </div>

          <div className="text-center">
            <div className="bg-teal-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-medium mb-2">Learn & Play</h3>
            <p className="text-charcoal-700">Follow the chord diagrams with AI feedback until you've mastered the song.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button onClick={onNext} className="btn-primary text-2xl px-16 py-5 rounded-lg transform hover:scale-105 transition-transform">
          Start Your Free Song
        </button>
      </div>
    </div>
  );
};

export default StepWelcome;
