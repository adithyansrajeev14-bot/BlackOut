'use client';

import React from 'react';
import { Gamepad2, MapPin, Phone, Mail, Clock, Instagram, Youtube, MessageSquare } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export function Footer({ setActiveTab, onOpenAdmin }: FooterProps) {
  const handleNav = (tab: string) => {
    setActiveTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#080808] border-t border-[#f4b400]/20 pt-16 pb-8 text-gray-400 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#f4b400]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f4b400] to-[#b88600] flex items-center justify-center shadow-lg shadow-[#f4b400]/30">
                <Gamepad2 className="w-6 h-6 text-black font-bold" />
              </div>
              <span className="text-2xl font-extrabold tracking-wider text-white uppercase">
                BLACK<span className="text-[#f4b400]">OUT</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The ultimate high-end esports arena and luxury gaming lounge. Equipped with RTX 4090 rigs, 240Hz displays, 4K PS5 Pro setups, and premium VIP private suites.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#f4b400] hover:border-[#f4b400]/50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#f4b400] hover:border-[#f4b400]/50 transition-colors"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#f4b400] hover:border-[#f4b400]/50 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold tracking-wider uppercase text-sm border-l-2 border-[#f4b400] pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {['home', 'about', 'games', 'pricing', 'gallery', 'tournaments', 'contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNav(link)}
                    className="hover:text-[#f4b400] transition-colors capitalize cursor-pointer"
                  >
                    {link}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
                >
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Gaming Platforms */}
          <div className="space-y-4">
            <h3 className="text-white font-bold tracking-wider uppercase text-sm border-l-2 border-[#f4b400] pl-3">
              Gaming Zones
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-center justify-between">
                <span>Esports PC Rigs (240Hz)</span>
                <span className="text-[10px] bg-amber-500/20 text-[#f4b400] px-2 py-0.5 rounded">RTX 4080/4090</span>
              </li>
              <li className="flex items-center justify-between">
                <span>PS5 Pro Consoles</span>
                <span className="text-[10px] bg-amber-500/20 text-[#f4b400] px-2 py-0.5 rounded">55&quot; 4K OLED</span>
              </li>
              <li className="flex items-center justify-between">
                <span>VIP Soundproof Suite</span>
                <span className="text-[10px] bg-amber-500/20 text-[#f4b400] px-2 py-0.5 rounded">Private Lounge</span>
              </li>
              <li className="flex items-center justify-between">
                <span>All-Night LAN Pass</span>
                <span className="text-[10px] bg-[#f4b400] text-black font-bold px-2 py-0.5 rounded">10 PM - 6 AM</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-bold tracking-wider uppercase text-sm border-l-2 border-[#f4b400] pl-3">
              Lounge Location
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#f4b400] shrink-0 mt-0.5" />
                <span>Lissie Road, Near Kuluki Cafe, Ernakulam</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f4b400] shrink-0" />
                <span>+91 9995536333</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f4b400] shrink-0" />
                <span>booking@blackoutgaming.com</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#f4b400] shrink-0" />
                <span>Open 24/7 (365 Days)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BLACKOUT GAMING CAFE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <button onClick={onOpenAdmin} className="text-[#f4b400]/70 hover:text-[#f4b400]">Admin Login</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
