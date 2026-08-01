'use client';

import React from 'react';
import { Wifi, Cpu, Armchair, Trophy, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export function AboutSection() {
  const highlights = [
    {
      icon: Cpu,
      title: 'Monster Gaming Rigs',
      desc: 'Liquid-cooled RTX 4080/4090 setups paired with 240Hz ZOWIE esports monitors and ultra-fast mechanical peripherals.',
    },
    {
      icon: Wifi,
      title: '1 Gbps Low-Ping Fiber',
      desc: 'Dedicated enterprise fiber lines with direct peer routing for near-zero latency in Valorant, COD, and CS2.',
    },
    {
      icon: Armchair,
      title: 'Ergonomic Luxury Seating',
      desc: 'Custom Herman Miller & Secretlab Titan EVO series gaming chairs designed for 8+ hour marathon sessions.',
    },
    {
      icon: Trophy,
      title: 'Competitive Tournaments',
      desc: 'Weekly LAN tournaments with prize pools, live casting, and rankings across EA FC, Valorant, and COD.',
    },
  ];

  return (
    <section id="about" className="py-24 relative z-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4b400]/10 border border-[#f4b400]/30 text-[#f4b400] text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            Welcome to BLACKOUT
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            WHERE CHAMPIONS <span className="text-[#f4b400]">ARE FORGED</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            BLACKOUT GAMING CAFE is built by pro gamers for gamers. We bridge the gap between casual lounge gaming and high-stakes esports arenas.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-gold-card relative group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f4b400]/15 border border-[#f4b400]/30 flex items-center justify-center text-[#f4b400] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1 text-xs text-[#f4b400] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Certified Pro Spec</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mission & Atmosphere Banner */}
        <div className="mt-16 rounded-3xl p-8 md:p-12 bg-gradient-to-r from-[#141414] via-[#1a180f] to-[#141414] border border-[#f4b400]/30 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              OUR MISSION: UNMATCHED PERFORMANCE & ATMOSPHERE
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Whether you are grinding ranks in competitive FPS, hosting a FIFA weekend showdown with friends, or enjoying cinematic 4K story games in a soundproof VIP suite, BLACKOUT delivers zero lag, instant gear setups, and gourmet energy snacks delivered right to your seat.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-4">
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-center">
              <span className="block text-2xl font-black text-[#f4b400]">4K / 120Hz</span>
              <span className="text-xs text-gray-400 uppercase">PS5 OLED Displays</span>
            </div>
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-center">
              <span className="block text-2xl font-black text-[#f4b400]">240Hz</span>
              <span className="text-xs text-gray-400 uppercase">ZOWIE PC Monitors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
