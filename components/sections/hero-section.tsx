'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Tag, ShieldCheck, Zap, Trophy, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onBookClick: () => void;
  onPricingClick: () => void;
}

export function HeroSection({ onBookClick, onPricingClick }: HeroSectionProps) {
  const stats = [
    { value: '25+', label: 'RTX 4090 Rigs', icon: Zap },
    { value: '10+', label: 'PS5 Pro Stations', icon: ShieldCheck },
    { value: '1 Gbps', label: 'Ultra Low Ping', icon: Tag },
    { value: '4.9 ★', label: '5,000+ Gamers', icon: Users },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blackout_hero.jpg"
          alt="BLACKOUT Gaming Lounge"
          fill
          priority
          className="object-cover object-center scale-105 filter brightness-50 contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505]/60 to-[#050505]" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414]/90 border border-[#f4b400]/40 backdrop-blur-md shadow-[0_0_15px_rgba(244,180,0,0.25)]"
        >
          <Trophy className="w-4 h-4 text-[#f4b400]" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            #1 Premier Esports Lounge & Arena
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none font-sans"
        >
          LEVEL UP YOUR <br />
          <span className="gold-gradient-text drop-shadow-[0_0_25px_rgba(244,180,0,0.3)]">
            GAMING EXPERIENCE
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed font-normal"
        >
          Experience high-end gaming with premium consoles, tournaments, fast internet and luxury gaming spaces.
        </motion.p>

        {/* Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#f4b400] via-[#ffc107] to-[#f4b400] text-black font-extrabold text-base uppercase tracking-wider gold-glow hover:gold-glow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-5 h-5" />
            BOOK SLOT NOW
          </button>

          <button
            onClick={onPricingClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#141414]/90 border border-white/20 text-white font-bold text-base uppercase tracking-wider hover:border-[#f4b400]/60 hover:text-[#f4b400] hover:bg-[#1a1a1a] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <Tag className="w-5 h-5" />
            VIEW PRICING
          </button>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl glass-gold-card flex flex-col items-center justify-center text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-[#f4b400]/10 flex items-center justify-center mb-2 text-[#f4b400] group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-0.5">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
