'use client';

import React, { useState, useEffect } from 'react';
import { Game, Booking, BlockedSlot, TIME_SLOTS, PricingPlan } from '@/lib/store';
import { Calendar, Clock, Gamepad2, Monitor, Users, ShieldAlert, Sparkles, CheckCircle2, Copy, Download, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { formatCurrency, generateBookingCode, formatDate } from '@/lib/utils';
import { useToast } from '../toast-provider';

interface BookingSectionProps {
  games: Game[];
  pricingPlans: PricingPlan[];
  existingBookings: Booking[];
  blockedSlots: BlockedSlot[];
  onAddBooking: (newBooking: Booking) => void;
  preSelectedGame?: string;
  preSelectedPlatform?: 'PS5' | 'PC' | 'VIP Lounge';
}

export function BookingSection({
  games,
  pricingPlans,
  existingBookings,
  blockedSlots,
  onAddBooking,
  preSelectedGame = '',
  preSelectedPlatform = 'PC',
}: BookingSectionProps) {
  const { showToast } = useToast();

  // Today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[4]); // 14:00 default
  const [selectedPlatform, setSelectedPlatform] = useState<'PS5' | 'PC' | 'VIP Lounge'>(preSelectedPlatform);
  const [selectedGame, setSelectedGame] = useState(preSelectedGame || games[0]?.title || 'EA FC 25');
  const [prevPlatform, setPrevPlatform] = useState(preSelectedPlatform);
  const [prevGame, setPrevGame] = useState(preSelectedGame);
  const [duration, setDuration] = useState(2);
  const [players, setPlayers] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  // Success Confirmation Modal State
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (preSelectedPlatform !== prevPlatform) {
    setPrevPlatform(preSelectedPlatform);
    setSelectedPlatform(preSelectedPlatform);
  }
  if (preSelectedGame !== prevGame) {
    setPrevGame(preSelectedGame);
    if (preSelectedGame) setSelectedGame(preSelectedGame);
  }

  // Calculate pricing
  const plan = pricingPlans.find((p) => p.platform === selectedPlatform) || pricingPlans[0];
  const hourlyRate = plan?.hourlyRate ?? 180;
  const basePrice = hourlyRate * duration;
  const discountAmount = discountApplied ? basePrice * 0.1 : 0;
  const totalPrice = Math.max(0, basePrice - discountAmount);

  // Availability checking function
  const isSlotUnavailable = (time: string, platform: 'PS5' | 'PC' | 'VIP Lounge') => {
    // Check existing active bookings
    const bookedMatch = existingBookings.some(
      (b) =>
        b.date === selectedDate &&
        b.timeSlot === time &&
        b.platform === platform &&
        b.status !== 'Cancelled'
    );

    // Check blocked slots by admin
    const blockedMatch = blockedSlots.some(
      (bs) =>
        bs.date === selectedDate &&
        bs.timeSlot === time &&
        (bs.platform === 'All' || bs.platform === platform)
    );

    return bookedMatch || blockedMatch;
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'BLACKOUT10') {
      setDiscountApplied(true);
      showToast('10% VIP Discount Applied!', 'BLACKOUT10 code successfully activated.', 'success');
    } else {
      showToast('Invalid Promo Code', 'Try code "BLACKOUT10" for 10% off.', 'error');
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !phone || !email || !selectedDate || !selectedTimeSlot) {
      showToast('Missing Details', 'Please fill in all required fields.', 'error');
      return;
    }

    if (isSlotUnavailable(selectedTimeSlot, selectedPlatform)) {
      showToast('Slot Unavailable', 'The selected slot is already booked or blocked. Please choose another time.', 'error');
      return;
    }

    const newBooking: Booking = {
      id: `b_${Date.now()}`,
      bookingCode: generateBookingCode(),
      customerName,
      phone,
      email,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      platform: selectedPlatform,
      gameTitle: selectedGame,
      durationHours: duration,
      playersCount: players,
      specialRequests: specialRequests || 'None',
      totalPrice,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    onAddBooking(newBooking);
    setConfirmedBooking(newBooking);

    // Trigger Confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f4b400', '#ffffff', '#ffc107'],
    });

    showToast('Booking Confirmed!', `Booking ID: ${newBooking.bookingCode}`, 'success');
  };

  const copyBookingCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast('Copied to Clipboard!', `Booking ID ${code} copied.`, 'info');
  };

  return (
    <section id="book" className="py-24 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4b400]/10 border border-[#f4b400]/30 text-[#f4b400] text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            Instant Online Reservation
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            BOOK YOUR <span className="text-[#f4b400]">GAMING SLOT</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base">
            Select date, station platform, and game title. Double-booking protection active in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Booking Form */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl glass-gold-card bg-[#141414]">
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {/* Step 1: Customer Details */}
              <div>
                <h3 className="text-base font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-[#f4b400] pl-3 flex items-center justify-between">
                  <span>1. Customer Details</span>
                  <span className="text-xs text-gray-400 font-normal">Contact & Confirmation</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Platform & Game Selection */}
              <div>
                <h3 className="text-base font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-[#f4b400] pl-3">
                  2. Platform & Game
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {[
                    { id: 'PC', label: 'Esports PC Rig', icon: Monitor, sub: '240Hz / RTX 4090' },
                    { id: 'PS5', label: 'PS5 Pro OLED', icon: Gamepad2, sub: '4K 120FPS HDR' },
                    { id: 'VIP Lounge', label: 'VIP Suite', icon: Sparkles, sub: 'Private Soundproof' },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isSelected = selectedPlatform === p.id;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setSelectedPlatform(p.id as any)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1e1b0e] border-[#f4b400] shadow-[0_0_15px_rgba(244,180,0,0.3)]'
                            : 'bg-[#0a0a0a] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-[#f4b400]' : 'text-gray-400'}`} />
                        <div className="font-extrabold text-sm text-white">{p.label}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{p.sub}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Select Game Title</label>
                    <select
                      value={selectedGame}
                      onChange={(e) => setSelectedGame(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                    >
                      {games.map((g) => (
                        <option key={g.id} value={g.title}>
                          {g.title} ({g.platform})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Number of Players</label>
                    <select
                      value={players}
                      onChange={(e) => setPlayers(Number(e.target.value))}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Player' : 'Players'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Date & Slot Selector with Real-time Availability */}
              <div>
                <h3 className="text-base font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-[#f4b400] pl-3 flex items-center justify-between">
                  <span>3. Date & Slot Time</span>
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Realtime Availability Filter
                  </span>
                </h3>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Booking Date</label>
                  <input
                    type="date"
                    min={todayStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-64 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Available Hours Grid</label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {TIME_SLOTS.map((time) => {
                      const disabled = isSlotUnavailable(time, selectedPlatform);
                      const isSelected = selectedTimeSlot === time;

                      return (
                        <button
                          type="button"
                          key={time}
                          disabled={disabled}
                          onClick={() => setSelectedTimeSlot(time)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                            disabled
                              ? 'bg-[#181818] text-red-500/50 border border-red-500/20 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#f4b400] text-black shadow-[0_0_12px_#f4b400]'
                              : 'bg-[#0a0a0a] text-gray-300 border border-white/10 hover:border-white/40'
                          }`}
                        >
                          {time}
                          {disabled && (
                            <span className="block text-[8px] text-red-400 font-normal no-underline">Booked</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 4: Duration & Special Requests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Duration (Hours)</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                  >
                    {[1, 2, 3, 4, 5, 8].map((h) => (
                      <option key={h} value={h}>
                        {h} {h === 1 ? 'Hour' : 'Hours'} Session
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Special Requests (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Extra controller, Discord setup, Snack order"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f4b400] via-[#ffc107] to-[#f4b400] text-black font-black text-base uppercase tracking-wider gold-glow hover:gold-glow-lg hover:scale-101 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                CONFIRM & GENERATE BOOKING SLIP
              </button>
            </form>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl glass-gold-card bg-[#141414] space-y-6 sticky top-28">
              <h3 className="text-lg font-black text-white uppercase border-b border-white/10 pb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#f4b400]" />
                BOOKING SUMMARY
              </h3>

              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Date</span>
                  <span className="font-bold text-white">{formatDate(selectedDate)}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Time Slot</span>
                  <span className="font-bold text-[#f4b400]">{selectedTimeSlot}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Platform</span>
                  <span className="font-bold text-white">{selectedPlatform}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Game Title</span>
                  <span className="font-bold text-white">{selectedGame}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Session Rate</span>
                  <span className="font-bold text-white">{formatCurrency(plan.hourlyRate)}/hr</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-bold text-white">{duration} Hours</span>
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="pt-2">
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                  Have a Promo Code? (Try &quot;BLACKOUT10&quot;)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="BLACKOUT10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-[#f4b400]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 rounded-xl bg-[#f4b400] text-black font-bold text-xs uppercase cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="pt-4 border-t border-white/10 space-y-1">
                {discountApplied && (
                  <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                    <span>VIP Code Discount (10%)</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Total Amount</span>
                  <span className="text-3xl font-black text-[#f4b400]">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-[#f4b400]/30 text-[11px] text-amber-200 leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#f4b400] shrink-0 mt-0.5" />
                <span>Zero pre-payment required. Pay upon arrival at the lounge desk with cash, card, or UPI.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Slip Modal */}
      <AnimatePresence>
        {confirmedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <div className="max-w-md w-full rounded-3xl bg-[#141414] border-2 border-[#f4b400] p-6 sm:p-8 shadow-[0_0_50px_rgba(244,180,0,0.3)] relative text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#f4b400] text-black flex items-center justify-center mx-auto shadow-lg gold-glow">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#f4b400]">
                  SLOT BOOKED SUCCESSFULLY
                </span>
                <h3 className="text-2xl font-black text-white mt-1">BLACKOUT GAMING RECEIPT</h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 text-left space-y-2.5 text-xs text-gray-300">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-gray-400">Booking ID</span>
                  <div className="flex items-center gap-1.5 font-black text-[#f4b400] text-sm">
                    <span>{confirmedBooking.bookingCode}</span>
                    <button
                      onClick={() => copyBookingCode(confirmedBooking.bookingCode)}
                      className="p-1 hover:text-white"
                      title="Copy Code"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Gamer Name</span>
                  <span className="font-bold text-white">{confirmedBooking.customerName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Platform & Game</span>
                  <span className="font-bold text-white">
                    {confirmedBooking.platform} - {confirmedBooking.gameTitle}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Date & Time</span>
                  <span className="font-bold text-white">
                    {confirmedBooking.date} @ {confirmedBooking.timeSlot}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-bold text-white">{confirmedBooking.durationHours} Hours</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-white/10 text-sm">
                  <span className="font-bold text-white">Total Payable at Desk</span>
                  <span className="font-black text-[#f4b400]">
                    {formatCurrency(confirmedBooking.totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-xl bg-[#222] border border-white/10 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 hover:border-[#f4b400] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Print Receipt
                </button>

                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="flex-1 py-3 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs uppercase tracking-wider gold-glow cursor-pointer"
                >
                  Close & Done
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
