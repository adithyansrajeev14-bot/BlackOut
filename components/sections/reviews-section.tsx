'use client';

import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';

export function ReviewsSection() {
  const reviews = [
    {
      name: 'Marcus Vance',
      role: 'Rank 1 Valorant Player',
      comment: 'The 240Hz monitors and dedicated fiber connection at Blackout are top tier. Zero micro-stutters or ping spikes. It is literally an esports boot camp.',
      rating: 5,
    },
    {
      name: 'Evelyn Brooks',
      role: 'VIP Suite Regular',
      comment: 'Rented the VIP Ultra Lounge for my birthday with 6 friends. The 85" OLED screen and custom food service made it the best FIFA night ever.',
      rating: 5,
    },
    {
      name: 'Tyler Reed',
      role: 'CoD Black Ops Competitor',
      comment: 'Super fast booking, insane Herman Miller chairs, and friendly staff who keep controllers spotless. Best gaming lounge in the city hands down.',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4b400]/10 border border-[#f4b400]/30 text-[#f4b400] text-xs font-bold uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5" />
            Gamer Community
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            WHAT GAMERS <span className="text-[#f4b400]">SAY ABOUT US</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl glass-gold-card relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-[#f4b400]/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f4b400] text-[#f4b400]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">&quot;{r.comment}&quot;</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <h3 className="text-base font-bold text-white">{r.name}</h3>
                <p className="text-xs text-[#f4b400] font-medium">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
