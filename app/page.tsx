'use client';

import React, { useState, useEffect } from 'react';
import {
  Game,
  PricingPlan,
  Booking,
  BlockedSlot,
  GalleryItem,
  Tournament,
  DEFAULT_GAMES,
  DEFAULT_PRICING,
  DEFAULT_BOOKINGS,
  DEFAULT_BLOCKED_SLOTS,
  DEFAULT_GALLERY,
  DEFAULT_TOURNAMENTS,
  getStoredData,
  setStoredData,
} from '@/lib/store';
import { ToastProvider } from '@/components/toast-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ParticleBackground } from '@/components/particle-background';
import { ScrollProgress } from '@/components/scroll-progress';
import { BackToTop } from '@/components/back-to-top';

import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { GamesSection } from '@/components/sections/games-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { TournamentsSection } from '@/components/sections/tournaments-section';
import { ReviewsSection } from '@/components/sections/reviews-section';
import { FaqSection } from '@/components/sections/faq-section';
import { NewsletterSection } from '@/components/sections/newsletter-section';
import { ContactSection } from '@/components/sections/contact-section';
import { BookingSection } from '@/components/sections/booking-section';

import { AdminLoginModal } from '@/components/admin/admin-login-modal';
import { AdminDashboard } from '@/components/admin/admin-dashboard';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Persistent State Engine
  const [games, setGames] = useState<Game[]>(() => getStoredData('games', DEFAULT_GAMES));
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(() => getStoredData('pricing', DEFAULT_PRICING));
  const [bookings, setBookings] = useState<Booking[]>(() => getStoredData('bookings', DEFAULT_BOOKINGS));
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>(() => getStoredData('blocked_slots', DEFAULT_BLOCKED_SLOTS));
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => getStoredData('gallery', DEFAULT_GALLERY));
  const [tournaments, setTournaments] = useState<Tournament[]>(() => getStoredData('tournaments', DEFAULT_TOURNAMENTS));

  // Admin Modal & Login State
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Pre-selected parameters for booking form
  const [preSelectedGame, setPreSelectedGame] = useState<string>('');
  const [preSelectedPlatform, setPreSelectedPlatform] = useState<'PS5' | 'PC' | 'VIP Lounge'>('PC');

  // Save changes to local storage when state updates
  const handleAddBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    setStoredData('bookings', updated);
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    setStoredData('bookings', updated);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    setStoredData('bookings', updated);
  };

  const handleAddBlockedSlot = (slot: BlockedSlot) => {
    const updated = [slot, ...blockedSlots];
    setBlockedSlots(updated);
    setStoredData('blocked_slots', updated);
  };

  const handleDeleteBlockedSlot = (id: string) => {
    const updated = blockedSlots.filter((bs) => bs.id !== id);
    setBlockedSlots(updated);
    setStoredData('blocked_slots', updated);
  };

  const handleAddGame = (game: Game) => {
    const updated = [...games, game];
    setGames(updated);
    setStoredData('games', updated);
  };

  const handleDeleteGame = (id: string) => {
    const updated = games.filter((g) => g.id !== id);
    setGames(updated);
    setStoredData('games', updated);
  };

  const handleUpdatePricing = (id: string, newRate: number) => {
    const updated = pricingPlans.map((p) => (p.id === id ? { ...p, hourlyRate: newRate } : p));
    setPricingPlans(updated);
    setStoredData('pricing', updated);
  };

  // Quick Action Handlers
  const handleSelectGameForBooking = (title: string, platform: 'PS5' | 'PC') => {
    setPreSelectedGame(title);
    setPreSelectedPlatform(platform);
    setActiveTab('book');
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlanForBooking = (platform: 'PS5' | 'PC' | 'VIP Lounge') => {
    setPreSelectedPlatform(platform);
    setActiveTab('book');
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setActiveTab('admin');
      const el = document.getElementById('admin-dashboard');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setAdminModalOpen(true);
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#f4b400] selection:text-black font-sans relative overflow-x-hidden">
        {/* Scroll Progress & Canvas Particle Animation */}
        <ScrollProgress />
        <ParticleBackground />

        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAdmin={handleOpenAdmin}
          isAdminLoggedIn={isAdminLoggedIn}
        />

        {/* Main Sections Body */}
        <main className="relative z-10">
          <HeroSection
            onBookClick={() => handleSelectPlanForBooking('PC')}
            onPricingClick={() => {
              setActiveTab('pricing');
              const el = document.getElementById('pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <AboutSection />

          <GamesSection
            games={games}
            onSelectGameForBooking={handleSelectGameForBooking}
          />

          <PricingSection
            pricingPlans={pricingPlans}
            onSelectPlanForBooking={handleSelectPlanForBooking}
          />

          <GallerySection galleryItems={galleryItems} />

          <TournamentsSection tournaments={tournaments} />

          <BookingSection
            games={games}
            pricingPlans={pricingPlans}
            existingBookings={bookings}
            blockedSlots={blockedSlots}
            onAddBooking={handleAddBooking}
            preSelectedGame={preSelectedGame}
            preSelectedPlatform={preSelectedPlatform}
          />

          <ReviewsSection />

          <FaqSection />

          <NewsletterSection />

          <ContactSection />

          {isAdminLoggedIn && (
            <AdminDashboard
              bookings={bookings}
              blockedSlots={blockedSlots}
              games={games}
              pricingPlans={pricingPlans}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onDeleteBooking={handleDeleteBooking}
              onAddBlockedSlot={handleAddBlockedSlot}
              onDeleteBlockedSlot={handleDeleteBlockedSlot}
              onAddGame={handleAddGame}
              onDeleteGame={handleDeleteGame}
              onUpdatePricing={handleUpdatePricing}
              onLogoutAdmin={() => {
                setIsAdminLoggedIn(false);
                setActiveTab('home');
              }}
            />
          )}
        </main>

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} onOpenAdmin={handleOpenAdmin} />

        {/* Back to top floating button */}
        <BackToTop />

        {/* Admin Login Modal */}
        <AdminLoginModal
          isOpen={adminModalOpen}
          onClose={() => setAdminModalOpen(false)}
          onLoginSuccess={() => {
            setAdminModalOpen(false);
            setIsAdminLoggedIn(true);
            setActiveTab('admin');
            setTimeout(() => {
              const el = document.getElementById('admin-dashboard');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      </div>
    </ToastProvider>
  );
}
