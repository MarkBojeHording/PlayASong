import React from 'react';

interface StepPickupProps {
  onNext: () => void;
}

const StepPickup: React.FC<StepPickupProps> = ({ onNext }) => {
  return (
    <div className="step-container fade-in">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-3 text-charcoal-900">Grab Your Guitar</h1>
        <p className="text-xl text-charcoal-700">Let's get ready to play.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Acoustic guitar in a comfortable setting"
            className="rounded-lg shadow-lg w-full object-cover"
            style={{ maxHeight: '500px' }}
          />
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-charcoal-900">Before We Start</h2>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 bg-coral-500 rounded-full text-white flex items-center justify-center mr-3 mt-0.5">
                  1
                </div>
                <p className="text-charcoal-800">
                  Take your acoustic or electric guitar and find a quiet, comfortable spot.
                </p>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 bg-coral-500 rounded-full text-white flex items-center justify-center mr-3 mt-0.5">
                  2
                </div>
                <p className="text-charcoal-800">
                  Check that your strings are in good condition—we'll tune them in the next step.
                </p>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 bg-coral-500 rounded-full text-white flex items-center justify-center mr-3 mt-0.5">
                  3
                </div>
                <p className="text-charcoal-800">
                  Make sure you're in a position where you can strum comfortably.
                </p>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 bg-coral-500 rounded-full text-white flex items-center justify-center mr-3 mt-0.5">
                  4
                </div>
                <p className="text-charcoal-800">
                  Your device's microphone will be used to analyze your playing, so ensure it's enabled.
                </p>
              </li>
            </ul>
          </div>
          
          <div className="bg-cream-200 border-l-4 border-teal-900 p-4 rounded-r-lg mb-8">
            <h3 className="font-medium text-charcoal-900 mb-2">Pro Tip</h3>
            <p className="text-charcoal-800">
              New to guitar? Don't worry! PlayASong's AI makes it simple to start, even if this is your very first time holding a guitar. We'll guide you through every step.
            </p>
          </div>
          
          <button onClick={onNext} className="btn-secondary w-full py-3">
            I'm Ready
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepPickup;