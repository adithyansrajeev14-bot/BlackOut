'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../toast-provider';

export function NewsletterSection() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    showToast('Subscribed to Blackout VIP Club!', 'Check your inbox for exclusive tournament drops & promo codes.', 'success');
  };

  return (
    <section className="py-16 relative z-10 bg-[#050505]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#18160c] via-[#141414] to-[#18160c] border border-[#f4b400]/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4b400]/20 text-[#f4b400] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              BLACKOUT VIP SQUAD
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
              GET 15% OFF YOUR FIRST GAMING SESSION
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Subscribe to get instant promo codes, tournament announcements, and priority weekend pass drops.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-black/60 border border-[#f4b400]/50 text-[#f4b400] text-sm font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>You are in! Promo code sent to your email.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your gamer email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#f4b400] to-[#ffc107] text-black font-extrabold text-xs uppercase tracking-wider gold-glow hover:scale-105 transition-transform cursor-pointer shrink-0"
                >
                  Claim 15% Off
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
