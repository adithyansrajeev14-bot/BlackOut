'use client';

import React, { useState } from 'react';
import { Article } from '@/lib/store';
import { Newspaper, Calendar, Clock, User, ArrowRight, X, Sparkles, Share2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/toast-provider';

interface ArticlesSectionProps {
  articles: Article[];
  accentColor?: string;
}

export function ArticlesSection({ articles, accentColor = '#f4b400' }: ArticlesSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { showToast } = useToast();

  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'success');
    }
  };

  return (
    <section id="articles" className="py-20 relative bg-[#0a0a0a] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Newspaper className="w-3.5 h-3.5" />
            LATEST NEWS & ARTICLES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-orbitron">
            BLACKOUT <span style={{ color: accentColor }}>JOURNAL</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base mt-3">
            Stay updated with hardware upgrades, tournament announcements, competitive gaming tactics, and cafe special offers.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group cursor-pointer rounded-2xl bg-[#121212] border border-white/10 hover:border-[#f4b400]/50 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1 shadow-lg"
            >
              {/* Card Thumbnail Image */}
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-[#f4b400] border border-[#f4b400]/30">
                  {art.category}
                </span>
                {art.featured && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#f4b400] text-black text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#f4b400]" />
                      {formatDate(art.date)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#f4b400]" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#f4b400] transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {art.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#f4b400]">
                  <span className="flex items-center gap-1 text-gray-400 font-normal">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    {art.author}
                  </span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail View Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full bg-gray-900 shrink-0">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />

              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2.5 text-white rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-1 rounded-full bg-[#f4b400] text-black text-[11px] font-extrabold uppercase tracking-wider inline-block mb-2">
                  {selectedArticle.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400 pb-3 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#f4b400]" />
                    {selectedArticle.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#f4b400]" />
                    {formatDate(selectedArticle.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#f4b400]" />
                    {selectedArticle.readTime}
                  </span>
                </div>

                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                  title="Share Article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm font-semibold text-[#f4b400] italic">
                {selectedArticle.subtitle}
              </p>

              <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line space-y-3 pt-2">
                {selectedArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
