'use client';

import React, { useState } from 'react';
import { AuthUser, DEFAULT_USERS } from '@/lib/store';
import { X, Mail, Lock, ShieldCheck, User, LogIn, Sparkles } from 'lucide-react';
import { useToast } from '@/components/toast-provider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);

    // Simulate Google Sign In OAuth process
    setTimeout(() => {
      setIsGoogleLoading(false);
      const isGoogleAdmin = email.toLowerCase().includes('admin') || activeTab === 'admin';
      
      const googleUser: AuthUser = {
        id: `google_${Date.now()}`,
        name: isGoogleAdmin ? 'Google Admin User' : (name || 'Gamer (Google Account)'),
        email: email || (isGoogleAdmin ? 'admin.google@blackout.com' : 'gamer.google@gmail.com'),
        role: isGoogleAdmin ? 'admin' : 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
        provider: 'google',
        points: isGoogleAdmin ? 9999 : 500,
      };

      showToast(`Signed in successfully with Google as ${googleUser.name}!`, 'success');
      onLoginSuccess(googleUser);
      onClose();
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    if (activeTab === 'admin' || email.toLowerCase().includes('admin')) {
      // Check admin login
      if (password && password !== 'admin123' && password !== 'admin') {
        showToast('Invalid admin credentials. Use password: admin123', 'error');
        return;
      }

      const adminUser: AuthUser = DEFAULT_USERS[0];
      showToast('Welcome back, Admin! Redirecting to Admin Control Center...', 'success');
      onLoginSuccess(adminUser);
      onClose();
      return;
    }

    // Regular user login / register
    const userObj: AuthUser = {
      id: `user_${Date.now()}`,
      name: name || email.split('@')[0] || 'Player 1',
      email: email,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      provider: 'email',
      points: 250,
    };

    showToast(`Welcome back, ${userObj.name}!`, 'success');
    onLoginSuccess(userObj);
    onClose();
  };

  const handleQuickDemoAdmin = () => {
    setEmail('admin@blackout.com');
    setPassword('admin123');
    setActiveTab('admin');
  };

  const handleQuickDemoUser = () => {
    setEmail('rahul.gamer@gmail.com');
    setPassword('user123');
    setActiveTab('user');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header decoration bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#f4b400] via-amber-400 to-[#ffc825]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
          id="close-auth-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f4b400]/10 border border-[#f4b400]/30 text-[#f4b400] mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide uppercase font-orbitron">
              BLACKOUT <span className="text-[#f4b400]">AUTH</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Sign in to manage bookings, earn rewards, or access Admin portal
            </p>
          </div>

          {/* Role Tab Selector (User vs Admin) */}
          <div className="grid grid-cols-2 p-1 mb-6 bg-white/5 border border-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab('user');
                setEmail('');
                setPassword('');
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'user'
                  ? 'bg-[#f4b400] text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
              id="auth-tab-user-btn"
            >
              <User className="w-4 h-4" />
              <span>Gamer Account</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setEmail('admin@blackout.com');
                setPassword('admin123');
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
              id="auth-tab-admin-btn"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all shadow-md mb-5 group relative overflow-hidden"
            id="google-sign-in-btn"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span className="text-sm">
              {isGoogleLoading ? 'Connecting Google Account...' : `Sign in with Google ${activeTab === 'admin' ? '(Admin)' : ''}`}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="px-3 text-xs text-gray-500 uppercase tracking-widest">or email login</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && activeTab === 'user' && (
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#f4b400]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                {activeTab === 'admin' ? 'Admin Email Address' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeTab === 'admin' ? 'admin@blackout.com' : 'gamer@example.com'}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#f4b400]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#f4b400]"
                />
              </div>
              {activeTab === 'admin' && (
                <p className="text-[11px] text-[#f4b400] mt-1">
                  Default Admin Pass: <code className="bg-black/60 px-1 py-0.5 rounded">admin123</code>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#f4b400] hover:bg-[#ffc825] text-black font-extrabold text-sm transition-all shadow-lg shadow-[#f4b400]/20 flex items-center justify-center gap-2 mt-2"
              id="submit-auth-btn"
            >
              <LogIn className="w-4 h-4" />
              <span>{activeTab === 'admin' ? 'Access Admin Dashboard' : (isRegisterMode ? 'Create Account' : 'Sign In')}</span>
            </button>
          </form>

          {/* Mode Switch & Quick Fill Shortcuts */}
          <div className="mt-5 pt-4 border-t border-white/10 text-center space-y-3">
            {activeTab === 'user' && (
              <p className="text-xs text-gray-400">
                {isRegisterMode ? 'Already have an account?' : "Don't have a gamer account?"}{' '}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="text-[#f4b400] font-bold hover:underline ml-1"
                >
                  {isRegisterMode ? 'Sign In' : 'Create One'}
                </button>
              </p>
            )}

            {/* Demo Quick fill buttons for testing convenience */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                Fill Admin Credentials
              </button>
              <button
                type="button"
                onClick={handleQuickDemoUser}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                <User className="w-3 h-3" />
                Fill User Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
