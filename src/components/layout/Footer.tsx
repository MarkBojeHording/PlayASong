import React from 'react';
import { Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-900 text-cream-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-coral-500">PlayASong</h3>
            <p className="mb-4">Your gateway to guitar mastery. Learn your favorite songs in minutes with AI-guided lessons.</p>
            <p>Reach us at <a href="mailto:hello@playasong.com" className="text-coral-500 hover:underline">hello@playasong.com</a></p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-cream-100">Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-coral-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-coral-500 transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#" className="hover:text-coral-500 transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-coral-500 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-cream-100">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-coral-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-coral-500 transition-colors">Terms of Use</a>
              </li>
              <li>
                <a href="#" className="hover:text-coral-500 transition-colors">Cookie Policy</a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-bold mb-4 text-cream-100">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-cream-100 hover:text-coral-500 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-cream-100 hover:text-coral-500 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-cream-100 hover:text-coral-500 transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-teal-800 text-center">
          <p>&copy; {new Date().getFullYear()} PlayASong. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;