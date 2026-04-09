import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../src/data/navigation';
import { Language } from '../types';
import { Moon, Sun, Globe, Bomb } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  toggleLanguage: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onTriggerGravity: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  language,
  toggleLanguage,
  theme,
  toggleTheme,
  onTriggerGravity
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = NAV_ITEMS[language];
  const classBadgeSrc = `${import.meta.env.BASE_URL}home/class-badge.png`;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        isScrolled ? 'pt-4 md:pt-6' : 'pt-4 md:pt-6'
      }`}
    >
      <nav
        className={`
          flex items-center justify-between
          transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          ${
            isScrolled
              ? 'w-[92vw] md:w-auto gap-2 md:gap-12 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl md:rounded-full px-4 md:px-10 py-3 md:py-4 shadow-pill dark:shadow-pill-dark'
              : 'w-[96vw] bg-transparent border-transparent shadow-none px-0 py-2 backdrop-blur-none'
          }
        `}
      >
        {/* 左侧   const categoryOrder = [
    ArticleCategory.MEMORY,
    ArticleCategory.GROUP,
    ArticleCategory.VOLUNTEER,
    ArticleCategory.PERSONAL
  ];

  const categories = [
    'All',
    ...categoryOrder.filter((cat) => currentArticles.some((a) => a.category === cat))
  ];：班徽 + 班级名 */}
        <div
          className="cursor-pointer flex items-center gap-3 group shrink-0"
          onClick={() => setActiveTab('dashboard')}
        >
          <div
            className={`
              overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0
              ${isScrolled ? 'w-10 h-10 md:w-12 md:h-12' : 'w-12 h-12 md:w-14 md:h-14'}
            `}
          >
            <img
              src={classBadgeSrc}
              alt="班徽"
              className="w-full h-full object-cover"
            />
          </div>

          <h1
            className={`font-black tracking-tighter transition-all duration-500 ease-in-out text-black dark:text-white leading-none
            ${isScrolled ? 'text-xl md:text-3xl' : 'text-[clamp(1.25rem,3vw,3rem)]'}`}
          >
            机2201 <span className="hidden sm:inline">- 2班</span>
          </h1>
        </div>

        {/* 右侧导航 */}
        <div
          className={`flex items-center transition-all duration-700 overflow-x-auto no-scrollbar mask-gradient ${
            isScrolled ? 'gap-2 md:gap-8' : 'gap-3 md:gap-12'
          }`}
        >
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  text-base md:text-xl font-bold uppercase tracking-wide transition-colors duration-200 relative group whitespace-nowrap
                  ${isActive ? 'text-black dark:text-white' : 'text-gray-400 hover:text-black dark:hover:text-white'}
                `}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-[2px] md:h-[3px] bg-black dark:bg-white transform transition-transform duration-200 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}

          <div className="w-[1px] h-6 md:h-8 bg-gray-200 dark:bg-gray-700 shrink-0 mx-2" />

          {/* 控制区 */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 md:gap-2 text-black dark:text-white hover:opacity-70 transition-opacity"
              aria-label="Toggle language"
            >
              <Globe size={24} />
              <span className="font-black text-lg">
                {language === 'zh' ? 'EN' : '中'}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="text-black dark:text-white hover:opacity-70 transition-opacity"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={26} /> : <Sun size={26} />}
            </button>

            <button
              onClick={onTriggerGravity}
              className="text-black dark:text-white hover:opacity-70 transition-opacity"
              aria-label="Trigger gravity"
            >
              <Bomb size={26} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};