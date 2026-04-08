import React, { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ArticleSection } from './components/ArticleSection';
import { TimelineSection } from './components/TimelineSection';
import { MusicPlayer } from './components/MusicPlayer';
import { DanmakuSection } from './components/DanmakuSection';
import { Mail, RotateCcw, ArrowUpRight, Users } from 'lucide-react';
import { CONTACT_DATA } from './src/data/contact';
import { ARTICLES_PAGE_DATA } from './src/data/articles';
import { Language, Category } from './types';
import { PROJECTS } from './constants';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('zh');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [portfolioCategory, setPortfolioCategory] = useState<string>('All');
  const [gravityActive, setGravityActive] = useState(false);

  const requestRef = useRef<number | null>(null);
  const scrollPositionRef = useRef<number>(0);

  const startViewTransition = (update: () => void) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      update();
      return;
    }
    const anyDoc = document as any;
    if (anyDoc && typeof anyDoc.startViewTransition === 'function') {
      anyDoc.startViewTransition(update);
    } else {
      update();
    }
  };

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const isDarkTime = hour >= 18 || hour < 6;
    setTheme(isDarkTime ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));

  const handleHeroNavigation = (category: Category) => {
    startViewTransition(() => {
      setPortfolioCategory(category);
      setActiveTab('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const openClassmatesPage = () => {
    startViewTransition(() => {
      setPortfolioCategory(Category.DESIGN);
      setActiveTab('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const triggerGravity = () => {
    if (gravityActive) return;

    scrollPositionRef.current = window.scrollY;
    document.body.style.height = `${document.documentElement.scrollHeight}px`;
    document.body.style.overflow = 'hidden';
    setGravityActive(true);

    const { Engine, Runner, Bodies, Composite } = Matter;
    const engine = Engine.create({ positionIterations: 12 });

    const largeComponents = Array.from(
      document.querySelectorAll('main img, .aspect-\\[4\\/3\\]')
    ) as HTMLElement[];

    largeComponents.forEach((el) => {
      el.style.transition = 'all 0.5s ease-out';
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
    });

    const selector =
      'nav h1, nav button, footer p, main h1, main h2, main h3, main p, main span, main button, main a, div[class*="border-b-2"], div[class*="h-[1px]"]';

    const candidates = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
    const validElements = candidates.filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 5 && rect.height > 5 && !candidates.some((p) => p !== el && p.contains(el));
    });

    const bodies = validElements.map((el) => {
      const rect = el.getBoundingClientRect();
      const body = Bodies.rectangle(
        rect.left + rect.width / 2 + window.scrollX,
        rect.top + rect.height / 2 + window.scrollY,
        rect.width,
        rect.height,
        { restitution: 0.2 }
      );

      (body as any).domElement = el;
      el.style.position = 'absolute';
      el.style.left = `${rect.left + window.scrollX}px`;
      el.style.top = `${rect.top + window.scrollY}px`;
      el.style.width = `${rect.width}px`;
      el.style.zIndex = '1000';
      el.style.pointerEvents = 'none';
      return body;
    });

    Composite.add(engine.world, [
      Bodies.rectangle(
        window.innerWidth / 2,
        document.documentElement.scrollHeight + 500,
        window.innerWidth,
        1000,
        { isStatic: true }
      ),
      ...bodies
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const update = () => {
      bodies.forEach((body) => {
        const el = (body as any).domElement as HTMLElement;
        const dx = body.position.x - (parseFloat(el.style.left) + parseFloat(el.style.width) / 2);
        const dy = body.position.y - (parseFloat(el.style.top) + el.offsetHeight / 2);
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${body.angle}rad)`;
      });
      requestRef.current = requestAnimationFrame(update);
    };

    update();
  };

  const resetGravity = () => {
    setGravityActive(false);
    window.location.reload();
  };

  const content = CONTACT_DATA[language];

  const renderClassmatePreview = () => {
    const classmates = PROJECTS[language].filter((p) => p.category === Category.DESIGN);
    const previewItems = classmates.slice(0, 4);

    return (
      <section className="w-full max-w-[96vw] mx-auto pt-4 md:pt-8 pb-12 md:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Users size={24} className="text-orange-500" />
              <span className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                CLASSMATE PREVIEW
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black dark:text-white leading-none mb-4">
              {language === 'zh' ? '同窗谱预览' : 'Classmate Preview'}
            </h2>

            <p className="text-lg md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-3xl">
              {language === 'zh'
                ? `先看看这几位，再去浏览全体 ${classmates.length} 位成员。`
                : `A quick look before viewing all ${classmates.length} classmates.`}
            </p>
          </div>

          <button
            onClick={openClassmatesPage}
            className="group inline-flex items-center gap-3 self-start lg:self-auto px-6 py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black text-base md:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg"
          >
            {language === 'zh' ? '查看全体成员' : 'View All'}
            <ArrowUpRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {previewItems.map((project, index) => (
            <button
              key={project.id}
              onClick={openClassmatesPage}
              className="group text-left bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 md:p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-black text-zinc-600 dark:text-zinc-300">
                  {language === 'zh' ? '同窗谱' : 'Classmate'}
                </span>
                <span className="text-sm font-mono font-bold text-gray-400 dark:text-gray-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-black dark:text-white tracking-tight mb-4">
                {project.title}
              </h3>

              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed min-h-[3.5rem] mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-gray-500 dark:text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400 dark:text-gray-500">
                  {language === 'zh' ? '点击进入完整同窗谱' : 'Open full page'}
                </span>
                <div className="w-11 h-11 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 transition-all duration-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <HeroSection
              onNavigate={(tab) => startViewTransition(() => setActiveTab(tab))}
              onCategorySelect={handleHeroNavigation}
              language={language}
            />
            {renderClassmatePreview()}
          </>
        );

      case 'portfolio':
        return (
          <div className="pt-24 w-full max-w-[96vw] mx-auto">
            <PortfolioSection language={language} externalFilter={portfolioCategory} />
          </div>
        );

      case 'articles':
        return (
          <div className="pt-24 w-full max-w-[96vw] mx-auto">
            <div className="mb-10 md:mb-14">
              <p className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
                MEMORIES
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black dark:text-white leading-none mb-4">
                {ARTICLES_PAGE_DATA[language].title}
              </h1>
              <p className="text-lg md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-3xl">
                {ARTICLES_PAGE_DATA[language].description}
              </p>
            </div>

            <ArticleSection language={language} />
          </div>
        );

      case 'about':
        return (
          <div className="pt-24 w-full max-w-[96vw] mx-auto">
            <TimelineSection language={language} />
          </div>
        );

      case 'contact':
        return (
          <div className="pt-16 w-full animate-fade-in text-center">
            <div className="w-full bg-zinc-950 dark:bg-white text-white dark:text-black pt-28 pb-20 md:pt-36 md:pb-24 mb-20 px-4">
              <div className="w-full max-w-[96vw] mx-auto">
                <h1
                  className="font-black mb-10 leading-none tracking-tighter whitespace-nowrap
                  text-5xl sm:text-6xl md:text-[8rem] lg:text-[10rem]
                  transition-colors duration-300"
                >
                  {content.hello}
                </h1>
                <p className="text-xl md:text-3xl text-zinc-300 dark:text-zinc-700 max-w-3xl mx-auto transition-colors duration-300 leading-relaxed">
                  {content.intro}
                </p>
              </div>
            </div>

            <div className="w-full max-w-5xl mx-auto mb-24 px-4">
              <DanmakuSection />
            </div>

            <div className="w-full max-w-5xl mx-auto flex justify-center px-4">
              <div className="w-full max-w-2xl p-16 md:p-24 border-4 border-gray-100 dark:border-zinc-800 rounded-[3rem] group hover:border-orange-500 transition-all duration-500 shadow-2xl">
                <Mail
                  size={80}
                  className="mx-auto mb-10 text-gray-400 group-hover:text-orange-500 transition-all"
                />
                <h3 className="text-3xl md:text-4xl font-black mb-6 text-black dark:text-white transition-colors duration-300">
                  {content.emailMeLabel}
                </h3>
                <p className="text-2xl md:text-4xl font-mono font-black text-gray-800 dark:text-gray-200 transition-colors duration-300 select-text break-all">
                  {content.email}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <HeroSection
            onNavigate={(tab) => startViewTransition(() => setActiveTab(tab))}
            onCategorySelect={handleHeroNavigation}
            language={language}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden relative">
      <MusicPlayer language={language} />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => startViewTransition(() => setActiveTab(tab))}
        language={language}
        toggleLanguage={toggleLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
        onTriggerGravity={triggerGravity}
      />

      <main className="w-full pt-40 pb-32 relative z-10">
        {renderContent()}

        <footer className="w-full max-w-[96vw] mx-auto mt-32 border-t-2 border-black dark:border-white pt-12 flex justify-between items-center text-sm font-bold text-gray-400 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
            <p className="tracking-[0.18em] uppercase">© 2026 SUN SHIJIE</p>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <p className="tracking-normal font-black text-black dark:text-white">孙世杰</p>
          </div>

          <p className="uppercase tracking-widest">{content.footerDesign}</p>
        </footer>
      </main>

      {gravityActive && (
        <div className="fixed bottom-8 left-0 w-full flex justify-center z-[1001]">
          <button
            onClick={resetGravity}
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-xl shadow-2xl flex items-center gap-3"
          >
            <RotateCcw size={24} />
            {language === 'zh' ? '变回去' : 'Go Back'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;