import React, { useState } from 'react';
import { HOME_DATA } from '../src/data/home';
import { Language, Category } from '../types';
import { MapPin, Users, Award } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: Category) => void;
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onCategorySelect,
  language
}) => {
  const content = HOME_DATA[language];
  const [heroImageError, setHeroImageError] = useState(false);
  const [schoolBadgeError, setSchoolBadgeError] = useState(false);

  const heroImageSrc = `${import.meta.env.BASE_URL}home/class-hero.jpg`;
  const schoolBadgeSrc = `${import.meta.env.BASE_URL}home/school-badge.png`;

  const schoolName =
    language === 'zh' ? '石家庄铁道大学' : 'Shijiazhuang Tiedao University';

  const classNameText =
    language === 'zh'
      ? '机械工程学院 · 机2201-2班'
      : 'School of Mechanical Engineering · Class ME2201-2';

  const mottoLine1 =
    language === 'zh' ? '慎思明辨' : 'Prudent Thinking';

  const mottoLine2 =
    language === 'zh' ? '知行合一' : 'Unity of Knowledge and Action';

  const introText =
    language === 'zh'
      ? '属于机2201-2班的独家记忆。'
      : 'Exclusive memories of Class ME2201-2.';

  return (
    <div className="w-full max-w-[96vw] mx-auto animate-fade-in relative">
      <section className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-14 mb-20 items-stretch">
        {/* 左侧主视觉 */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-[3rem] bg-zinc-100 dark:bg-zinc-900 border-4 border-white dark:border-zinc-800 shadow-2xl min-h-[52vh] lg:min-h-[68vh]">
          {!heroImageError ? (
            <img
              src={heroImageSrc}
              alt="Class ME2201-2"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setHeroImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-950 flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-sm md:text-base font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-6">
                  CLASS HERO IMAGE
                </p>
                <h3 className="text-3xl md:text-5xl font-black text-zinc-500 dark:text-zinc-400 tracking-tighter">
                  机2201-2班
                </h3>
                <p className="mt-4 text-base md:text-xl text-zinc-400 dark:text-zinc-500 font-medium">
                  这里后面替换成全班合照即可
                </p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 text-white">
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.18em] opacity-80 mb-4">
              {content.years}
            </p>
            <h2 className="text-4xl md:text-6xl xl:text-7xl font-black tracking-tighter leading-none mb-3">
              机2201-2班
            </h2>
            <p className="text-lg md:text-2xl font-medium opacity-90">
              {language === 'zh'
                ? '石家庄铁道大学 · 机械工程学院'
                : 'Shijiazhuang Tiedao University · Mechanical Engineering'}
            </p>
          </div>
        </div>

        {/* 右侧信息区 */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-gray-400 dark:text-gray-500 mb-4">
                MECHANICAL ENGINEERING
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md shrink-0 flex items-center justify-center">
                  {!schoolBadgeError ? (
                    <img
                      src={schoolBadgeSrc}
                      alt="校徽"
                      className="w-full h-full object-cover"
                      onError={() => setSchoolBadgeError(true)}
                    />
                  ) : (
                    <div className="text-xs font-black text-zinc-400">校徽</div>
                  )}
                </div>

                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-black dark:text-white leading-tight">
                    {schoolName}
                  </h3>
                  <p className="text-lg md:text-xl font-bold text-gray-500 dark:text-gray-400 mt-2">
                    {classNameText}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-black dark:text-white leading-none tracking-tighter">
                {mottoLine1}
                <br />
                {mottoLine2}
              </h1>
              <div className="w-24 h-2 bg-orange-500 mt-6 mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {introText}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-10">
              <button
                onClick={() => onCategorySelect(Category.DESIGN)}
                className="text-left p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <p className="text-lg font-black text-black dark:text-white mb-1">
                  {language === 'zh' ? '同窗谱' : 'Classmates'}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {language === 'zh' ? '全班成员' : 'All classmates'}
                </p>
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="text-left p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <p className="text-lg font-black text-black dark:text-white mb-1">
                  {language === 'zh' ? '荣誉殿堂' : 'Honors'}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {language === 'zh' ? '集体荣誉' : 'Class honors'}
                </p>
              </button>

              <button
                onClick={() => onNavigate('articles')}
                className="text-left p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <p className="text-lg font-black text-black dark:text-white mb-1">
                  {language === 'zh' ? '时光长廊' : 'Gallery'}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {language === 'zh' ? '班级回忆' : 'Memories'}
                </p>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="text-left p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <p className="text-lg font-black text-black dark:text-white mb-1">
                  {language === 'zh' ? '留言寄语' : 'Wishes'}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {language === 'zh' ? '毕业留言' : 'Leave a message'}
                </p>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
              <Users className="text-orange-500 mb-4" size={24} />
              <div className="text-4xl font-black text-black dark:text-white mb-2">
                31
              </div>
              <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-bold">
                {language === 'zh' ? '同窗好友' : 'Classmates'}
              </div>
            </div>

            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
              <MapPin className="text-sky-500 mb-4" size={24} />
              <div className="text-2xl md:text-3xl font-black text-black dark:text-white mb-2">
                2022—2026
              </div>
              <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-bold">
                {language === 'zh' ? '四年时光' : 'Four Years'}
              </div>
            </div>

            <div className="col-span-2 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
              <Award className="text-emerald-500 mb-4" size={24} />
              <div className="text-2xl md:text-3xl font-black text-black dark:text-white mb-2">
                {language === 'zh' ? '毕业纪念册' : 'Graduation Memorial'}
              </div>
              <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-bold leading-relaxed">
                {language === 'zh'
                  ? '聚是一团火，散是满天星。'
                  : 'Gather as a fire, scatter as stars.'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};