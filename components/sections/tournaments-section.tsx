'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tournament } from '@/lib/store';
import { Trophy, Calendar as CalendarIcon, Clock, Users, Shield, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '@/components/toast-provider';

interface TournamentsSectionProps {
  tournaments: Tournament[];
}

export function TournamentsSection({ tournaments }: TournamentsSectionProps) {
  const { showToast } = useToast();
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [teamName, setTeamName] = useState('');
  const [captainPhone, setCaptainPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !captainPhone) return;

    setIsSubmitted(true);
    showToast(
      'Tournament Registration Received!',
      `Team ${teamName} registered for ${selectedTournament?.title}. Our organizer will contact you.`,
      'success'
    );

    setTimeout(() => {
      setSelectedTournament(null);
      setIsSubmitted(false);
      setTeamName('');
      setCaptainPhone('');
    }, 2000);
  };

  return (
    <section id="tournaments" className="py-24 relative z-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4b400]/10 border border-[#f4b400]/30 text-[#f4b400] text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            Compete & Win Cash
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            UPCOMING <span className="text-[#f4b400]">TOURNAMENTS</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base">
            Prove your skill in high-stakes LAN battles. Cash prizes, custom trophies, and pro esports scout visibility.
          </p>
        </div>

        {/* Tournament Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tournaments.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl glass-gold-card overflow-hidden flex flex-col md:flex-row group"
            >
              <div className="md:w-1/2 relative min-h-[220px]">
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#f4b400] text-black font-black text-xs uppercase shadow-md">
                  {t.status}
                </div>
              </div>

              <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#f4b400]">
                    {t.game}
                  </span>
                  <h3 className="text-2xl font-black text-white leading-snug mt-1">{t.title}</h3>

                  <div className="mt-4 space-y-2 text-xs text-gray-300">
                    <p className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#f4b400]" />
                      <span>{t.date} @ {t.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#f4b400]" />
                      <span className="font-extrabold text-[#f4b400]">Prize: {t.prizePool}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>
                        Slots: {t.registeredTeams} / {t.maxTeams} Teams
                      </span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">Entry: {t.entryFee}</span>
                  <button
                    onClick={() => setSelectedTournament(t)}
                    className="px-5 py-2.5 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs uppercase tracking-wider gold-glow hover:scale-105 transition-transform cursor-pointer"
                  >
                    Register Team
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedTournament && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="max-w-md w-full bg-[#141414] border border-[#f4b400]/40 rounded-2xl p-6 shadow-2xl relative">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-[#f4b400] mx-auto animate-bounce" />
                  <h3 className="text-2xl font-extrabold text-white">Registration Complete!</h3>
                  <p className="text-xs text-gray-400">
                    Your team slot has been provisionally reserved for {selectedTournament.title}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#f4b400]">LAN Tournament Entry</span>
                      <h3 className="text-lg font-black text-white">{selectedTournament.title}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedTournament(null)}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Team / Player Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Predators"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Captain Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={captainPhone}
                      onChange={(e) => setCaptainPhone(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-[#0a0a0a] border border-white/5 text-xs text-gray-400 flex items-center justify-between">
                    <span>Entry Fee:</span>
                    <span className="text-white font-bold">{selectedTournament.entryFee}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f4b400] to-[#ffc107] text-black font-extrabold text-sm uppercase tracking-wider gold-glow cursor-pointer"
                  >
                    Confirm Tournament Slot
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
