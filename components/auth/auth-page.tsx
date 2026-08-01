'use client';

import React, { useState } from 'react';
import { AuthUser, DEFAULT_USERS } from '@/lib/store';
import {
  ShieldCheck,
  User,
  LogIn,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  X,
  Globe
} from 'lucide-react';
import { useToast } from '../toast-provider';

interface AuthPageProps {
  onLoginSuccess: (user: AuthUser) => void;
  onNavigateHome: () => void;
  accentColor?: string;
}

export function AuthPage({
  onLoginSuccess,
  onNavigateHome,
  accentColor = '#f4b400',
}: AuthPageProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Google OAuth Modal state
  const [showGoogleAccountSelector, setShowGoogleAccountSelector] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  const handleOpenGoogleModal = () => {
    setShowGoogleAccountSelector(true);
  };

  const handleSelectGoogleAccount = (type: 'admin' | 'user' | 'custom', customEmailVal?: string) => {
    setShowGoogleAccountSelector(false);
    setIsGoogleLoading(true);

    setTimeout(() => {
      setIsGoogleLoading(false);

      let selectedUser: AuthUser;

      if (type === 'admin') {
        selectedUser = {
          id: `google_admin_${Date.now()}`,
          name: 'Alex Vance (Google Admin)',
          email: 'admin.google@blackout.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          provider: 'google',
          points: 9999,
        };
      } else if (type === 'user') {
        selectedUser = {
          id: `google_user_${Date.now()}`,
          name: 'Rahul Sharma (Google Account)',
          email: 'rahul.gamer@gmail.com',
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
          provider: 'google',
          points: 750,
        };
      } else {
        const userEmail = customEmailVal || 'user.google@gmail.com';
        const isAdminEmail = userEmail.toLowerCase().includes('admin') || activeTab === 'admin';
        selectedUser = {
          id: `google_custom_${Date.now()}`,
          name: userEmail.split('@')[0] || 'Google User',
          email: userEmail,
          role: isAdminEmail ? 'admin' : 'user',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
          provider: 'google',
          points: isAdminEmail ? 9999 : 300,
        };
      }

      showToast(`Google Authentication successful as ${selectedUser.name}!`, 'success');
      onLoginSuccess(selectedUser);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showToast('Please enter your email address', 'error');
      return;
    }

    if (activeTab === 'admin' || email.toLowerCase().includes('admin')) {
      if (password && password !== 'admin123' && password !== 'admin' && password !== 'blackout2026') {
        showToast('Invalid admin credentials. Use password: admin123', 'error');
        return;
      }

      const adminUser: AuthUser = {
        ...DEFAULT_USERS[0],
        email: email || DEFAULT_USERS[0].email,
      };

      showToast('Admin Logged In! Redirecting to Admin Studio...', 'success');
      onLoginSuccess(adminUser);
      return;
    }

    // Gamer login
    const userObj: AuthUser = {
      id: `user_${Date.now()}`,
      name: name || email.split('@')[0] || 'Gamer Player',
      email: email,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      provider: 'email',
      points: 350,
    };

    showToast(`Welcome back, ${userObj.name}!`, 'success');
    onLoginSuccess(userObj);
  };

  const fillAdminCredentials = () => {
    setActiveTab('admin');
    setEmail('admin@blackout.com');
    setPassword('admin123');
  };

  const fillUserCredentials = () => {
    setActiveTab('user');
    setEmail('rahul.gamer@gmail.com');
    setPassword('user123');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
      {/* Background Glow Effects */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="w-full max-w-xl bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative z-10">
        {/* Top Accent Strip */}
        <div className="h-2 w-full" style={{ backgroundColor: accentColor }} />

        <div className="p-6 sm:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white mb-2 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Main Website
            </button>

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-[#f4b400] mx-auto shadow-inner">
              <Gamepad2 className="w-7 h-7" style={{ color: accentColor }} />
            </div>

            <h1 className="text-3xl font-black text-white uppercase tracking-wider font-orbitron">
              BLACKOUT <span style={{ color: accentColor }}>LOGIN PORTAL</span>
            </h1>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Unified authentication page for Gamers & Administrators. Sign in with Google or Email.
            </p>
          </div>

          {/* Account Role Selector */}
          <div className="grid grid-cols-2 p-1.5 bg-black/60 border border-white/10 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab('user');
                setEmail('');
                setPassword('');
              }}
              className={`py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'user'
                  ? 'text-black shadow-lg font-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={activeTab === 'user' ? { backgroundColor: accentColor } : {}}
            >
              <User className="w-4 h-4" />
              <span>GAMER / USER ACCOUNT</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setEmail('admin@blackout.com');
                setPassword('admin123');
              }}
              className={`py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-black shadow-lg font-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ADMIN CONTROL CENTER</span>
            </button>
          </div>

          {/* GOOGLE SIGN IN BUTTON */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleOpenGoogleModal}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-white hover:bg-gray-100 text-gray-900 font-extrabold text-sm transition-all shadow-xl hover:scale-[1.01] active:scale-95 cursor-pointer"
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
              <span>
                {isGoogleLoading ? 'Connecting to Google...' : `Sign in with Google (${activeTab === 'admin' ? 'Admin' : 'Gamer'})`}
              </span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-white/10" />
              <span className="px-3 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                OR SIGN IN WITH EMAIL
              </span>
              <div className="flex-grow border-t border-white/10" />
            </div>
          </div>

          {/* EMAIL LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && activeTab === 'user' && (
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#f4b400]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                {activeTab === 'admin' ? 'Admin Email Address' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeTab === 'admin' ? 'admin@blackout.com' : 'gamer@gmail.com'}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#f4b400]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#f4b400]"
                />
              </div>
              {activeTab === 'admin' && (
                <p className="text-[11px] text-[#f4b400] mt-1 font-mono">
                  Default Admin Password: <code className="bg-black/60 px-1.5 py-0.5 rounded text-white">admin123</code>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl text-black font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              style={{ backgroundColor: accentColor }}
            >
              <LogIn className="w-4 h-4" />
              <span>
                {activeTab === 'admin'
                  ? 'Access Admin Studio'
                  : isRegisterMode
                  ? 'Create Gamer Account'
                  : 'Sign In To Account'}
              </span>
            </button>
          </form>

          {/* Quick Demo Fill Buttons & Register Link */}
          <div className="pt-4 border-t border-white/10 text-center space-y-4">
            {activeTab === 'user' && (
              <p className="text-xs text-gray-400">
                {isRegisterMode ? 'Already registered?' : "Don't have a gamer account?"}{' '}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="font-bold hover:underline ml-1"
                  style={{ color: accentColor }}
                >
                  {isRegisterMode ? 'Sign In' : 'Create One Now'}
                </button>
              </p>
            )}

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-gray-400 font-semibold">Instant Test Login:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fillAdminCredentials}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition-colors flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> 1-Click Admin
                </button>
                <button
                  type="button"
                  onClick={fillUserCredentials}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-1"
                >
                  <User className="w-3.5 h-3.5" /> 1-Click Gamer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GOOGLE ACCOUNT SELECTOR SIMULATION MODAL */}
      {showGoogleAccountSelector && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#18181b] border border-white/20 rounded-3xl p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowGoogleAccountSelector(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mx-auto shadow-md">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-white">Sign in with Google</h3>
              <p className="text-xs text-gray-400">Choose a Google account to continue to BLACKOUT Esports</p>
            </div>

            <div className="space-y-2">
              {/* Account 1: Admin */}
              <button
                onClick={() => handleSelectGoogleAccount('admin')}
                className="w-full p-3.5 rounded-2xl bg-black/50 border border-white/10 hover:border-amber-400 flex items-center gap-3 text-left transition-all group"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="Admin"
                  className="w-10 h-10 rounded-full object-cover border border-amber-400"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white group-hover:text-amber-400">
                      Alex Vance
                    </p>
                    <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-400 text-[10px] font-bold rounded">
                      ADMIN
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate">admin.google@blackout.com</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Account 2: Gamer */}
              <button
                onClick={() => handleSelectGoogleAccount('user')}
                className="w-full p-3.5 rounded-2xl bg-black/50 border border-white/10 hover:border-emerald-400 flex items-center gap-3 text-left transition-all group"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                  alt="Gamer"
                  className="w-10 h-10 rounded-full object-cover border border-emerald-400"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white group-hover:text-emerald-400">
                      Rahul Sharma
                    </p>
                    <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">
                      GAMER
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate">rahul.gamer@gmail.com</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Custom Google Email Option */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <label className="block text-[11px] font-semibold text-gray-400">
                Or enter another Google Email:
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="custom.google@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
                <button
                  onClick={() => handleSelectGoogleAccount('custom', customGoogleEmail)}
                  className="px-3 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-gray-200"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
