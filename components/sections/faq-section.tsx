'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What are the operating hours of BLACKOUT GAMING CAFE?',
      a: 'We are open 24 hours a day, 7 days a week, 365 days a year! Our night owl sessions run from 10:00 PM to 6:00 AM every day.',
    },
    {
      q: 'Can I log into my own Steam, Riot, or PlayStation Network account?',
      a: 'Yes! All stations support rapid multi-account login with automated cloud sync. Alternatively, you can use our unlocked BLACKOUT master accounts loaded with hundreds of titles.',
    },
    {
      q: 'How does real-time slot booking work?',
      a: 'Select your preferred date, time slot, gaming platform (PC, PS5, VIP Lounge), and game. Our system checks availability in real-time to prevent double bookings. Upon confirmation, you receive a unique Booking ID.',
    },
    {
      q: 'Can I bring my own mouse, headset, or controller?',
      a: 'Absolutely! Our PCs and consoles have easily accessible front I/O ports. Plug-and-play your own peripherals anytime.',
    },
    {
      q: 'Are food and beverages available at the lounge?',
      a: 'Yes, we have a gourmet cafe menu serving energy drinks, iced coffees, artisan burgers, loaded fries, and pizza delivered straight to your rig.',
    },
  ];

  return (
    <section className="py-24 relative z-10 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4b400]/10 border border-[#f4b400]/30 text-[#f4b400] text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            FREQUENTLY ASKED <span className="text-[#f4b400]">QUESTIONS</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#141414] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="text-base font-bold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#f4b400] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-6 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
