import React from 'react';
import { Sparkles, Music } from 'lucide-react';
import Badge from '../ui/Badge';
import TestimonialCard from '../ui/TestimonialCard';

interface StepWelcomeProps {
  onNext: () => void;
}

const StepWelcome: React.FC<StepWelcomeProps> = ({ onNext }) => {
  return (
    <div className="step-container fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-charcoal-900">Play a Song Today with PlayASong</h1>
          <p className="text-xl mb-6 text-charcoal-700">
            Learn your favorite guitar song in minutes with AI-guided lessons. 
            Your first song is free, then unlock more for $9.99/month.
          </p>
          <div className="mb-8">
            <p className="text-lg mb-4 text-charcoal-800">
              PlayASong combines advanced AI with simple, beginner-friendly steps to help you 
              master guitar chords fast. Trusted by music lovers worldwide.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge 
                label="AI-Driven Learning" 
                icon={<Sparkles size={16} />} 
                color="teal" 
              />
              <Badge 
                label="Perfect for Beginners" 
                icon={<Music size={16} />} 
                color="coral" 
              />
            </div>
          </div>
          <button onClick={onNext} className="btn-primary">
            Start for Free
          </button>
        </div>
        
        <div>
          <img
            src="https://images.pexels.com/photos/1656066/pexels-photo-1656066.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Guitarist playing in a comfortable setting"
            className="rounded-lg shadow-lg w-full object-cover"
            style={{ maxHeight: '500px' }}
          />
          
          <div className="mt-8">
            <TestimonialCard 
              quote="I played 'Horse with No Name' in one session! So easy and intuitive. PlayASong made guitar learning fun again."
              author="Alex R."
            />
          </div>
        </div>
      </div>
      
      <div className="mt-16 p-6 bg-white rounded-lg shadow-md">
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
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-2 text-charcoal-900">One song free, no credit card needed</h2>
        <p className="text-lg mb-4 text-charcoal-700">Subscribe for $9.99/month for unlimited songs</p>
        <button onClick={onNext} className="btn-primary">
          Start Your Free Song
        </button>
      </div>
    </div>
  );
};

export default StepWelcome;