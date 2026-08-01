'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Instagram, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../toast-provider';

export function ContactSection() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSent(true);
    showToast('Message Sent!', 'Thank you for reaching out. Our team will reply shortly.', 'success');
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4b400]/10 border border-[#f4b400]/30 text-[#f4b400] text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            Find & Connect
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            LOCATION & <span className="text-[#f4b400]">CONTACT</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base">
            Visit our arena at Lissie Road, Ernakulam or get in touch for private lounge bookings and birthday party packages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Cards & Map */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl glass-gold-card">
                <MapPin className="w-6 h-6 text-[#f4b400] mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Arena Address</h3>
                <p className="text-xs text-gray-400">Lissie Road, Near Kuluki Cafe, Ernakulam</p>
              </div>

              <div className="p-5 rounded-2xl glass-gold-card">
                <Clock className="w-6 h-6 text-[#f4b400] mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Business Hours</h3>
                <p className="text-xs text-gray-400">Open 24 Hours / 7 Days a Week</p>
                <p className="text-[10px] text-[#f4b400] font-semibold mt-1">Night Pass: 10 PM - 6 AM</p>
              </div>

              <div className="p-5 rounded-2xl glass-gold-card">
                <Phone className="w-6 h-6 text-[#f4b400] mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Phone / WhatsApp</h3>
                <p className="text-xs text-gray-400">+91 9995536333</p>
                <a
                  href="https://wa.me/919995536333"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-400 hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="p-5 rounded-2xl glass-gold-card">
                <Instagram className="w-6 h-6 text-[#f4b400] mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Social Media</h3>
                <p className="text-xs text-gray-400">@blackoutgamingcafe</p>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-[#f4b400] hover:underline"
                >
                  Follow on Instagram
                </a>
              </div>
            </div>

            {/* Dark Map Simulation Container */}
            <div className="rounded-2xl overflow-hidden border border-white/10 relative h-64 bg-[#141414]">
              <iframe
                title="BLACKOUT Gaming Cafe Location"
                src="https://maps.google.com/maps?q=Lissie%20Road,%20Near%20Kuluki%20Cafe,%20Ernakulam&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter invert contrast-125 saturate-50 opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#f4b400]/40 text-xs text-white font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                BLACKOUT Arena Live Location
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="p-8 rounded-3xl glass-gold-card bg-[#141414]">
            <h3 className="text-2xl font-black text-white uppercase mb-2">SEND US A MESSAGE</h3>
            <p className="text-xs text-gray-400 mb-6">Have questions regarding private event bookings, bulk passes, or tournaments?</p>

            {sent ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#f4b400] mx-auto" />
                <h4 className="text-xl font-bold text-white">Thank You!</h4>
                <p className="text-xs text-gray-400">Your message has been delivered to our management team.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Message / Event Inquiry</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you need..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f4b400]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f4b400] to-[#ffc107] text-black font-extrabold text-xs uppercase tracking-wider gold-glow hover:scale-102 transition-transform cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
