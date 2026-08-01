'use client';

import React, { useState } from 'react';
import { Booking, BlockedSlot, Game, PricingPlan, TIME_SLOTS } from '@/lib/store';
import {
  ShieldAlert,
  Calendar,
  DollarSign,
  Users,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Plus,
  Download,
  Ban,
  Gamepad2,
  Tag,
  LogOut,
  Clock,
  PlusCircle,
  X
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useToast } from '../toast-provider';

interface AdminDashboardProps {
  bookings: Booking[];
  blockedSlots: BlockedSlot[];
  games: Game[];
  pricingPlans: PricingPlan[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
  onDeleteBooking: (id: string) => void;
  onAddBlockedSlot: (slot: BlockedSlot) => void;
  onDeleteBlockedSlot: (id: string) => void;
  onAddGame: (game: Game) => void;
  onDeleteGame: (id: string) => void;
  onUpdatePricing: (id: string, newRate: number) => void;
  onLogoutAdmin: () => void;
}

export function AdminDashboard({
  bookings,
  blockedSlots,
  games,
  pricingPlans,
  onUpdateBookingStatus,
  onDeleteBooking,
  onAddBlockedSlot,
  onDeleteBlockedSlot,
  onAddGame,
  onDeleteGame,
  onUpdatePricing,
  onLogoutAdmin,
}: AdminDashboardProps) {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'bookings' | 'blocked' | 'games' | 'pricing'>('bookings');
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
    const headers = ['Booking ID,Customer,Phone,Email,Date,Time,Platform,Game,Duration,Price,Status\n'];
    const rows = bookings.map(
      (b) =>
        `"${b.bookingCode}","${b.customerName}","${b.phone}","${b.email}","${b.date}","${b.timeSlot}","${b.platform}","${b.gameTitle}",${b.durationHours},${b.totalPrice},"${b.status}"\n`
    );

    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blackout_bookings_export_${todayStr}.csv`;
    a.click();
    showToast('Exported Bookings CSV', 'File downloaded successfully.', 'success');
  };

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockReason) return;

    const newBlock: BlockedSlot = {
      id: `bs_${Date.now()}`,
      date: blockDate,
      timeSlot: blockTime,
      platform: blockPlatform,
      reason: blockReason,
    };

    onAddBlockedSlot(newBlock);
    setShowAddBlockModal(false);
    setBlockReason('');
    showToast('Slot Blocked', `Slot ${blockTime} on ${blockDate} is now blocked.`, 'info');
  };

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameTitle || !newGameGenre) return;

    const newGameObj: Game = {
      id: `g_${Date.now()}`,
      title: newGameTitle,
      platform: newGamePlatform,
      genre: newGameGenre,
      players: newGamePlayers,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
      description: newGameDesc || 'High performance gaming title unlocked for all stations.',
    };

    onAddGame(newGameObj);
    setShowAddGameModal(false);
    setNewGameTitle('');
    setNewGameGenre('');
    setNewGameDesc('');
    showToast('New Game Added', `${newGameTitle} added to game library.`, 'success');
  };

  return (
    <div id="admin-dashboard" className="py-24 bg-[#050505] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#141414] border border-[#f4b400]/40 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#f4b400] text-black flex items-center justify-center font-bold">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-wider text-white">
                BLACKOUT <span className="text-[#f4b400]">CONTROL CENTER</span>
              </h1>
              <p className="text-xs text-gray-400">Manage real-time bookings, pricing rates, and station blocks</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportToCSV}
              className="px-4 py-2.5 rounded-xl bg-[#222] border border-white/10 hover:border-[#f4b400] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#f4b400]" />
              Export CSV
            </button>

            <button
              onClick={onLogoutAdmin}
              className="px-4 py-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl glass-gold-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-[#f4b400]" />
            </div>
            <span className="block text-3xl font-black text-white mt-2">
              {formatCurrency(totalRevenue)}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">Confirmed bookings sum</span>
          </div>

          <div className="p-5 rounded-2xl glass-gold-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Today&apos;s Bookings</span>
              <Calendar className="w-5 h-5 text-[#f4b400]" />
            </div>
            <span className="block text-3xl font-black text-white mt-2">{todayBookings.length}</span>
            <span className="text-[10px] text-gray-400 font-semibold mt-1 block">For date {todayStr}</span>
          </div>

          <div className="p-5 rounded-2xl glass-gold-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Pending Approvals</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <span className="block text-3xl font-black text-amber-400 mt-2">{pendingCount}</span>
            <span className="text-[10px] text-gray-400 font-semibold mt-1 block">Requires admin action</span>
          </div>

          <div className="p-5 rounded-2xl glass-gold-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Blocked Slots</span>
              <Ban className="w-5 h-5 text-red-400" />
            </div>
            <span className="block text-3xl font-black text-white mt-2">{blockedSlots.length}</span>
            <span className="text-[10px] text-red-400 font-semibold mt-1 block">Maintenance & Private</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          {[
            { id: 'bookings', label: 'All Bookings', icon: Calendar },
            { id: 'blocked', label: 'Blocked Hours', icon: Ban },
            { id: 'games', label: 'Manage Games', icon: Gamepad2 },
            { id: 'pricing', label: 'Pricing Rates', icon: Tag },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#f4b400] text-black shadow-lg shadow-[#f4b400]/20'
                    : 'bg-[#141414] text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: BOOKINGS TABLE */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search customer, code or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#f4b400]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#141414] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f4b400]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#141414] overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#0a0a0a] text-gray-400 font-bold uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Platform & Game</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-black text-[#f4b400] whitespace-nowrap">{b.bookingCode}</td>
                      <td className="p-4">
                        <div className="font-bold text-white">{b.customerName}</div>
                        <div className="text-[10px] text-gray-500">{b.phone}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div>{b.date}</div>
                        <div className="text-[#f4b400] font-bold">{b.timeSlot}</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-white font-semibold text-[10px] mr-1">
                          {b.platform}
                        </span>
                        <span className="font-medium text-gray-200">{b.gameTitle}</span>
                      </td>
                      <td className="p-4 font-semibold">{b.durationHours} Hours</td>
                      <td className="p-4 font-black text-white">{formatCurrency(b.totalPrice)}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : b.status === 'Pending'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : b.status === 'Completed'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                              : 'bg-red-500/20 text-red-400 border border-red-500/40'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {b.status !== 'Confirmed' && (
                            <button
                              onClick={() => {
                                onUpdateBookingStatus(b.id, 'Confirmed');
                                showToast('Booking Confirmed', `${b.bookingCode} approved.`, 'success');
                              }}
                              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40"
                              title="Approve / Confirm"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {b.status !== 'Completed' && (
                            <button
                              onClick={() => {
                                onUpdateBookingStatus(b.id, 'Completed');
                                showToast('Session Completed', `${b.bookingCode} marked complete.`, 'info');
                              }}
                              className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/40"
                              title="Mark Completed"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                          )}

                          {b.status !== 'Cancelled' && (
                            <button
                              onClick={() => {
                                onUpdateBookingStatus(b.id, 'Cancelled');
                                showToast('Booking Cancelled', `${b.bookingCode} status set to cancelled.`, 'error');
                              }}
                              className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40"
                              title="Cancel Booking"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            onClick={() => {
                              onDeleteBooking(b.id);
                              showToast('Booking Deleted', `Record removed.`, 'info');
                            }}
                            className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredBookings.length === 0 && (
                <div className="p-8 text-center text-gray-500">No bookings match the current search filter.</div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: BLOCKED HOURS */}
        {activeTab === 'blocked' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Blocked Station Hours</h3>
                <p className="text-xs text-gray-400">Prevent slots from being booked for maintenance or private tournaments</p>
              </div>
              <button
                onClick={() => setShowAddBlockModal(true)}
                className="px-4 py-2 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs uppercase flex items-center gap-2 cursor-pointer shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                Block Time Slot
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blockedSlots.map((bs) => (
                <div key={bs.id} className="p-5 rounded-2xl bg-[#141414] border border-red-500/30 flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                      Blocked ({bs.platform})
                    </span>
                    <h4 className="text-base font-bold text-white">{bs.date} @ {bs.timeSlot}</h4>
                    <p className="text-xs text-gray-400">{bs.reason}</p>
                  </div>
                  <button
                    onClick={() => onDeleteBlockedSlot(bs.id)}
                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE GAMES */}
        {activeTab === 'games' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Installed Game Catalog</h3>
                <p className="text-xs text-gray-400">Add or remove titles available in the slot booking selector</p>
              </div>
              <button
                onClick={() => setShowAddGameModal(true)}
                className="px-4 py-2 rounded-xl bg-[#f4b400] text-black font-extrabold text-xs uppercase flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add New Game Title
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {games.map((g) => (
                <div key={g.id} className="p-4 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{g.title}</h4>
                    <p className="text-xs text-[#f4b400] font-semibold">{g.genre}</p>
                    <p className="text-[11px] text-gray-400 mt-1">Platform: {g.platform}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs text-gray-400">{g.players}</span>
                    <button
                      onClick={() => onDeleteGame(g.id)}
                      className="p-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRICING RATES */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Station Hourly Rates</h3>
              <p className="text-xs text-gray-400">Update hourly pricing in real-time</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="p-6 rounded-2xl bg-[#141414] border border-[#f4b400]/40 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#f4b400]">{plan.platform}</span>
                    <h4 className="text-xl font-bold text-white">{plan.title}</h4>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Hourly Rate ($)</label>
                    <input
                      type="number"
                      value={plan.hourlyRate}
                      onChange={(e) => onUpdatePricing(plan.id, Number(e.target.value))}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-lg font-black text-[#f4b400]"
                    />
                  </div>

                  <p className="text-xs text-gray-400">{plan.specs}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Blocked Slot */}
      {showAddBlockModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#141414] border border-[#f4b400]/40 rounded-2xl p-6 space-y-4 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Block Time Slot</h3>
              <button onClick={() => setShowAddBlockModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBlock} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-400 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={blockDate}
                  onChange={(e) => setBlockDate(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-400 mb-1">Time Slot</label>
                <select
                  value={blockTime}
                  onChange={(e) => setBlockTime(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-2.5 text-white"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-400 mb-1">Platform</label>
                <select
                  value={blockPlatform}
                  onChange={(e) => setBlockPlatform(e.target.value as any)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-2.5 text-white"
                >
                  <option value="All">All Stations</option>
                  <option value="PC">PC Rigs Only</option>
                  <option value="PS5">PS5 Stations Only</option>
                  <option value="VIP Lounge">VIP Suite Only</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-400 mb-1">Reason for Block</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rig 01-04 Maintenance"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-500 text-white font-bold uppercase tracking-wider cursor-pointer mt-2"
              >
                Confirm Block
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Game */}
      {showAddGameModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#141414] border border-[#f4b400]/40 rounded-2xl p-6 space-y-4 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Add New Game Title</h3>
              <button onClick={() => setShowAddGameModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGame} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-400 mb-1">Title Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Street Fighter 6"
                  value={newGameTitle}
                  onChange={(e) => setNewGameTitle(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-400 mb-1">Platform</label>
                <select
                  value={newGamePlatform}
                  onChange={(e) => setNewGamePlatform(e.target.value as any)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-2.5 text-white"
                >
                  <option value="Both">Both (PS5 & PC)</option>
                  <option value="PS5">PS5 Only</option>
                  <option value="PC">PC Only</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-400 mb-1">Genre</label>
                <input
                  type="text"
                  required
                  placeholder="Fighting / Competitive"
                  value={newGameGenre}
                  onChange={(e) => setNewGameGenre(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-400 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Short description..."
                  value={newGameDesc}
                  onChange={(e) => setNewGameDesc(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#f4b400] text-black font-bold uppercase tracking-wider cursor-pointer mt-2"
              >
                Add To Library
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
