'use client';

import React, { useState, useEffect } from 'react';
import {
  Game,
  PricingPlan,
  Booking,
  BlockedSlot,
  GalleryItem,
  Tournament,
  Article,
  SiteSettings,
  AuthUser,
  DEFAULT_GAMES,
  DEFAULT_PRICING,
  DEFAULT_BOOKINGS,
  DEFAULT_BLOCKED_SLOTS,
  DEFAULT_GALLERY,
  DEFAULT_TOURNAMENTS,
  DEFAULT_ARTICLES,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_USERS,
  getStoredData,
  setStoredData,
} from '../lib/store';
import { ToastProvider } from '../components/toast-provider';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { ParticleBackground } from '../components/particle-background';
import { ScrollProgress } from '../components/scroll-progress';
import { BackToTop } from '../components/back-to-top';

import { HeroSection } from '../components/sections/hero-section';
import { AboutSection } from '../components/sections/about-section';
import { GamesSection } from '../components/sections/games-section';
import { PricingSection } from '../components/sections/pricing-section';
import { GallerySection } from '../components/sections/gallery-section';
import { TournamentsSection } from '../components/sections/tournaments-section';
import { ReviewsSection } from '../components/sections/reviews-section';
import { FaqSection } from '../components/sections/faq-section';
import { NewsletterSection } from '../components/sections/newsletter-section';
import { ContactSection } from '../components/sections/contact-section';
import { BookingSection } from '../components/sections/booking-section';
import { ArticlesSection } from '../components/sections/articles-section';

import { AuthModal } from '../components/auth/auth-modal';
import { AuthPage } from '../components/auth/auth-page';
import { UserProfileModal } from '../components/auth/user-profile-modal';
import { AdminDashboard } from '../components/admin/admin-dashboard';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Persistent State Engine
  const [games, setGames] = useState<Game[]>(DEFAULT_GAMES);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(DEFAULT_PRICING);
  const [bookings, setBookings] = useState<Booking[]>(DEFAULT_BOOKINGS);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>(DEFAULT_BLOCKED_SLOTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [tournaments, setTournaments] = useState<Tournament[]>(DEFAULT_TOURNAMENTS);
  const [articles, setArticles] = useState<Article[]>(DEFAULT_ARTICLES);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  // Auth & Profile State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setGames(getStoredData('games', DEFAULT_GAMES));
      setPricingPlans(getStoredData('pricing', DEFAULT_PRICING));
      setBookings(getStoredData('bookings', DEFAULT_BOOKINGS));
      setBlockedSlots(getStoredData('blocked_slots', DEFAULT_BLOCKED_SLOTS));
      setGalleryItems(getStoredData('gallery', DEFAULT_GALLERY));
      setTournaments(getStoredData('tournaments', DEFAULT_TOURNAMENTS));
      setArticles(getStoredData('articles', DEFAULT_ARTICLES));
      setSiteSettings(getStoredData('site_settings', DEFAULT_SITE_SETTINGS));
      setCurrentUser(getStoredData('current_user', null));
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Pre-selected parameters for booking form
  const [preSelectedGame, setPreSelectedGame] = useState<string>('');
  const [preSelectedPlatform, setPreSelectedPlatform] = useState<'PS5' | 'PC' | 'VIP Lounge'>('PC');

  // Login Success Handler
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setStoredData('current_user', user);

    if (user.role === 'admin') {
      setActiveTab('admin');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setStoredData('current_user', null);
    if (activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  // State Updates & Storage Synchronization
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

  const handleAddPricingPlan = (plan: PricingPlan) => {
    const updated = [...pricingPlans, plan];
    setPricingPlans(updated);
    setStoredData('pricing', updated);
  };

  const handleDeletePricingPlan = (id: string) => {
    const updated = pricingPlans.filter((p) => p.id !== id);
    setPricingPlans(updated);
    setStoredData('pricing', updated);
  };

  const handleUpdateArticle = (art: Article) => {
    const updated = articles.map((a) => (a.id === art.id ? art : a));
    setArticles(updated);
    setStoredData('articles', updated);
  };

  const handleAddArticle = (art: Article) => {
    const updated = [art, ...articles];
    setArticles(updated);
    setStoredData('articles', updated);
  };

  const handleDeleteArticle = (id: string) => {
    const updated = articles.filter((a) => a.id !== id);
    setArticles(updated);
    setStoredData('articles', updated);
  };

  const handleAddGalleryItem = (item: GalleryItem) => {
    const updated = [item, ...galleryItems];
    setGalleryItems(updated);
    setStoredData('gallery', updated);
  };

  const handleDeleteGalleryItem = (id: string) => {
    const updated = galleryItems.filter((g) => g.id !== id);
    setGalleryItems(updated);
    setStoredData('gallery', updated);
  };

  const handleAddTournament = (t: Tournament) => {
    const updated = [t, ...tournaments];
    setTournaments(updated);
    setStoredData('tournaments', updated);
  };

  const handleUpdateTournament = (t: Tournament) => {
    const updated = tournaments.map((tourn) => (tourn.id === t.id ? t : tourn));
    setTournaments(updated);
    setStoredData('tournaments', updated);
  };

  const handleDeleteTournament = (id: string) => {
    const updated = tournaments.filter((t) => t.id !== id);
    setTournaments(updated);
    setStoredData('tournaments', updated);
  };

  const handleUpdateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    setStoredData('site_settings', newSettings);
  };

  const handleResetSiteSettings = () => {
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    setStoredData('site_settings', DEFAULT_SITE_SETTINGS);
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
    if (currentUser && currentUser.role === 'admin') {
      setActiveTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenProfile={() => setUserProfileModalOpen(true)}
          onOpenAdmin={handleOpenAdmin}
          currentUser={currentUser}
          accentColor={siteSettings.accentColor}
        />

        {/* Main Content Body */}
        <main className="relative z-10">
          {activeTab === 'login' ? (
            <AuthPage
              onLoginSuccess={handleLoginSuccess}
              onNavigateHome={() => setActiveTab('home')}
              accentColor={siteSettings.accentColor}
            />
          ) : activeTab === 'admin' && currentUser?.role === 'admin' ? (
            <div className="pt-24 pb-12">
              <AdminDashboard
                bookings={bookings}
                blockedSlots={blockedSlots}
                games={games}
                pricingPlans={pricingPlans}
                articles={articles}
                galleryItems={galleryItems}
                tournaments={tournaments}
                siteSettings={siteSettings}
                users={DEFAULT_USERS}
                onUpdateBookingStatus={handleUpdateBookingStatus}
                onDeleteBooking={handleDeleteBooking}
                onAddBlockedSlot={handleAddBlockedSlot}
                onDeleteBlockedSlot={handleDeleteBlockedSlot}
                onAddGame={handleAddGame}
                onDeleteGame={handleDeleteGame}
                onUpdatePricing={handleUpdatePricing}
                onAddPricingPlan={handleAddPricingPlan}
                onDeletePricingPlan={handleDeletePricingPlan}
                onAddArticle={handleAddArticle}
                onUpdateArticle={handleUpdateArticle}
                onDeleteArticle={handleDeleteArticle}
                onAddGalleryItem={handleAddGalleryItem}
                onDeleteGalleryItem={handleDeleteGalleryItem}
                onAddTournament={handleAddTournament}
                onUpdateTournament={handleUpdateTournament}
                onDeleteTournament={handleDeleteTournament}
                onUpdateSiteSettings={handleUpdateSiteSettings}
                onResetSiteSettings={handleResetSiteSettings}
                onLogoutAdmin={handleLogout}
                onViewSite={() => setActiveTab('home')}
              />
            </div>
          ) : (
            <>
              <HeroSection
                title={siteSettings.heroTitle}
                subtitle={siteSettings.heroSubtitle}
                heroImage={siteSettings.heroImage}
                accentColor={siteSettings.accentColor}
                onBookClick={() => handleSelectPlanForBooking('PC')}
                onPricingClick={() => {
                  setActiveTab('pricing');
                  const el = document.getElementById('pricing');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              <AboutSection
                headline={siteSettings.aboutHeadline}
                description={siteSettings.aboutDescription}
                accentColor={siteSettings.accentColor}
              />

              <GamesSection
                games={games}
                onSelectGameForBooking={handleSelectGameForBooking}
                columns={siteSettings.gamesColumns}
              />

              <PricingSection
                pricingPlans={pricingPlans}
                onSelectPlanForBooking={handleSelectPlanForBooking}
              />

              <ArticlesSection
                articles={articles}
                accentColor={siteSettings.accentColor}
              />

              <TournamentsSection tournaments={tournaments} />

              <GallerySection galleryItems={galleryItems} />

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

              <ContactSection
                address={siteSettings.contactAddress}
                phone={siteSettings.contactPhone}
                email={siteSettings.contactEmail}
                accentColor={siteSettings.accentColor}
              />
            </>
          )}
        </main>

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} onOpenAdmin={handleOpenAdmin} />

        {/* Back to top floating button */}
        <BackToTop />

        {/* Common Auth Modal (Google & Email Sign In for Users and Admin) */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* User Profile Modal */}
        {currentUser && (
          <UserProfileModal
            isOpen={userProfileModalOpen}
            onClose={() => setUserProfileModalOpen(false)}
            user={currentUser}
            bookings={bookings}
            onLogout={handleLogout}
            onNewBookingClick={() => {
              setActiveTab('book');
              const el = document.getElementById('book');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </div>
    </ToastProvider>
  );
}
