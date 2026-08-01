'use client';

import React, { useState } from 'react';
import {
  Booking,
  BlockedSlot,
  Game,
  PricingPlan,
  Article,
  GalleryItem,
  Tournament,
  SiteSettings,
  AuthUser,
  TIME_SLOTS,
} from '@/lib/store';
import {
  ShieldAlert,
  Calendar,
  DollarSign,
  Users,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  Download,
  Ban,
  Gamepad2,
  Tag,
  LogOut,
  Clock,
  PlusCircle,
  X,
  Newspaper,
  Palette,
  Type,
  LayoutGrid,
  Image as ImageIcon,
  Sparkles,
  Phone,
  MapPin,
  Mail,
  RefreshCw,
  Sliders,
  Eye,
  Trophy,
  Edit3,
  UserCheck,
  Check
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useToast } from '../toast-provider';

interface AdminDashboardProps {
  bookings: Booking[];
  blockedSlots: BlockedSlot[];
  games: Game[];
  pricingPlans: PricingPlan[];
  articles: Article[];
  galleryItems: GalleryItem[];
  tournaments: Tournament[];
  siteSettings: SiteSettings;
  users?: AuthUser[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
  onDeleteBooking: (id: string) => void;
  onAddBlockedSlot: (slot: BlockedSlot) => void;
  onDeleteBlockedSlot: (id: string) => void;
  onAddGame: (game: Game) => void;
  onDeleteGame: (id: string) => void;
  onUpdatePricing: (id: string, newRate: number) => void;
  onUpdatePricingPlan?: (plan: PricingPlan) => void;
  onAddPricingPlan?: (plan: PricingPlan) => void;
  onDeletePricingPlan?: (id: string) => void;
  onAddArticle: (art: Article) => void;
  onUpdateArticle?: (art: Article) => void;
  onDeleteArticle: (id: string) => void;
  onAddGalleryItem?: (item: GalleryItem) => void;
  onDeleteGalleryItem?: (id: string) => void;
  onAddTournament?: (t: Tournament) => void;
  onUpdateTournament?: (t: Tournament) => void;
  onDeleteTournament?: (id: string) => void;
  onUpdateSiteSettings: (settings: SiteSettings) => void;
  onResetSiteSettings: () => void;
  onLogoutAdmin: () => void;
  onViewSite?: () => void;
}

export function AdminDashboard({
  bookings,
  blockedSlots,
  games,
  pricingPlans,
  articles,
  galleryItems,
  tournaments,
  siteSettings,
  users = [],
  onUpdateBookingStatus,
  onDeleteBooking,
  onAddBlockedSlot,
  onDeleteBlockedSlot,
  onAddGame,
  onDeleteGame,
  onUpdatePricing,
  onUpdatePricingPlan,
  onAddPricingPlan,
  onDeletePricingPlan,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  onAddGalleryItem,
  onDeleteGalleryItem,
  onAddTournament,
  onUpdateTournament,
  onDeleteTournament,
  onUpdateSiteSettings,
  onResetSiteSettings,
  onLogoutAdmin,
  onViewSite,
}: AdminDashboardProps) {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    'bookings' | 'theme_content' | 'articles' | 'pricing' | 'gallery' | 'tournaments' | 'games' | 'blocked' | 'users'
  >('bookings');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Add Blocked Slot Modal Form
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
  const [blockDate, setBlockDate] = useState(new Date().toISOString().split('T')[0]);
  const [blockTime, setBlockTime] = useState(TIME_SLOTS[0]);
  const [blockPlatform, setBlockPlatform] = useState<'PS5' | 'PC' | 'VIP Lounge' | 'All'>('All');
  const [blockReason, setBlockReason] = useState('');

  // Add New Game Form Modal
  const [showAddGameModal, setShowAddGameModal] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGamePlatform, setNewGamePlatform] = useState<'PS5' | 'PC' | 'Both'>('Both');
  const [newGameGenre, setNewGameGenre] = useState('');
  const [newGamePlayers, setNewGamePlayers] = useState('1 - 4 Players');
  const [newGameDesc, setNewGameDesc] = useState('');
  const [newGameImg, setNewGameImg] = useState('');

  // Article Modal (Create / Edit)
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [artTitle, setArtTitle] = useState('');
  const [artSubtitle, setArtSubtitle] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artAuthor, setArtAuthor] = useState('Admin Team');
  const [artCategory, setArtCategory] = useState('Hardware & Tech');
  const [artImage, setArtImage] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop');
  const [artFeatured, setArtFeatured] = useState(false);

  // Gallery Item Modal
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState<'Lounge' | 'Setup' | 'Tournaments' | 'Food & Drinks'>('Setup');
  const [galImage, setGalImage] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop');
  const [galAspect, setGalAspect] = useState<'square' | 'wide' | 'tall'>('wide');

  // Tournament Modal
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [editingTournamentId, setEditingTournamentId] = useState<string | null>(null);
  const [tournTitle, setTournTitle] = useState('');
  const [tournGame, setTournGame] = useState('EA FC 25');
  const [tournDate, setTournDate] = useState('2026-08-20');
  const [tournTime, setTournTime] = useState('04:00 PM');
  const [tournPrize, setTournPrize] = useState('₹25,000');
  const [tournFee, setTournFee] = useState('₹500 / Player');
  const [tournMaxTeams, setTournMaxTeams] = useState(32);
  const [tournRegTeams, setTournRegTeams] = useState(12);
  const [tournImg, setTournImg] = useState('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop');
  const [tournStatus, setTournStatus] = useState<'Registration Open' | 'Live Now' | 'Completed'>('Registration Open');

  // Pricing Plan Modal
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [planTitle, setPlanTitle] = useState('');
  const [planPlatform, setPlanPlatform] = useState('PS5');
  const [planRate, setPlanRate] = useState(150);
  const [planSpecs, setPlanSpecs] = useState('');
  const [planFeatures, setPlanFeatures] = useState('4K HDR Gaming, DualSense Edge, Pro Headset');

  // Editable Site Settings State
  const [editSettings, setEditSettings] = useState<SiteSettings>(siteSettings);

  // Statistics Calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter((b) => b.date === todayStr);
  const totalRevenue = bookings
    .filter((b) => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;

  // Filtered Bookings List
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.gameTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export CSV Function
  const exportToCSV = () => {
    if (bookings.length === 0) {
      showToast('No booking records to export', 'error');
      return;
    }
    const headers = 'Booking Code,Name,Phone,Email,Date,Time,Platform,Game,Duration (hrs),Players,Price (₹),Status\n';
    const rows = bookings
      .map(
        (b) =>
          `"${b.bookingCode}","${b.customerName}","${b.phone}","${b.email}","${b.date}","${b.timeSlot}","${b.platform}","${b.gameTitle}",${b.durationHours},${b.playersCount},${b.totalPrice},"${b.status}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BLACKOUT_Bookings_Report_${todayStr}.csv`;
    a.click();
    showToast('Bookings report exported successfully!', 'success');
  };

  const handleCreateBlockedSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockReason) {
      showToast('Please specify a reason for blocking the slot', 'error');
      return;
    }
    const newSlot: BlockedSlot = {
      id: `bs_${Date.now()}`,
      date: blockDate,
      timeSlot: blockTime,
      platform: blockPlatform,
      reason: blockReason,
    };
    onAddBlockedSlot(newSlot);
    setShowAddBlockModal(false);
    setBlockReason('');
    showToast(`Time slot ${blockTime} on ${blockDate} blocked!`, 'success');
  };

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameTitle) {
      showToast('Please enter game title', 'error');
      return;
    }
    const game: Game = {
      id: `g_${Date.now()}`,
      title: newGameTitle,
      platform: newGamePlatform,
      genre: newGameGenre || 'Action',
      players: newGamePlayers,
      rating: 4.9,
      image: newGameImg || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
      description: newGameDesc || 'High-performance competitive gaming title.',
      featured: true,
    };
    onAddGame(game);
    setShowAddGameModal(false);
    setNewGameTitle('');
    setNewGameDesc('');
    showToast(`New game "${game.title}" added to library!`, 'success');
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle || !artContent) {
      showToast('Please fill in title and content for the article', 'error');
      return;
    }

    const artObj: Article = {
      id: editingArticleId || `art_${Date.now()}`,
      title: artTitle,
      subtitle: artSubtitle || artTitle,
      content: artContent,
      author: artAuthor,
      date: todayStr,
      image: artImage,
      category: artCategory,
      readTime: '3 min read',
      featured: artFeatured,
    };

    if (editingArticleId && onUpdateArticle) {
      onUpdateArticle(artObj);
      showToast(`Article "${artObj.title}" updated!`, 'success');
    } else {
      onAddArticle(artObj);
      showToast('New article published to main website!', 'success');
    }

    setShowArticleModal(false);
    setEditingArticleId(null);
    setArtTitle('');
    setArtSubtitle('');
    setArtContent('');
  };

  const handleOpenEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setArtTitle(art.title);
    setArtSubtitle(art.subtitle);
    setArtContent(art.content);
    setArtAuthor(art.author);
    setArtCategory(art.category);
    setArtImage(art.image);
    setArtFeatured(art.featured || false);
    setShowArticleModal(true);
  };

  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle || !galImage) {
      showToast('Please enter title and image URL', 'error');
      return;
    }
    const item: GalleryItem = {
      id: `gal_${Date.now()}`,
      title: galTitle,
      category: galCategory,
      image: galImage,
      aspectRatio: galAspect,
    };
    if (onAddGalleryItem) {
      onAddGalleryItem(item);
    }
    setShowGalleryModal(false);
    setGalTitle('');
    showToast(`Gallery image "${item.title}" added!`, 'success');
  };

  const handleSaveTournament = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tournTitle || !tournGame) {
      showToast('Please enter title and game', 'error');
      return;
    }
    const tourney: Tournament = {
      id: editingTournamentId || `t_${Date.now()}`,
      title: tournTitle,
      game: tournGame,
      date: tournDate,
      time: tournTime,
      prizePool: tournPrize,
      entryFee: tournFee,
      maxTeams: tournMaxTeams,
      registeredTeams: tournRegTeams,
      image: tournImg,
      status: tournStatus,
    };

    if (editingTournamentId && onUpdateTournament) {
      onUpdateTournament(tourney);
      showToast(`Tournament "${tourney.title}" updated!`, 'success');
    } else if (onAddTournament) {
      onAddTournament(tourney);
      showToast(`New tournament "${tourney.title}" published!`, 'success');
    }
    setShowTournamentModal(false);
    setEditingTournamentId(null);
  };

  const handleCreatePricingPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planTitle) {
      showToast('Please enter plan title', 'error');
      return;
    }
    const newPlan: PricingPlan = {
      id: `p_${Date.now()}`,
      title: planTitle,
      platform: planPlatform,
      hourlyRate: planRate,
      specs: planSpecs || 'High-end specs',
      features: planFeatures.split(',').map((f) => f.trim()),
    };
    if (onAddPricingPlan) {
      onAddPricingPlan(newPlan);
    }
    setShowAddPlanModal(false);
    setPlanTitle('');
    showToast(`Pricing plan "${newPlan.title}" created!`, 'success');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(editSettings);
    showToast('Site content, typography & colors updated live!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#121212] border border-white/10 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="h-1.5 absolute top-0 left-0 right-0 bg-gradient-to-r from-[#f4b400] via-amber-400 to-[#ffc825]" />

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-widest">
                ADMIN CONTROL CENTER
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live CMS Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 uppercase font-orbitron">
              BLACKOUT <span className="text-[#f4b400]">STUDIO & CONTENT MANAGER</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Full editing control over articles, prices, layout columns, fonts, colors, games, and bookings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onViewSite && (
              <button
                onClick={onViewSite}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#f4b400]" /> Preview Live Website
              </button>
            )}
            <button
              onClick={exportToCSV}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export Bookings CSV
            </button>
            <button
              onClick={onLogoutAdmin}
              className="px-4 py-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Exit Admin
            </button>
          </div>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Confirmed Revenue</p>
              <h3 className="text-2xl font-black text-[#f4b400] mt-1">{formatCurrency(totalRevenue)}</h3>
              <p className="text-[11px] text-emerald-400 mt-1">From Confirmed Reservations</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#f4b400]/10 border border-[#f4b400]/20 text-[#f4b400]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Today&apos;s Bookings</p>
              <h3 className="text-2xl font-black text-white mt-1">{todayBookings.length}</h3>
              <p className="text-[11px] text-gray-400 mt-1">Date: {todayStr}</p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Pending Review</p>
              <h3 className="text-2xl font-black text-amber-400 mt-1">{pendingCount}</h3>
              <p className="text-[11px] text-amber-400 mt-1">Awaiting confirmation</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Articles & Media</p>
              <h3 className="text-2xl font-black text-purple-400 mt-1">{articles.length} Articles</h3>
              <p className="text-[11px] text-purple-400 mt-1">{galleryItems.length} Gallery Photos</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Newspaper className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-[#f4b400] text-black shadow-lg shadow-[#f4b400]/20'
                : 'bg-[#121212] text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <Calendar className="w-4 h-4" /> Bookings ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('theme_content')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'theme_content'
                ? 'bg-[#f4b400] text-black shadow-lg shadow-[#f4b400]/20'
                : 'bg-[#121212] text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <Sliders className="w-4 h-4" /> Text, Colors, Columns & Fonts
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-[#f4b400] text-black shadow-lg shadow-[#f4b400]/20'
                : 'bg-[#121212] text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <Newspaper className="w-4 h-4" /> Articles ({articles.length})
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'pricing'
                ? 'bg-[#f4b400] text-black shadow-lg shadow-[#f4b400]/20'
                : 'bg-[#121212] text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <Tag className="w-4 h-4" /> Prices & Rates ({pricingPlans.length})
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#f4b400] text-black shadow-lg shadow-[#f4b400]/20'
                : 'bg-[#121212] text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Images & Gallery ({galleryItems.length})
          </button>

          <button
            onClick={() => setActiveTab('tournaments')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'tournaments'
                ? 'bg-[#f4b400] text-black shadow-lg shadow-[#f4b400]/20'
                : 'bg-[#121212] text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <Trophy className="w-4 h-4" /> Tournaments ({tournaments.length})
          </button>

          <button
            onClick={() => setActiveTab('games')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'games'
                ? 'bg-[#f4b400] text-black shadow-lg shadow-[#f4b400]/20'
                : 'bg-[#121212] text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <Gamepad2 className="w-4 h-4" /> Games Roster ({games.length})
          </button>

          <button
            onClick={() => setActiveTab('blocked')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'blocked'
                ? 'bg-[#f4b400] text-black shadow-lg shadow-[#f4b400]/20'
                : 'bg-[#121212] text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <Ban className="w-4 h-4" /> Blocked Slots ({blockedSlots.length})
          </button>
        </div>

        {/* TAB 1: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#121212] border border-white/10 rounded-2xl">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search code, customer, phone, game..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f4b400]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-gray-400 font-semibold shrink-0">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#f4b400]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-gray-400 font-bold uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Code</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Platform & Game</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-500 font-semibold">
                          No matching booking records found.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 font-mono font-bold text-[#f4b400]">{b.bookingCode}</td>
                          <td className="p-4">
                            <p className="font-bold text-white">{b.customerName}</p>
                            <p className="text-[11px] text-gray-400">{b.phone} | {b.email}</p>
                          </td>
                          <td className="p-4 text-gray-300">
                            <p className="font-semibold">{formatDate(b.date)}</p>
                            <p className="text-[11px] text-gray-400">{b.timeSlot} ({b.durationHours} hrs)</p>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-amber-400 mr-2">
                              {b.platform}
                            </span>
                            <span className="font-semibold text-white">{b.gameTitle}</span>
                          </td>
                          <td className="p-4 font-bold text-white">₹{b.totalPrice}</td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                b.status === 'Confirmed'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : b.status === 'Pending'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : b.status === 'Completed'
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1">
                            {b.status !== 'Confirmed' && (
                              <button
                                onClick={() => {
                                  onUpdateBookingStatus(b.id, 'Confirmed');
                                  showToast(`Booking ${b.bookingCode} confirmed!`, 'success');
                                }}
                                className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                                title="Confirm"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {b.status !== 'Cancelled' && (
                              <button
                                onClick={() => {
                                  onUpdateBookingStatus(b.id, 'Cancelled');
                                  showToast(`Booking ${b.bookingCode} cancelled`, 'error');
                                }}
                                className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors cursor-pointer"
                                title="Cancel"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                onDeleteBooking(b.id);
                                showToast(`Booking deleted`, 'info');
                              }}
                              className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SITE CONTENT, TYPOGRAPHY, COLORS & COLUMNS CUSTOMIZER */}
        {activeTab === 'theme_content' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="p-6 bg-[#121212] border border-white/10 rounded-3xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-orbitron">
                    <Palette className="w-5 h-5 text-[#f4b400]" />
                    LIVE TEXT, COLOUR, FONT & COLUMN LAYOUT EDITOR
                  </h3>
                  <p className="text-xs text-gray-400">
                    Modify site text, accent colors, font styles, and layout grid column counts.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onResetSiteSettings();
                      setEditSettings(siteSettings);
                      showToast('Reset settings to default', 'info');
                    }}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs hover:bg-[#ffc825] transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" /> Save & Apply Live Changes
                  </button>
                </div>
              </div>

              {/* SECTION 1: COLORS & FONTS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-black/40 border border-white/10 rounded-2xl">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2 flex items-center gap-1">
                    <Palette className="w-4 h-4 text-[#f4b400]" /> Accent Theme Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editSettings.accentColor}
                      onChange={(e) => setEditSettings({ ...editSettings, accentColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={editSettings.accentColor}
                      onChange={(e) => setEditSettings({ ...editSettings, accentColor: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    {['#f4b400', '#00f0ff', '#ff3366', '#10b981', '#a855f7', '#ff7700'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setEditSettings({ ...editSettings, accentColor: color })}
                        className="w-6 h-6 rounded-full border border-white/20 transition-transform hover:scale-110 cursor-pointer"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2 flex items-center gap-1">
                    <Type className="w-4 h-4 text-[#f4b400]" /> Heading Font
                  </label>
                  <select
                    value={editSettings.headingFont}
                    onChange={(e) => setEditSettings({ ...editSettings, headingFont: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  >
                    <option value="Orbitron">Orbitron (Cyber Esports)</option>
                    <option value="Montserrat">Montserrat (Bold Clean)</option>
                    <option value="Space Grotesk">Space Grotesk (Tech Modern)</option>
                    <option value="Oswald">Oswald (High Contrast)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2 flex items-center gap-1">
                    <LayoutGrid className="w-4 h-4 text-[#f4b400]" /> Games Grid Layout Columns
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditSettings({ ...editSettings, gamesColumns: 3 })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        editSettings.gamesColumns === 3
                          ? 'bg-[#f4b400] text-black border-[#f4b400]'
                          : 'bg-black/40 text-gray-400 border-white/10'
                      }`}
                    >
                      3 Columns
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditSettings({ ...editSettings, gamesColumns: 4 })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        editSettings.gamesColumns === 4
                          ? 'bg-[#f4b400] text-black border-[#f4b400]'
                          : 'bg-black/40 text-gray-400 border-white/10'
                      }`}
                    >
                      4 Columns
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 2: HERO BANNER & TEXT EDIT */}
              <div className="p-5 bg-black/40 border border-white/10 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#f4b400]" />
                  Hero Section Content & Banner Image
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Hero Title Heading</label>
                    <input
                      type="text"
                      value={editSettings.heroTitle}
                      onChange={(e) => setEditSettings({ ...editSettings, heroTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Hero Background Image URL</label>
                    <input
                      type="text"
                      value={editSettings.heroImage}
                      onChange={(e) => setEditSettings({ ...editSettings, heroImage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Hero Subtitle Text</label>
                  <textarea
                    rows={2}
                    value={editSettings.heroSubtitle}
                    onChange={(e) => setEditSettings({ ...editSettings, heroSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              {/* SECTION 3: ABOUT SECTION TEXT EDIT */}
              <div className="p-5 bg-black/40 border border-white/10 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4 text-[#f4b400]" />
                  About Section Headline & Body Text
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">About Headline</label>
                    <input
                      type="text"
                      value={editSettings.aboutHeadline}
                      onChange={(e) => setEditSettings({ ...editSettings, aboutHeadline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">About Image URL</label>
                    <input
                      type="text"
                      value={editSettings.aboutImage}
                      onChange={(e) => setEditSettings({ ...editSettings, aboutImage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">About Description Text</label>
                  <textarea
                    rows={3}
                    value={editSettings.aboutDescription}
                    onChange={(e) => setEditSettings({ ...editSettings, aboutDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              {/* SECTION 4: CONTACT INFO */}
              <div className="p-5 bg-black/40 border border-white/10 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#f4b400]" />
                  Contact Address, Phone & Email
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Address</label>
                    <input
                      type="text"
                      value={editSettings.contactAddress}
                      onChange={(e) => setEditSettings({ ...editSettings, contactAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={editSettings.contactPhone}
                      onChange={(e) => setEditSettings({ ...editSettings, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Email</label>
                    <input
                      type="text"
                      value={editSettings.contactEmail}
                      onChange={(e) => setEditSettings({ ...editSettings, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: ARTICLES CMS */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/10 rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-[#f4b400]" />
                  Articles & Gaming Journal Editor
                </h3>
                <p className="text-xs text-gray-400">Publish, edit, or delete articles and news posts.</p>
              </div>

              <button
                onClick={() => {
                  setEditingArticleId(null);
                  setArtTitle('');
                  setArtSubtitle('');
                  setArtContent('');
                  setShowArticleModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#f4b400] text-black font-bold text-xs hover:bg-[#ffc825] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Add New Article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((art) => (
                <div key={art.id} className="p-4 rounded-2xl bg-[#121212] border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <img src={art.image} alt={art.title} className="w-full h-36 object-cover rounded-xl" />
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span className="text-[#f4b400] font-bold">{art.category}</span>
                      <span>{art.date}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm line-clamp-2">{art.title}</h4>
                    <p className="text-xs text-gray-400 line-clamp-2">{art.subtitle}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenEditArticle(art)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#f4b400]" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        onDeleteArticle(art.id);
                        showToast('Article deleted', 'info');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRICES & RATES CMS */}
        {activeTab === 'pricing' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/10 rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#f4b400]" />
                  Pricing Plans & Hourly Rates Editor
                </h3>
                <p className="text-xs text-gray-400">
                  Update hourly rates, specs, and features for gaming stations.
                </p>
              </div>

              <button
                onClick={() => setShowAddPlanModal(true)}
                className="px-4 py-2 rounded-xl bg-[#f4b400] text-black font-bold text-xs hover:bg-[#ffc825] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Create Pricing Plan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#f4b400] bg-[#f4b400]/10 px-2 py-0.5 rounded border border-[#f4b400]/20">
                        {plan.platform}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">{plan.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{plan.specs}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">Hourly Rate</p>
                      <p className="text-xl font-black text-[#f4b400]">₹{plan.hourlyRate}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={plan.hourlyRate}
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value);
                          if (!isNaN(val) && val > 0) {
                            onUpdatePricing(plan.id, val);
                            showToast(`Updated rate for ${plan.title} to ₹${val}`, 'success');
                          }
                        }}
                        className="w-24 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white font-bold"
                      />
                      <span className="text-xs text-gray-400">Rate (₹)</span>
                    </div>

                    {onDeletePricingPlan && (
                      <button
                        onClick={() => {
                          onDeletePricingPlan(plan.id);
                          showToast(`Plan deleted`, 'info');
                        }}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: IMAGES & GALLERY CMS */}
        {activeTab === 'gallery' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/10 rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#f4b400]" />
                  Gallery Images & Media Manager
                </h3>
                <p className="text-xs text-gray-400">Add new gallery photos or delete existing images.</p>
              </div>

              <button
                onClick={() => setShowGalleryModal(true)}
                className="px-4 py-2 rounded-xl bg-[#f4b400] text-black font-bold text-xs hover:bg-[#ffc825] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Add Gallery Photo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
                  <img src={item.image} alt={item.title} className="w-full h-36 object-cover rounded-xl" />
                  <div>
                    <span className="text-[10px] font-bold text-[#f4b400] uppercase">{item.category}</span>
                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  </div>
                  {onDeleteGalleryItem && (
                    <button
                      onClick={() => {
                        onDeleteGalleryItem(item.id);
                        showToast(`Removed photo ${item.title}`, 'info');
                      }}
                      className="w-full py-1.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Photo
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: TOURNAMENTS */}
        {activeTab === 'tournaments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/10 rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#f4b400]" />
                  Esports Tournaments Manager
                </h3>
                <p className="text-xs text-gray-400">Create tournaments, update prize pools, and manage team registrations.</p>
              </div>

              <button
                onClick={() => {
                  setEditingTournamentId(null);
                  setTournTitle('');
                  setShowTournamentModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#f4b400] text-black font-bold text-xs hover:bg-[#ffc825] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Add Tournament
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tournaments.map((t) => (
                <div key={t.id} className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
                  <img src={t.image} alt={t.title} className="w-full h-36 object-cover rounded-xl" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#f4b400] uppercase bg-[#f4b400]/10 px-2 py-0.5 rounded">
                      {t.status}
                    </span>
                    <span className="text-xs font-mono text-gray-400">{t.date} @ {t.time}</span>
                  </div>
                  <h4 className="font-bold text-white text-base">{t.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>Prize: <strong className="text-[#f4b400]">{t.prizePool}</strong></span>
                    <span>Fee: {t.entryFee}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Teams: {t.registeredTeams}/{t.maxTeams}</span>
                    {onDeleteTournament && (
                      <button
                        onClick={() => {
                          onDeleteTournament(t.id);
                          showToast('Tournament deleted', 'info');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: GAMES ROSTER */}
        {activeTab === 'games' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/10 rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-[#f4b400]" />
                  Gaming Roster & Hardware Library
                </h3>
                <p className="text-xs text-gray-400">Add or remove titles available on PC and PS5 stations.</p>
              </div>

              <button
                onClick={() => setShowAddGameModal(true)}
                className="px-4 py-2 rounded-xl bg-[#f4b400] text-black font-bold text-xs hover:bg-[#ffc825] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Add Game
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {games.map((game) => (
                <div key={game.id} className="p-4 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
                  <img src={game.image} alt={game.title} className="w-full h-32 object-cover rounded-xl" />
                  <div>
                    <span className="text-[10px] font-bold text-[#f4b400]">{game.platform}</span>
                    <h4 className="font-bold text-white text-sm">{game.title}</h4>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">{game.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      onDeleteGame(game.id);
                      showToast(`Removed game ${game.title}`, 'info');
                    }}
                    className="w-full py-1.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Game
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: BLOCKED MAINTENANCE SLOTS */}
        {activeTab === 'blocked' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/10 rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Ban className="w-5 h-5 text-[#f4b400]" />
                  Station Maintenance & Blocked Time Slots
                </h3>
                <p className="text-xs text-gray-400">Block specific dates/time slots for maintenance or private events.</p>
              </div>

              <button
                onClick={() => setShowAddBlockModal(true)}
                className="px-4 py-2 rounded-xl bg-[#f4b400] text-black font-bold text-xs hover:bg-[#ffc825] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Block New Time Slot
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blockedSlots.length === 0 ? (
                <div className="col-span-full p-8 text-center text-gray-500 bg-[#121212] rounded-2xl border border-white/10">
                  No maintenance blocked slots scheduled.
                </div>
              ) : (
                blockedSlots.map((bs) => (
                  <div key={bs.id} className="p-4 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase">
                        {bs.platform}
                      </span>
                      <span className="text-xs font-mono text-gray-400">{bs.date} @ {bs.timeSlot}</span>
                    </div>
                    <p className="text-xs text-white font-semibold">{bs.reason}</p>
                    <button
                      onClick={() => {
                        onDeleteBlockedSlot(bs.id);
                        showToast(`Unblocked slot for ${bs.date}`, 'success');
                      }}
                      className="w-full py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" /> Unblock Slot
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* ARTICLE MODAL */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#121212] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white font-orbitron">
                {editingArticleId ? 'Edit Article' : 'Publish Article'}
              </h3>
              <button onClick={() => setShowArticleModal(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Article Title</label>
                <input
                  type="text"
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Subtitle / Excerpt</label>
                <input
                  type="text"
                  value={artSubtitle}
                  onChange={(e) => setArtSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={artImage}
                  onChange={(e) => setArtImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Content Body</label>
                <textarea
                  rows={4}
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-art-chk"
                  checked={artFeatured}
                  onChange={(e) => setArtFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#f4b400]"
                />
                <label htmlFor="featured-art-chk" className="text-xs text-gray-300">
                  Mark as Featured Article
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs hover:bg-[#ffc825] transition-colors cursor-pointer"
              >
                {editingArticleId ? 'Save Changes' : 'Publish Article'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY PHOTO MODAL */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Add Gallery Photo</h3>
              <button onClick={() => setShowGalleryModal(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={galTitle}
                  onChange={(e) => setGalTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Category</label>
                <select
                  value={galCategory}
                  onChange={(e) => setGalCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                >
                  <option value="Setup">Setup</option>
                  <option value="Lounge">Lounge</option>
                  <option value="Tournaments">Tournaments</option>
                  <option value="Food & Drinks">Food & Drinks</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={galImage}
                  onChange={(e) => setGalImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs hover:bg-[#ffc825] transition-colors cursor-pointer"
              >
                Add Photo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TOURNAMENT MODAL */}
      {showTournamentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Add Tournament</h3>
              <button onClick={() => setShowTournamentModal(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTournament} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Tournament Title</label>
                <input
                  type="text"
                  value={tournTitle}
                  onChange={(e) => setTournTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Game</label>
                  <input
                    type="text"
                    value={tournGame}
                    onChange={(e) => setTournGame(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Prize Pool</label>
                  <input
                    type="text"
                    value={tournPrize}
                    onChange={(e) => setTournPrize(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={tournDate}
                    onChange={(e) => setTournDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Entry Fee</label>
                  <input
                    type="text"
                    value={tournFee}
                    onChange={(e) => setTournFee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Banner Image URL</label>
                <input
                  type="text"
                  value={tournImg}
                  onChange={(e) => setTournImg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs hover:bg-[#ffc825] transition-colors cursor-pointer"
              >
                Publish Tournament
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE PRICING PLAN MODAL */}
      {showAddPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Create Pricing Plan</h3>
              <button onClick={() => setShowAddPlanModal(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePricingPlan} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Plan Title</label>
                <input
                  type="text"
                  placeholder="e.g. PS5 VIP Station"
                  value={planTitle}
                  onChange={(e) => setPlanTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Platform</label>
                  <select
                    value={planPlatform}
                    onChange={(e) => setPlanPlatform(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  >
                    <option value="PS5">PS5 Pro</option>
                    <option value="PC">PC Esports</option>
                    <option value="VIP Lounge">VIP Lounge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    value={planRate}
                    onChange={(e) => setPlanRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Hardware Specs Summary</label>
                <input
                  type="text"
                  placeholder="e.g. 4K OLED + DualSense Edge"
                  value={planSpecs}
                  onChange={(e) => setPlanSpecs(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs hover:bg-[#ffc825] transition-colors cursor-pointer"
              >
                Create Plan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD BLOCK MODAL */}
      {showAddBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Block Maintenance Slot</h3>
              <button onClick={() => setShowAddBlockModal(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBlockedSlot} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={blockDate}
                    onChange={(e) => setBlockDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1">Time Slot</label>
                  <select
                    value={blockTime}
                    onChange={(e) => setBlockTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  >
                    {TIME_SLOTS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Platform Zone</label>
                <select
                  value={blockPlatform}
                  onChange={(e) => setBlockPlatform(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                >
                  <option value="All">All Stations & Zones</option>
                  <option value="PS5">PS5 Pro Zone</option>
                  <option value="PC">Esports PC Rigs</option>
                  <option value="VIP Lounge">VIP Private Lounge</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Reason for Blocking</label>
                <input
                  type="text"
                  placeholder="e.g. GPU maintenance or private tournament stream"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs hover:bg-[#ffc825] transition-colors cursor-pointer"
              >
                Confirm Block Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD GAME MODAL */}
      {showAddGameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Add Game to Library</h3>
              <button onClick={() => setShowAddGameModal(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGame} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Game Title</label>
                <input
                  type="text"
                  placeholder="e.g. Tekken 8"
                  value={newGameTitle}
                  onChange={(e) => setNewGameTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Platform</label>
                  <select
                    value={newGamePlatform}
                    onChange={(e) => setNewGamePlatform(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  >
                    <option value="Both">Both (PC & PS5)</option>
                    <option value="PS5">PS5 Pro</option>
                    <option value="PC">PC Esports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1">Genre</label>
                  <input
                    type="text"
                    placeholder="Fighting"
                    value={newGameGenre}
                    onChange={(e) => setNewGameGenre(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newGameDesc}
                  onChange={(e) => setNewGameDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newGameImg}
                  onChange={(e) => setNewGameImg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs hover:bg-[#ffc825] transition-colors cursor-pointer"
              >
                Add Game
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
