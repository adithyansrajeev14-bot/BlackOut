'use client';

import React, { useState } from 'react';
import { PricingPlan } from '@/lib/store';
import { Check, Flame, Calculator, Sparkles, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '@/lib/utils';

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  onSelectPlanForBooking: (platform: 'PS5' | 'PC' | 'VIP Lounge') => void;
}

export function PricingSection({ pricingPlans, onSelectPlanForBooking }: PricingSectionProps) {
  // Price Calculator state
  const [calcPlatform, setCalcPlatform] = useState<'PS5' | 'PC' | 'VIP Lounge'>('PC');
  const [calcHours, setCalcHours] = useState(2);
  const [calcPlayers, setCalcPlayers] = useState(1);

  const selectedPlan = pricingPlans.find((p) => p.platform === calcPlatform) || pricingPlans[0];
  const hourlyRate = selectedPlan?.hourlyRate ?? 180;
  const calculatedTotal = hourlyRate * calcHours * (calcPlatform === 'VIP Lounge' ? 1 : Math.max(1, Math.ceil(calcPlayers / 2)));

  return (
    <section id="pricing" className="py-24 relative z-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4b400]/10 border border-[#f4b400]/30 text-[#f4b400] text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            Transparent Rates
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            PRICING & <span className="text-[#f4b400]">PACKAGES</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base">
            Simple hourly pricing with zero hidden fees. Includes full access to game library and high-speed fiber lines.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'glass-gold-card border-[#f4b400] shadow-[0_0_30px_rgba(244,180,0,0.25)] scale-102 bg-[#18160c]/90'
                  : 'bg-[#141414] border border-white/10 hover:border-[#f4b400]/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#f4b400] text-black text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                <p className="text-xs text-gray-400 min-h-[32px]">{plan.specs}</p>

                <div className="my-6">
                  <span className="text-4xl font-black text-[#f4b400]">
                    {formatCurrency(plan.hourlyRate)}
                  </span>
                  <span className="text-gray-400 text-xs font-semibold ml-1">/ hour</span>
                </div>

                <ul className="space-y-3 mb-8 border-t border-white/10 pt-6 text-xs text-gray-300">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#f4b400] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() =>
                  onSelectPlanForBooking(
                    plan.platform === 'VIP Lounge'
                      ? 'VIP Lounge'
                      : plan.platform === 'PS5'
                      ? 'PS5'
                      : 'PC'
                  )
                }
                className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#f4b400] to-[#ffc107] text-black gold-glow hover:scale-105'
                    : 'bg-[#1c1c1c] text-white border border-white/10 hover:border-[#f4b400] hover:text-[#f4b400]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Book {plan.title}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Interactive Price Estimator Tool */}
        <div className="rounded-3xl bg-[#141414] border border-[#f4b400]/30 p-8 md:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#f4b400]/20 border border-[#f4b400]/40 flex items-center justify-center text-[#f4b400]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white uppercase">Instant Session Cost Estimator</h3>
              <p className="text-xs text-gray-400">Calculate estimated cost for your gaming group before booking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Platform Select */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Platform</label>
              <select
                value={calcPlatform}
                onChange={(e) => setCalcPlatform(e.target.value as any)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
              >
                <option value="PC">Esports PC Rig ($180/hr)</option>
                <option value="PS5">PS5 Pro OLED Station ($150/hr)</option>
                <option value="VIP Lounge">VIP Ultra Lounge Suite ($350/hr)</option>
              </select>
            </div>

            {/* Hours Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase mb-2">
                <span>Duration</span>
                <span className="text-[#f4b400] font-bold">{calcHours} Hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={calcHours}
                onChange={(e) => setCalcHours(Number(e.target.value))}
                className="w-full accent-[#f4b400] cursor-pointer"
              />
            </div>

            {/* Players Count */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase mb-2">
                <span>Players</span>
                <span className="text-[#f4b400] font-bold">{calcPlayers} Players</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={calcPlayers}
                onChange={(e) => setCalcPlayers(Number(e.target.value))}
                className="w-full accent-[#f4b400] cursor-pointer"
              />
            </div>

            {/* Estimated Output */}
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#f4b400]/40 text-center">
              <span className="block text-xs text-gray-400 uppercase font-bold">Estimated Total</span>
              <span className="text-3xl font-black text-[#f4b400]">{formatCurrency(calculatedTotal)}</span>
              <button
                onClick={() => onSelectPlanForBooking(calcPlatform)}
                className="mt-2 text-xs font-extrabold text-white hover:text-[#f4b400] underline uppercase cursor-pointer"
              >
                Book This Estimate →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
