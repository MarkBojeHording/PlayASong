import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ResetPasswordPageProps {
  onBack: () => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setIsResetting(true);
      setError('');

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/new-password`,
      });

      if (error) throw error;

      setResetSent(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentStep={1}
        onNavigate={() => {}}
        isAuthenticated={false}
        onLoginClick={() => {}}
        onProfileClick={() => {}}
      />
      <main className="flex-grow flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1920')",
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(0, 0, 0, 0.35)"
            }}>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            Reset Your Password
          </h1>
          <p className="text-charcoal-700 text-center mb-8">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {resetSent ? (
            <div className="text-center">
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                <p className="mb-2">Password reset instructions have been sent to:</p>
                <p className="font-medium">{email}</p>
              </div>
              <p className="text-charcoal-700 mb-6">
                Please check your email and follow the instructions to reset your password.
              </p>
              <button
                onClick={onBack}
                className="text-coral-500 hover:text-coral-600 transition-colors"
              >
                Back to login
              </button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isResetting}
                className="w-full bg-coral-500 text-white py-2 rounded-lg hover:bg-coral-600 transition-colors disabled:opacity-50"
              >
                {isResetting ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-charcoal-700 hover:text-coral-500 transition-colors"
                >
                  Back to login
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
