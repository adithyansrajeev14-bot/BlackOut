'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Game } from '@/lib/store';
import { Search, Monitor, Gamepad2, Users, Star, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface GamesSectionProps {
  games: Game[];
  onSelectGameForBooking: (gameTitle: string, platform: 'PS5' | 'PC') => void;
  columns?: number;
}

export function GamesSection({ games, onSelectGameForBooking, columns = 4 }: GamesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'All' | 'PS5' | 'PC'>('All');

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform =
      platformFilter === 'All' || game.platform === platformFilter || game.platform === 'Both';
    return matchesSearch && matchesPlatform;
  });

  return (
    <section id="games" className="py-24 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4b400]/10 border border-[#f4b400]/30 text-[#f4b400] text-xs font-bold uppercase tracking-widest mb-3">
              <Gamepad2 className="w-3.5 h-3.5" />
              Ultimate Game Library
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              AVAILABLE <span className="text-[#f4b400]">GAMES</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Over 200+ AAA titles installed and updated with max settings unlocked.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search games or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#f4b400]/60 transition-colors"
              />
            </div>

            {/* Platform Filter */}
            <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-full border border-white/10">
              {(['All', 'PS5', 'PC'] as const).map((plat) => (
                <button
                  key={plat}
                  onClick={() => setPlatformFilter(plat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    platformFilter === plat
                      ? 'bg-[#f4b400] text-black shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
          {filteredGames.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-gold-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image & Platform Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-black">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white">
                    {game.platform === 'PS5' && <Gamepad2 className="w-3.5 h-3.5 text-blue-400" />}
                    {game.platform === 'PC' && <Monitor className="w-3.5 h-3.5 text-emerald-400" />}
                    {game.platform === 'Both' && <Gamepad2 className="w-3.5 h-3.5 text-[#f4b400]" />}
                    <span>{game.platform}</span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f4b400]/90 text-black text-[11px] font-black shadow-lg">
                    <Star className="w-3 h-3 fill-black" />
                    <span>{game.rating}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#f4b400]">
                      {game.genre}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      {game.players}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white group-hover:text-[#f4b400] transition-colors">
                    {game.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() =>
                    onSelectGameForBooking(
                      game.title,
                      game.platform === 'PC' ? 'PC' : 'PS5'
                    )
                  }
                  className="w-full py-2.5 rounded-xl bg-[#141414] hover:bg-[#f4b400] border border-[#f4b400]/30 hover:border-[#f4b400] text-gray-200 hover:text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book For This Game
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-16 bg-[#141414] rounded-2xl border border-white/10">
            <p className="text-gray-400 text-sm">No games found matching your search filter.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setPlatformFilter('All');
              }}
              className="mt-3 px-4 py-2 text-xs font-bold text-[#f4b400] underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
