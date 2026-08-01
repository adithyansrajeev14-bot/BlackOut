'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/toast-provider';

interface ContactSectionProps {
  address?: string;
  phone?: string;
  email?: string;
  accentColor?: string;
}

export function ContactSection({
  address = 'Lissie Road, Near Kuluki Cafe, Ernakulam',
  phone = '+91 9995536333',
  email = 'contact@blackoutgaming.in',
  accentColor = '#f4b400',
}: ContactSectionProps) {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !userEmail || !message) return;

    setSent(true);
    showToast('Message Sent! Thank you for reaching out. Our team will reply shortly.', 'success');
    setTimeout(() => {
      setSent(false);
      setName('');
      setUserEmail('');
      setMessage('');
    }, 3000);
  };

  const whatsappPhone = phone.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-24 relative z-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            Find & Connect
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            LOCATION & <span style={{ color: accentColor }}>CONTACT</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base">
            Visit our arena at {address} or get in touch for private lounge bookings and birthday party packages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Cards & Map */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#121212] border border-white/10">
                <MapPin className="w-6 h-6 mb-3" style={{ color: accentColor }} />
                <h3 className="text-base font-bold text-white mb-1">Arena Address</h3>
                <p className="text-xs text-gray-400">{address}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121212] border border-white/10">
                <Clock className="w-6 h-6 mb-3" style={{ color: accentColor }} />
                <h3 className="text-base font-bold text-white mb-1">Business Hours</h3>
                <p className="text-xs text-gray-400">Open 24 Hours / 7 Days a Week</p>
                <p className="text-[10px] font-semibold mt-1" style={{ color: accentColor }}>Night Pass: 10 PM - 6 AM</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121212] border border-white/10">
                <Phone className="w-6 h-6 mb-3" style={{ color: accentColor }} />
                <h3 className="text-base font-bold text-white mb-1">Phone / WhatsApp</h3>
                <p className="text-xs text-gray-400">{phone}</p>
                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-400 hover:underline"
                >
                  Chat on WhatsApp →
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-[#121212] border border-white/10">
                <Mail className="w-6 h-6 mb-3" style={{ color: accentColor }} />
                <h3 className="text-base font-bold text-white mb-1">Email Desk</h3>
                <p className="text-xs text-gray-400">{email}</p>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-white/10 relative h-64 bg-[#141414]">
              <iframe
                title="BLACKOUT Gaming Cafe Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0 filter invert contrast-125 saturate-50 opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="p-8 rounded-3xl bg-[#121212] border border-white/10 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
              SEND US A <span style={{ color: accentColor }}>MESSAGE</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Inquire about tournament sponsorships, private VIP lounge reservations, or party packages.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#f4b400]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#f4b400]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Message Body</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#f4b400]"
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className="w-full py-3.5 px-6 rounded-xl text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                {sent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-900" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
