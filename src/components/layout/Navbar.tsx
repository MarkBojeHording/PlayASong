import React, { useState } from 'react';
import { Menu, X, Guitar } from 'lucide-react';

interface NavbarProps {
  currentStep: number;
  onNavigate: (step: number) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentStep, 
  onNavigate, 
  isLoggedIn, 
  onLogin, 
  onLogout 
}) => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate(1)} 
              className="flex items-center space-x-2"
            >
              <Guitar className="h-8 w-8 text-coral-500" />
              <span className="text-xl font-bold text-coral-500">PlayASong</span>
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate(1)} 
              className="text-cream-100 hover:text-coral-500 transition-colors"
            >
              Home
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
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-cream-100">Hi, User</span>
                <button
                  onClick={onLogout}
                  className="bg-teal-800 hover:bg-teal-700 text-white px-3 py-1 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onLogin}
                  className="bg-teal-800 hover:bg-teal-700 text-white px-3 py-1 rounded-md transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={onLogin}
                  className="bg-coral-500 hover:bg-coral-600 text-white px-3 py-1 rounded-md transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
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
              Home
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
            {isLoggedIn ? (
              <>
                <div className="px-3 py-2 text-cream-100">Hi, User</div>
                <button
                  onClick={() => {
                    onLogout();
                    toggleMenu();
                  }}
                  className="block w-full px-3 py-2 text-left rounded-md bg-teal-700 text-white hover:bg-teal-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onLogin();
                    toggleMenu();
                  }}
                  className="block w-full px-3 py-2 text-left rounded-md bg-teal-700 text-white hover:bg-teal-600"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onLogin();
                    toggleMenu();
                  }}
                  className="block w-full px-3 py-2 text-left rounded-md bg-coral-500 text-white hover:bg-coral-600"
                >
                  Sign Up
                </button>
              </div>
            )}
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
            <p className="mb-6 text-charcoal-700">Start free, then go unlimited.</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                  <svg
                    className="absolute h-5 w-5 text-coral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-charcoal-800">
                  <span className="font-medium">Free Tier:</span> Learn one song free. No payment required.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                  <svg
                    className="absolute h-5 w-5 text-coral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-charcoal-800">
                  <span className="font-medium">Premium Tier:</span> $9.99/month for unlimited songs, advanced AI feedback, and new songs monthly.
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-cream-100 rounded-lg mb-6">
              <h3 className="font-medium text-charcoal-900 mb-2">Compare Plans</h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="col-span-1 font-medium">Feature</div>
                <div className="col-span-1 text-center font-medium">Free</div>
                <div className="col-span-1 text-center font-medium">Premium</div>
                
                <div className="col-span-1">Songs</div>
                <div className="col-span-1 text-center">1</div>
                <div className="col-span-1 text-center">Unlimited</div>
                
                <div className="col-span-1">Feedback</div>
                <div className="col-span-1 text-center">Basic</div>
                <div className="col-span-1 text-center">Advanced</div>
                
                <div className="col-span-1">Support</div>
                <div className="col-span-1 text-center">None</div>
                <div className="col-span-1 text-center">Priority</div>
              </div>
            </div>
            
            <p className="text-sm text-charcoal-700 mb-6">
              Cancel anytime. 30-day money-back guarantee.
            </p>
            
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => {
                  onNavigate(1);
                  togglePricing();
                }}
                className="btn-primary"
              >
                Start Free
              </button>
              <button 
                onClick={togglePricing}
                className="btn-secondary"
              >
                Subscribe for $9.99/month
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;