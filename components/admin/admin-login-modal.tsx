'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, X, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../toast-provider';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export function AdminLoginModal({ isOpen, onClose, onLoginSuccess }: AdminLoginModalProps) {
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Default password check: blackout2026 or admin
    if (password === 'blackout2026' || password === 'admin') {
      showToast('Admin Logged In', 'Welcome to Blackout Control Center', 'success');
      setPassword('');
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
      showToast('Authentication Failed', 'Invalid admin password.', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
      >
        <div className="max-w-sm w-full bg-[#141414] border border-[#f4b400]/40 rounded-3xl p-6 shadow-2xl relative space-y-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#f4b400]/20 border border-[#f4b400]/40 flex items-center justify-center text-[#f4b400] mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white uppercase">Admin Portal</h3>
            <p className="text-xs text-gray-400">Enter access key to manage bookings and stations</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Password (default: blackout2026)"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`w-full bg-[#0a0a0a] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none ${
                    error ? 'border-red-500' : 'border-white/10 focus:border-[#f4b400]'
                  }`}
                />
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                Tip: Try password <code className="text-[#f4b400]">blackout2026</code> or <code className="text-[#f4b400]">admin</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f4b400] to-[#ffc107] text-black font-extrabold text-xs uppercase tracking-wider gold-glow cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              Unlock Dashboard
            </button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
