'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/store';
import { Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export function GallerySection({ galleryItems }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Setup', 'Lounge', 'Tournaments', 'Food & Drinks'];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-24 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4b400]/10 border border-[#f4b400]/30 text-[#f4b400] text-xs font-bold uppercase tracking-widest mb-3">
              <ImageIcon className="w-3.5 h-3.5" />
              Inside Blackout
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              LOUNGE <span className="text-[#f4b400]">GALLERY</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Take a look inside our luxury gaming arenas, VIP suites, and tournament stages.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#141414] p-1.5 rounded-full border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#f4b400] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setLightboxImage(item)}
              className="relative h-72 rounded-2xl overflow-hidden glass-gold-card group cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-black uppercase text-[#f4b400] tracking-widest">
                  {item.category}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <div className="w-8 h-8 rounded-full bg-[#f4b400] text-black flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-[#f4b400]/40 bg-[#141414] shadow-2xl"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/80 text-white hover:text-[#f4b400] border border-white/20 flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-[60vh] max-h-[75vh] w-full bg-black flex items-center justify-center">
                <Image
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-[#141414] border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-[#f4b400] tracking-widest">
                    {lightboxImage.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{lightboxImage.title}</h3>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="px-4 py-2 rounded-xl bg-[#f4b400] text-black font-bold text-xs uppercase"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
