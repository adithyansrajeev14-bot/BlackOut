export interface Game {
  id: string;
  title: string;
  platform: 'PS5' | 'PC' | 'Both';
  genre: string;
  players: string;
  rating: number;
  image: string;
  description: string;
  featured?: boolean;
}

export interface PricingPlan {
  id: string;
  title: string;
  platform: string;
  hourlyRate: number;
  popular?: boolean;
  features: string[];
  specs: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  phone: string;
  email: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "14:00"
  platform: 'PS5' | 'PC' | 'VIP Lounge';
  gameTitle: string;
  durationHours: number;
  playersCount: number;
  specialRequests?: string;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  createdAt: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  timeSlot: string;
  platform: 'PS5' | 'PC' | 'VIP Lounge' | 'All';
  reason: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Lounge' | 'Setup' | 'Tournaments' | 'Food & Drinks';
  image: string;
  aspectRatio: 'square' | 'wide' | 'tall';
}

export interface Tournament {
  id: string;
  title: string;
  game: string;
  date: string;
  time: string;
  prizePool: string;
  entryFee: string;
  maxTeams: number;
  registeredTeams: number;
  image: string;
  status: 'Registration Open' | 'Live Now' | 'Completed';
}

// Default Data Seed
export const DEFAULT_GAMES: Game[] = [
  {
    id: 'g1',
    title: 'EA FC 25',
    platform: 'Both',
    genre: 'Sports / Simulation',
    players: '1 - 4 Players',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    description: 'The ultimate football club simulation. Experience HyperMotionV technology on 4K 120Hz displays.',
    featured: true,
  },
  {
    id: 'g2',
    title: 'Call of Duty: Black Ops 6',
    platform: 'PC',
    genre: 'FPS / Competitive',
    players: '1 - 6 Players',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    description: 'High-octane omnimovement action on 240Hz esports screens with zero input latency.',
    featured: true,
  },
  {
    id: 'g3',
    title: 'God of War Ragnarök',
    platform: 'PS5',
    genre: 'Action Adventure',
    players: '1 Player',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
    description: 'Immerse in Nine Realms on PS5 Pro with DualSense haptic feedback and 3D Audio headsets.',
    featured: true,
  },
  {
    id: 'g4',
    title: 'GTA V / GTA RP',
    platform: 'PC',
    genre: 'Open World / Action',
    players: 'Multiplayer',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    description: 'Play custom FiveM roleplay servers or GTA Online on ultra settings with RTX ray tracing.',
  },
  {
    id: 'g5',
    title: 'Valorant',
    platform: 'PC',
    genre: 'Tactical Shooter',
    players: '5v5 Team',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    description: '5v5 character-based tactical FPS. 1Gbps low ping fiber connection with BenQ ZOWIE 240Hz specs.',
    featured: true,
  },
  {
    id: 'g6',
    title: 'Mortal Kombat 1',
    platform: 'PS5',
    genre: 'Fighting',
    players: '1 - 2 Players',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    description: 'Reborn Mortal Kombat universe featuring Kameo Fighters and arcade stick controller compatibility.',
  },
  {
    id: 'g7',
    title: 'Tekken 8',
    platform: 'Both',
    genre: 'Fighting',
    players: '1 - 2 Players',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    description: 'Unreal Engine 5 fighting spectacle with aggressive Heat System gameplay.',
  },
  {
    id: 'g8',
    title: 'Cyberpunk 2077: Phantom Liberty',
    platform: 'PC',
    genre: 'Sci-Fi RPG',
    players: '1 Player',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
    description: 'Explore Night City with full Path Tracing DLSS 3.5 on RTX 4090 rigs.',
  }
];

export const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: 'p1',
    title: 'PS5 Pro Station',
    platform: 'PS5',
    hourlyRate: 150, // ₹ or $ based unit
    popular: false,
    specs: 'PS5 Pro + 55" OLED 120Hz 4K HDR + DualSense Edge + Studio Headset',
    features: [
      '4K HDR 120FPS Gaming',
      '2x DualSense Edge Controllers',
      'PS Plus Premium All Games Unlocked',
      'Comfort Ergonomic Gaming Recliner',
      'Free High-Speed Wi-Fi'
    ]
  },
  {
    id: 'p2',
    title: 'Esports PC Rig',
    platform: 'PC',
    hourlyRate: 180,
    popular: true,
    specs: 'RTX 4080 Super + Intel i9 + 240Hz ZOWIE Monitor + Mechanical Keyboard + Logitech G Pro Mouse',
    features: [
      '240Hz Ultra-Low Latency Display',
      '1 Gbps Dedicated Fiber Line',
      'Steam, Epic & Riot Full Library',
      'HyperX Cloud II Wireless Headset',
      'Chroma RGB Custom Lighting'
    ]
  },
  {
    id: 'p3',
    title: 'VIP Ultra Lounge',
    platform: 'VIP Lounge',
    hourlyRate: 350,
    popular: false,
    specs: 'Private Soundproof Room + RTX 4090 PC + Dual PS5s + 85" 4K QD-OLED + Leather Couch',
    features: [
      'Private Soundproof Luxury Booth',
      'Dual Gaming Stations (PC + PS5)',
      '85" Monster Screen & Surround Sound',
      'Complimentary Energy Drinks & Snacks',
      'Dedicated Server Attendant'
    ]
  },
  {
    id: 'p4',
    title: 'Night Owl Pass (10 PM - 6 AM)',
    platform: 'All Platforms',
    hourlyRate: 799, // Flat overnight package
    popular: true,
    specs: '8 Hours Unlimited All-Night Gaming Session on any available rig',
    features: [
      '8 Hours Consecutive Gaming',
      'Choice of PC or PS5 Station',
      '1x Free Meal / Burger + Beverage',
      'Discounted Energy Drinks',
      'Prioritized Tournament Practice Rigs'
    ]
  }
];

export const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    bookingCode: 'BGC-9102',
    customerName: 'Alex Mercer',
    phone: '+1 555-0192',
    email: 'alex.mercer@gmail.com',
    date: '2026-08-01',
    timeSlot: '16:00',
    platform: 'PC',
    gameTitle: 'Valorant',
    durationHours: 2,
    playersCount: 2,
    specialRequests: 'Side by side PCs with discord setups',
    totalPrice: 360,
    status: 'Confirmed',
    createdAt: '2026-07-31T10:15:00Z'
  },
  {
    id: 'b2',
    bookingCode: 'BGC-8834',
    customerName: 'David Chen',
    phone: '+1 555-0283',
    email: 'd.chen@esports.org',
    date: '2026-08-01',
    timeSlot: '18:00',
    platform: 'VIP Lounge',
    gameTitle: 'EA FC 25',
    durationHours: 3,
    playersCount: 4,
    specialRequests: 'Extra controllers and cold Red Bulls',
    totalPrice: 1050,
    status: 'Confirmed',
    createdAt: '2026-07-31T11:20:00Z'
  },
  {
    id: 'b3',
    bookingCode: 'BGC-7741',
    customerName: 'Samantha Ray',
    phone: '+1 555-0441',
    email: 'sammy.ray@yahoo.com',
    date: '2026-08-02',
    timeSlot: '14:00',
    platform: 'PS5',
    gameTitle: 'God of War Ragnarök',
    durationHours: 2,
    playersCount: 1,
    specialRequests: 'Focus headset setup',
    totalPrice: 300,
    status: 'Pending',
    createdAt: '2026-07-31T15:45:00Z'
  }
];

export const DEFAULT_BLOCKED_SLOTS: BlockedSlot[] = [
  {
    id: 'bs1',
    date: '2026-08-03',
    timeSlot: '10:00',
    platform: 'PC',
    reason: 'Rig 01 - 04 Hardware Maintenance'
  },
  {
    id: 'bs2',
    date: '2026-08-05',
    timeSlot: '18:00',
    platform: 'VIP Lounge',
    reason: 'Private Tournament Stream Event'
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal1',
    title: 'Esports Battle Station Arena',
    category: 'Setup',
    image: '/images/blackout_hero.jpg',
    aspectRatio: 'wide'
  },
  {
    id: 'gal2',
    title: 'VIP Private Gaming Suite',
    category: 'Lounge',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'tall'
  },
  {
    id: 'gal3',
    title: 'PS5 OLED Gaming Zone',
    category: 'Setup',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'square'
  },
  {
    id: 'gal4',
    title: 'BLACKOUT 5v5 Valorant Cup Final',
    category: 'Tournaments',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'wide'
  },
  {
    id: 'gal5',
    title: 'Gourmet Energy Burgers & Cold Drinks',
    category: 'Food & Drinks',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'square'
  },
  {
    id: 'gal6',
    title: 'RGB Custom Liquid-Cooled Rig Closeup',
    category: 'Setup',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'tall'
  }
];

export const DEFAULT_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    title: 'BLACKOUT EA FC 25 Championship',
    game: 'EA FC 25',
    date: '2026-08-15',
    time: '04:00 PM',
    prizePool: '₹25,000 + Gold Trophy',
    entryFee: '₹500 / Player',
    maxTeams: 32,
    registeredTeams: 24,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    status: 'Registration Open'
  },
  {
    id: 't2',
    title: 'Valorant 5v5 Deathmatch Series',
    game: 'Valorant',
    date: '2026-08-22',
    time: '02:00 PM',
    prizePool: '₹50,000 Pool',
    entryFee: '₹1,500 / Team',
    maxTeams: 16,
    registeredTeams: 14,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    status: 'Registration Open'
  }
];

export const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

// Helper functions for LocalStorage persistence
const IS_SERVER = typeof window === 'undefined';

export function getStoredData<T>(key: string, fallback: T): T {
  if (IS_SERVER) return fallback;
  try {
    const item = localStorage.getItem(`blackout_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (IS_SERVER) return;
  try {
    localStorage.setItem(`blackout_${key}`, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to write to localStorage', err);
  }
}
