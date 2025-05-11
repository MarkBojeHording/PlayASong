import React from 'react';
import { Guitar } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-900 text-white py-6">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center px-4">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Guitar className="h-6 w-6 text-coral-500" />
            <span className="text-lg font-semibold text-coral-500">© 2024</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="text-cream-100 hover:text-coral-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-cream-100 hover:text-coral-500 transition-colors">Terms of Service</a>
            <a href="#" className="text-cream-100 hover:text-coral-500 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
