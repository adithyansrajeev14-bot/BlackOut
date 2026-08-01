'use client';

import React, { useState, useEffect } from 'react';
import { Gamepad2, ShieldAlert, Menu, X, Calendar, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export function Navbar({ activeTab, setActiveTab, onOpenAdmin, isAdminLoggedIn }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'games', label: 'Games' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#f4b400]/20 py-3 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f4b400] to-[#b88600] flex items-center justify-center shadow-lg shadow-[#f4b400]/30 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-6 h-6 text-black font-bold" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white uppercase font-sans">
              BLACK<span className="text-[#f4b400]">OUT</span>
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-[#f4b400]/80 uppercase font-semibold">
              Esports Gaming Cafe
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#141414]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#f4b400] text-black font-bold shadow-[0_0_12px_rgba(244,180,0,0.5)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('book')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f4b400] to-[#ffc107] text-black font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(244,180,0,0.4)] hover:shadow-[0_0_30px_rgba(244,180,0,0.7)] hover:scale-[1.03] active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            BOOK SLOT
          </button>

          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              isAdminLoggedIn
                ? 'bg-amber-500/20 text-[#f4b400] border-[#f4b400]/50'
                : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#f4b400]/40 hover:text-white'
            }`}
          >
            {isAdminLoggedIn ? <UserCheck className="w-3.5 h-3.5 text-[#f4b400]" /> : <ShieldAlert className="w-3.5 h-3.5" />}
            {isAdminLoggedIn ? 'ADMIN PANEL' : 'ADMIN'}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => handleNavClick('book')}
            className="px-3 py-1.5 rounded-full bg-[#f4b400] text-black font-bold text-xs"
          >
            BOOK
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#141414] text-gray-300 border border-white/10 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#f4b400]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#f4b400]/30 px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2.5 px-4 rounded-xl text-base font-semibold transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#f4b400]/20 text-[#f4b400] border border-[#f4b400]/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => handleNavClick('book')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f4b400] to-[#ffc107] text-black font-bold text-center shadow-lg shadow-[#f4b400]/20"
                >
                  Book Slot Now
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#141414] border border-[#f4b400]/30 text-gray-200 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4 text-[#f4b400]" />
                  {isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
