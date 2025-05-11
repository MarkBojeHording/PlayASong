import React, { useState } from 'react';
import { Menu, X, Guitar, Sparkles, Music, Heart } from 'lucide-react';

interface NavbarProps {
  onNavigate: (step: number) => void;
  currentStep: number;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePricing = () => {
    setShowPricing(!showPricing);
  };

  return (
    <nav className="bg-teal-900 text-white sticky top-0 z-50 shadow-md">
      <div className="w-full">
        <div className="flex justify-between h-20 px-4">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate(1)}
              className="flex items-center space-x-3"
            >
              <Guitar className="h-10 w-10 text-coral-500" />
              <span className="text-2xl font-bold text-coral-500">PlayASong</span>
            </button>
          </div>

          {/* Badges */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-teal-800 px-3 py-1 rounded-full">
              <Sparkles className="h-4 w-4 text-coral-500" />
              <span className="text-sm text-cream-100">AI-Driven Learning</span>
            </div>
            <div className="flex items-center space-x-1 bg-teal-800 px-3 py-1 rounded-full">
              <Music className="h-4 w-4 text-coral-500" />
              <span className="text-sm text-cream-100">Perfect for Beginners</span>
            </div>
            <div className="flex items-center space-x-1 bg-teal-800 px-3 py-1 rounded-full">
              <Heart className="h-4 w-4 text-coral-500" />
              <span className="text-sm text-cream-100">Easy and Simple for Everyone</span>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate(1)}
              className="text-cream-100 hover:text-coral-500 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={togglePricing}
              className="text-cream-100 hover:text-coral-500 transition-colors"
            >
              Pricing
            </button>
            <button
              className="text-cream-100 hover:text-coral-500 transition-colors"
            >
              About
            </button>
            <button
              className="text-cream-100 hover:text-coral-500 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-cream-100 hover:text-coral-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-teal-800">
            <button
              onClick={() => {
                onNavigate(1);
                toggleMenu();
              }}
              className="block px-3 py-2 w-full text-left rounded-md text-cream-100 hover:bg-teal-700 hover:text-coral-500"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                togglePricing();
                toggleMenu();
              }}
              className="block px-3 py-2 w-full text-left rounded-md text-cream-100 hover:bg-teal-700 hover:text-coral-500"
            >
              Pricing
            </button>
            <button
              className="block px-3 py-2 w-full text-left rounded-md text-cream-100 hover:bg-teal-700 hover:text-coral-500"
            >
              About
            </button>
            <button
              className="block px-3 py-2 w-full text-left rounded-md text-cream-100 hover:bg-teal-700 hover:text-coral-500"
            >
              Contact
            </button>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-charcoal-900">PlayASong Pricing</h2>
              <button onClick={togglePricing} className="text-charcoal-700 hover:text-charcoal-900">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-charcoal-900">Free Trial</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-charcoal-700">
                    <span className="mr-2">✓</span> Learn one complete song
                  </li>
                  <li className="flex items-center text-charcoal-700">
                    <span className="mr-2">✓</span> Basic AI feedback
                  </li>
                  <li className="flex items-center text-charcoal-700">
                    <span className="mr-2">✓</span> Guitar tuner
                  </li>
                </ul>
                <button className="w-full bg-coral-500 text-white py-2 rounded-lg hover:bg-coral-600 transition-colors">
                  Start Free Trial
                </button>
              </div>

              <div className="bg-teal-900 p-6 rounded-lg text-white">
                <h3 className="text-xl font-bold mb-2">Premium Membership</h3>
                <div className="text-2xl font-bold mb-4">$9.99/month</div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Unlimited songs
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Advanced AI feedback
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Save favorite songs
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Adjustable learning pace
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Progress tracking
                  </li>
                </ul>
                <button className="w-full bg-coral-500 text-white py-2 rounded-lg hover:bg-coral-600 transition-colors">
                  Subscribe Now
                </button>
              </div>

              <p className="text-sm text-center text-charcoal-700">
                No commitment required. Cancel anytime.
                <br />
                30-day money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
