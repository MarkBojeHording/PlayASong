import React from 'react';

interface StepPickupProps {
  onNext: () => void;
}

const StepPickup: React.FC<StepPickupProps> = ({ onNext }) => {
  return (
    <div className="step-container fade-in">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-3 text-white">Grab Your Guitar</h1>
        <p className="text-xl text-white">Let's get ready to play.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-charcoal-900 text-center">Before We Start</h2>
          
          <div className="flex flex-col md:flex-row gap-8 mb-6">
            <div className="flex-1">
              <ul className="space-y-3">
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
            
            <div className="flex-1">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Person sitting with guitar in correct posture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm">
                    Sit up straight with the guitar resting on your leg, neck at a slight angle
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-cream-200 p-4 rounded-lg">
              <h3 className="font-medium text-charcoal-900 mb-2">Proper Guitar Posture</h3>
              <ul className="text-charcoal-800 space-y-2 text-sm">
                <li>• Keep your back straight and shoulders relaxed</li>
                <li>• Rest the guitar body on your right leg (if right-handed)</li>
                <li>• Hold the neck at a slight upward angle</li>
                <li>• Keep your wrist straight when holding the neck</li>
                <li>• Position the guitar close to your body</li>
              </ul>
            </div>

            <div className="bg-cream-200 p-4 rounded-lg">
              <h3 className="font-medium text-charcoal-900 mb-2">Pro Tip</h3>
              <p className="text-charcoal-800">
                New to guitar? Don't worry! PlayASong's AI makes it simple to start, even if this is your very first time holding a guitar. We'll guide you through every step.
              </p>
            </div>
          </div>
        </div>

        <button onClick={onNext} className="bg-coral-500 hover:bg-coral-600 text-white w-full py-3 rounded-lg transition-colors">
          I'm Ready
        </button>
      </div>
    </div>
  );
};

export default StepPickup;