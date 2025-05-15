import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
      onLogin();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setIsResettingPassword(true);
      setError('');

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
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
      setIsResettingPassword(false);
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
            {isSignUp ? 'Create Account' : 'Welcome Back!'}
          </h1>
          <p className="text-charcoal-700 text-center mb-8">
            {isSignUp
              ? 'Join us to start your guitar learning journey'
              : 'Sign in to continue your guitar learning journey'
            }
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {resetSent && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
              Password reset instructions have been sent to your email address.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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

            {!isResettingPassword && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                  required
                />
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    className="text-sm text-coral-500 hover:text-coral-600 transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            )}

            {!isResettingPassword && (
              <button
                type="submit"
                className="w-full bg-coral-500 text-white py-2 rounded-lg hover:bg-coral-600 transition-colors"
              >
                {isSignUp ? 'Sign Up' : 'Log In'}
              </button>
            )}

            {isResettingPassword && (
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={isResettingPassword}
                className="w-full bg-coral-500 text-white py-2 rounded-lg hover:bg-coral-600 transition-colors disabled:opacity-50"
              >
                {isResettingPassword ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>
            )}
          </form>

          {!isResettingPassword && (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-charcoal-700 hover:text-coral-500 transition-colors"
                >
                  {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </>
          )}

          {isResettingPassword && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsResettingPassword(false);
                  setResetSent(false);
                }}
                className="text-charcoal-700 hover:text-coral-500 transition-colors"
              >
                Back to login
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
