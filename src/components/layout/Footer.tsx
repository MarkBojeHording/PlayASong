import React from 'react';
import { Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-900 text-cream-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-coral-500">PlayASong</h3>
            <p className="text-sm mt-1">Learn guitar with AI-guided lessons</p>
          </div>

          <div className="flex space-x-8">
            <div>
              <h4 className="font-semibold text-sm mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-sm hover:text-coral-500 transition-colors">Home</a></li>
                <li><a href="#" className="text-sm hover:text-coral-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm hover:text-coral-500 transition-colors">About</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Legal</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-sm hover:text-coral-500 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-sm hover:text-coral-500 transition-colors">Terms</a></li>
                <li><a href="#" className="text-sm hover:text-coral-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-coral-500 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="hover:text-coral-500 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="hover:text-coral-500 transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-teal-800 text-center">
          <p className="text-sm text-cream-200">&copy; {new Date().getFullYear()} PlayASong. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
