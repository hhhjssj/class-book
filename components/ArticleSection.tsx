import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ARTICLES, ARTICLE_LABELS } from '../constants';
import { Language, Article } from '../types';
import { ArrowDown, ArrowUp, BookOpen, Calendar, Filter, X, ArrowUpRight } from 'lucide-react';

interface ArticleSectionProps {
  language: Language;
}

type MemoryArticle = Article & {
  content?: string;
};

export const ArticleSection: React.FC<ArticleSectionProps> = ({ language }) => {
  const [filter, setFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedArticle, setSelectedArticle] = useState<MemoryArticle | null>(null);

  const currentArticles = ARTICLES[language] as MemoryArticle[];

  const categoryOrder = ['memory', 'group', 'volunteer', 'personal'];

  const categories = [
    'All',
    ...categoryOrder.filter((cat) => currentArticles.some((a) => a.category === cat))
  ];

  const filteredAndSortedArticles = currentArticles
    .filter((a) => filter === 'All' || a.category === filter)
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;

      if (filter === 'All') {
        const categoryIndexA = categoryOrder.indexOf(String(a.category));
        const categoryIndexB = categoryOrder.indexOf(String(b.category));

        if (categoryIndexA !== categoryIndexB) {
          return categoryIndexA - categoryIndexB;
        }
      }

      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedArticle]);

  return (
    <div className="w-full max-w-[96vw] mx-auto pb-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center">
        {/* 左侧分类 */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="text-xl font-black mb-8 px-4 flex items-center gap-2">
              <Filter size={20} />
              {language === 'zh' ? '回忆分类' : 'Categories'}
            </h3>

            <div className="flex flex-col space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`
                    text-left px-4 py-3 rounded-xl transition-all duration-300 text-lg font-bold
                    ${
                      filter === cat
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg transform scale-105'
                        : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  {ARTICLE_LABELS[language][cat] || cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧主体 */}
        <div className="flex-grow max-w-5xl">
          {/* 移动端分类 */}
          <div className="lg:hidden flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300
                  ${
                    filter === cat
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {ARTICLE_LABELS[language][cat] || cat}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="text-sm font-mono text-gray-400">
              {filteredAndSortedArticles.length} {language === 'zh' ? '个回忆瞬间' : 'moments'}
            </div>

            <button
              onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-bold text-gray-600 dark:text-gray-300"
            >
              <Calendar size={16} />
              <span>{language === 'zh' ? '按时间排序' : 'By Date'}</span>
              {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {filteredAndSortedArticles.map((article) => (
              <div
                key={article.id}
                className="group cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden p-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 items-stretch">
                  <div className="w-full md:w-[45%] aspect-[4/3] shrink-0 rounded-xl overflow-hidden relative bg-gray-100 dark:bg-gray-800">
                   {article.coverImage ? (
  <picture>
    <source
      media="(max-width: 768px)"
      srcSet={article.coverImage.replace('/gallery/', '/gallery/mobile/')}
    />
    <img
      src={article.coverImage}
      alt={article.title}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  </picture>
) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                        <BookOpen size={32} className="text-gray-300 dark:text-gray-600" />
                      </div>
                    )}

                    <div className="absolute top-3 left-3 bg-black/85 text-white px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm">
                      {ARTICLE_LABELS[language][article.category] || article.category}
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col p-5 md:p-8 justify-between">
                    <div>
                      <h3 className="text-2xl md:text-4xl font-black text-black dark:text-white mb-4 leading-tight">
                        {article.title}
                      </h3>

                      <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {article.content || ''}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                      <div className="text-sm font-mono text-gray-400">{article.date || ''}</div>

                      <div className="flex items-center gap-2 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                        <span className="text-sm font-bold">
                          {language === 'zh' ? '查看详情' : 'View'}
                        </span>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedArticle &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setSelectedArticle(null)}
            />

            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/10 animate-message-pop">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 rounded-full bg-white/60 dark:bg-black/50 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X size={24} className="text-black dark:text-white" />
              </button>

<div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-t-[2rem] px-4 md:px-8 pt-6 md:pt-8 pb-4 flex items-center justify-center">
  {selectedArticle.coverImage ? (
    <picture className="w-full flex items-center justify-center">
      <source
        media="(max-width: 768px)"
        srcSet={selectedArticle.coverImage.replace('/gallery/', '/gallery/mobile/')}
      />
      <img
        src={selectedArticle.coverImage}
        alt={selectedArticle.title}
        decoding="async"
        className="max-w-full w-auto max-h-[50vh] md:max-h-[62vh] object-contain rounded-2xl"
      />
    </picture>
  ) : (
    <div className="w-full h-[32vh] flex items-center justify-center">
      <BookOpen size={52} className="text-zinc-400 dark:text-zinc-600" />
    </div>
  )}
</div>

              <div className="p-6 md:p-12">
                <div className="mb-8 md:mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-md">
                      {ARTICLE_LABELS[language][selectedArticle.category] || selectedArticle.category}
                    </span>
                    <span className="text-gray-500 font-mono text-sm font-bold tracking-widest">
                      {selectedArticle.date || ''}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-6 leading-tight">
                    {selectedArticle.title}
                  </h2>

                  <p className="text-lg md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300">
                    {selectedArticle.content || ''}
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};