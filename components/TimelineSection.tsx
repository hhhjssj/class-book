import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { EDUCATION_DATA } from '../src/data/education';
import { Language } from '../types';
import { ArrowUpRight, ChevronDown, ChevronRight, Hourglass, X } from 'lucide-react';

interface TimelineSectionProps {
  language: Language;
}

type AwardGroup = {
  id: 'national' | 'provincial' | 'university' | 'college';
  level: string;
  awards: string[];
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({ language }) => {
  const content = EDUCATION_DATA[language];
  const experiences = content.experiences;
  const honors = content.honors;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  // Lock State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputAnswer, setInputAnswer] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [explosionTrigger, setExplosionTrigger] = useState(false);

  // Collapse State
  const [expandedAwardGroups, setExpandedAwardGroups] = useState<Record<string, boolean>>({
    national: true,
    provincial: true,
    university: false,
    college: false
  });

  // Particles Data
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 200 + Math.random() * 300;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      const size = 8 + Math.random() * 12;
      const type = Math.random() > 0.6 ? 0 : Math.random() > 0.3 ? 1 : 2;
      return { id: i, tx, ty, size, type };
    });
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const decryptPayload = (ans: string) => {
    console.log('Unlocked with:', ans);
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputAnswer.trim() === '1') {
      setIsSuccess(true);
      decryptPayload(inputAnswer.trim());

      setTimeout(() => {
        setIsExploding(true);
        requestAnimationFrame(() => {
          setExplosionTrigger(true);
        });
      }, 600);

      setTimeout(() => {
        setIsUnlocked(true);
      }, 1300);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
    }
  };

  const competitionGroups = useMemo<AwardGroup[]>(
    () => [
      {
        id: 'national',
        level: language === 'zh' ? '国家级' : 'National',
        awards: [
          '3d国二',
          'rm国一（1）',
          'rm国一（2）',
          'rm国三（1）',
          'rm国三（2）',
          'rm国三（3）',
          'rm国二（1）',
          'rm国二（2）',
          '企模国二',
          '周培源国优秀（1）',
          '周培源国优秀（2）',
          '周培源国优秀（3）',
          '国三-周培源',
          '国三-机创赛',
          '国二-睿抗机器人',
          '国二-高校机器人',
          '大英赛国三',
          '工训国银',
          '睿抗国二',
          '美赛国三',
          '节能减排国三'
        ]
      },
      {
        id: 'provincial',
        level: language === 'zh' ? '省级' : 'Provincial',
        awards: [
          '3d省三',
          '3d省二（1）',
          '3d省二（2）',
          '周培源省二',
          '工训赛省一',
          '成图省三',
          '数学建模省一',
          '数学竞赛省三',
          '数模省一',
          '机创省二',
          '河北省力学省二（1）',
          '河北省力学省二（2）',
          '电赛省三',
          '省一-周培源',
          '省一-睿抗',
          '省一-高校赛',
          '省三-机创赛',
          '省二-3D大赛',
          '省二-智能制造赛',
          '睿抗省三',
          '睿抗省二',
          '统计建模省三',
          '高校赛省三'
        ]
      },
      {
        id: 'university',
        level: language === 'zh' ? '校级' : 'University',
        awards: [
          '互联网＋校银',
          '制图构型校三',
          '工训校三',
          '成图校三',
          '技能减排校三',
          '数学建模校二',
          '暖通校优秀',
          '校三-机器人',
          '校三维一等',
          '校优秀-暖通',
          '节能减排校三',
          '节能减排校二',
          '节能减排校优秀'
        ]
      },
      {
        id: 'college',
        level: language === 'zh' ? '院级' : 'College',
        awards: ['科创杯院一等（1）', '科创杯院一等（2）']
      }
    ],
    [language]
  );

  const competitionStats = useMemo(
    () => [
      { label: language === 'zh' ? '国家级' : 'National', count: competitionGroups[0].awards.length },
      { label: language === 'zh' ? '省级' : 'Provincial', count: competitionGroups[1].awards.length },
      { label: language === 'zh' ? '校级' : 'University', count: competitionGroups[2].awards.length },
      { label: language === 'zh' ? '院级' : 'College', count: competitionGroups[3].awards.length },
      {
        label: language === 'zh' ? '合计' : 'Total',
        count: competitionGroups.reduce((sum, group) => sum + group.awards.length, 0)
      }
    ],
    [competitionGroups, language]
  );

  const collectiveHonorItems = useMemo(() => {
    const preferredOrder =
      language === 'zh'
        ? [
            '五四红旗团支部',
            '校级先进团支部',
            '校级先进班集体',
            '班徽设计大赛最佳进步奖',
            '示范宿舍',
            '文明宿舍'
          ]
        : [
            'May Fourth Red Banner Branch',
            'School-Level Advanced Branch',
            'School-Level Advanced Class',
            'Class Logo Design Best Progress Award',
            'Model Dormitory',
            'Civilized Dormitory'
          ];

    const filtered = (honors?.collectiveImages || []).filter(
      (item) => !item.title.includes('补充') && !item.title.includes('Extra')
    );

    const deduped = Array.from(new Map(filtered.map((item) => [item.title, item])).values());

    return deduped.sort((a, b) => {
      const aIndex = preferredOrder.indexOf(a.title);
      const bIndex = preferredOrder.indexOf(b.title);
      const safeA = aIndex === -1 ? 999 : aIndex;
      const safeB = bIndex === -1 ? 999 : bIndex;
      return safeA - safeB;
    });
  }, [honors, language]);

  const collectivePreviewItems = collectiveHonorItems.slice(0, 4);

  const toggleAwardGroup = (groupId: AwardGroup['id']) => {
    setExpandedAwardGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  if (!isUnlocked) {
    if (isExploding) {
      return (
        <div className="w-full min-h-[60vh] flex items-center justify-center px-4 relative overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className={`absolute rounded-full ${
                p.type === 0 ? 'bg-green-500' : p.type === 1 ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              style={{
                width: p.size,
                height: p.size,
                transform: explosionTrigger ? `translate(${p.tx}px, ${p.ty}px) scale(0)` : 'translate(0, 0) scale(1)',
                opacity: explosionTrigger ? 0 : 1,
                transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out'
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        className={`w-full min-h-[60vh] flex items-center justify-center px-4 animate-fade-in transition-all duration-300 ${
          isSuccess ? 'scale-105' : 'scale-100'
        }`}
      >
        <div
          className={`
            w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-10 md:p-14 text-center
            border border-gray-100 dark:border-gray-800 relative overflow-hidden group transition-all duration-500
            ${isSuccess ? 'shadow-green-500/20 border-green-500/50' : 'animate-message-pop'}
          `}
        >
          <div
            className={`absolute top-0 left-0 w-full h-2 transition-colors duration-500 ${
              isSuccess ? 'bg-green-500' : 'bg-black dark:bg-white'
            }`}
          ></div>

          <div className="mb-10">
            <div
              className={`
                w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-500
                ${isSuccess ? 'bg-green-500 rotate-180 scale-110' : 'bg-black dark:bg-white'}
              `}
            >
              <span className="text-3xl text-white dark:text-black font-bold">{isSuccess ? '!' : '?'}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white mb-4">
              {language === 'zh' ? '班级小测验' : 'Class Quiz'}
            </h2>

            <p className="text-xl font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
              {isSuccess
                ? language === 'zh'
                  ? '回答正确，欢迎！'
                  : 'Access Granted!'
                : language === 'zh'
                ? '咱们班女生最多的时候的人数减去女生最少的时候的人数等于几？'
                : 'Max girls - Min girls = ?'}
            </p>
          </div>

          <form onSubmit={handleUnlockSubmit} className="relative w-full">
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => {
                setInputAnswer(e.target.value);
                setIsError(false);
              }}
              disabled={isSuccess}
              className={`
                w-full bg-gray-50 dark:bg-black/50 border-2
                ${isError ? 'border-red-500 animate-[pulse_0.5s_ease-in-out]' : ''}
                ${
                  isSuccess
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent focus:border-black dark:focus:border-white'
                }
                rounded-2xl px-6 py-4 text-center text-2xl font-black outline-none transition-all
                placeholder-gray-300 dark:placeholder-gray-700
              `}
              placeholder={language === 'zh' ? '请输入数字' : 'Enter number'}
              autoFocus
            />

            <button
              type="submit"
              disabled={isSuccess}
              className={`
                mt-6 w-full font-bold py-4 rounded-xl transition-all duration-300
                ${
                  isSuccess
                    ? 'bg-green-500 text-white scale-105 cursor-default'
                    : 'bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              {isSuccess ? (language === 'zh' ? '验证通过' : 'SUCCESS') : language === 'zh' ? '提交' : 'SUBMIT'}
            </button>
          </form>

          {isError && (
            <p className="absolute bottom-4 left-0 w-full text-red-500 text-sm font-bold animate-bounce">
              {language === 'zh' ? '这都算错？回去重修！' : 'Wrong answer!'}
            </p>
          )}

          <p className="mt-6 text-sm font-bold text-gray-400 animate-pulse">
            {language === 'zh' ? '只有机2201-2班的同学才知道答案 ;-)' : 'Only our class knows the answer ;-)'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-[96vw] mx-auto pb-32 relative ${isUnlocked ? 'animate-[fadeIn_0.6s_ease-out_forwards]' : ''}`}>
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-24 mb-24 lg:mb-32">
        <div className="lg:col-span-4">
          <div className="static lg:sticky lg:top-40 flex flex-col h-auto justify-start">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-none text-black dark:text-white transition-colors duration-300">
                {content.title}
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 md:mb-12 font-medium transition-colors duration-300 max-w-xl">
                {content.about}
              </p>

              <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-8 bg-gray-50 dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent p-4 lg:p-0 rounded-2xl lg:rounded-none">
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0">
                  <Hourglass className="w-6 h-6 md:w-8 md:h-8 text-black dark:text-white animate-[spin_3s_linear_infinite]" />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white transition-colors leading-tight">
                  {content.openToWork}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 pt-0 lg:pt-8 flex flex-col w-full">
          <div className="w-full h-[2px] bg-black dark:bg-white mb-8 lg:mb-12 transition-colors duration-300"></div>

          <div className="space-y-12 lg:space-y-16">
            {experiences.map((exp) => (
              <div key={exp.id} className="group">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 md:mb-4">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white transition-colors">
                    {exp.institution}
                  </h3>
                  <span className="font-mono text-gray-400 dark:text-gray-500 font-bold text-base md:text-lg mt-1 md:mt-0 transition-colors">
                    {exp.year}
                  </span>
                </div>

                <div className="text-xl md:text-2xl font-bold text-black dark:text-gray-200 mb-3 md:mb-4 transition-colors">
                  {exp.title}
                </div>

                <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl font-medium transition-colors">
                  {exp.description}
                </p>

                <div className="w-full h-[2px] bg-gray-100 dark:bg-gray-800 mt-8 md:mt-12 transition-colors duration-500"></div>
              </div>
            ))}
          </div>

          {collectivePreviewItems.length > 0 && (
            <div className="mt-8 md:mt-12">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-black dark:text-white mb-4 md:mb-6">
                {language === 'zh' ? '集体荣誉预览' : 'Collective Honors Preview'}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {collectivePreviewItems.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <p className="text-xs md:text-sm font-bold text-gray-600 dark:text-gray-400 text-center line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-2 md:gap-4 text-lg md:text-2xl font-bold text-black dark:text-white hover:opacity-70 transition-opacity border-b-2 border-black dark:border-white pb-1"
            >
              <span>{content.viewHonorsLabel}</span>
              <div className="transform transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
                <ArrowUpRight size={20} className="md:w-7 md:h-7" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {isRendered &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <div
              className={`absolute inset-0 bg-black/60 dark:bg-black/80 ${
                isModalOpen ? 'animate-[fadeIn_0.3s_ease-out_forwards]' : 'animate-fade-out'
              }`}
              onClick={() => setIsModalOpen(false)}
            ></div>

            <div
              className={`
                relative w-full max-w-6xl max-h-[90vh] overflow-y-auto no-scrollbar
                bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl
                rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/10
                p-6 md:p-16 flex flex-col
                ${isModalOpen ? 'animate-message-pop' : 'animate-message-pop-out'}
              `}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-10"
              >
                <X size={24} className="md:w-8 md:h-8 text-black dark:text-white" />
              </button>

              <h2 className="text-3xl md:text-6xl font-black mb-8 md:mb-12 text-black dark:text-white">
                {content.honorsTitle}
              </h2>

              <div className="overflow-y-auto pr-2 flex-1 no-scrollbar">
                <div className="space-y-12 md:space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    <div className="space-y-6 md:space-y-8">
                      <h3 className="text-xl md:text-3xl font-bold text-black dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-4 inline-block pr-12">
                        {language === 'zh' ? '学科竞赛获奖情况' : 'Competition Awards Summary'}
                      </h3>

                      <ul className="space-y-3 md:space-y-4">
                        {competitionStats.map((item) => (
                          <li
                            key={item.label}
                            className="text-base md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-normal"
                          >
                            <span className="inline-block w-2 h-2 rounded-full bg-black dark:bg-white mr-3 align-middle"></span>
                            {language === 'zh' ? `${item.label}：${item.count}项` : `${item.label}: ${item.count}`}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                      <h3 className="text-xl md:text-3xl font-bold text-black dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-4 inline-block pr-12">
                        {language === 'zh' ? '班级集体荣誉' : 'Collective Honors'}
                      </h3>

                      <ul className="space-y-3 md:space-y-4">
                        {collectiveHonorItems.map((item, idx) => (
                          <li
                            key={`${item.title}-${idx}`}
                            className="text-base md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-normal"
                          >
                            <span className="inline-block w-2 h-2 rounded-full bg-black dark:bg-white mr-3 align-middle"></span>
                            {item.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {collectiveHonorItems.length > 0 && (
                    <div className="space-y-8">
                      <h3 className="text-2xl md:text-4xl font-black text-black dark:text-white mb-4 md:mb-8">
                        {language === 'zh' ? '集体荣誉' : 'Collective Honors'}
                      </h3>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 border-t-2 border-gray-200 dark:border-gray-700 pt-8 md:pt-12">
                        {collectiveHonorItems.map((item, idx) => (
                          <div key={idx} className="space-y-3">
                            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <p className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-300 text-center">
                              {item.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-8">
                    <h3 className="text-2xl md:text-4xl font-black text-black dark:text-white mb-4 md:mb-8">
                      {language === 'zh' ? '学科竞赛获奖明细' : 'Competition Award Details'}
                    </h3>

                    <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-8 md:pt-12 space-y-4">
                      {competitionGroups.map((group) => {
                        const isExpanded = expandedAwardGroups[group.id];

                        return (
                          <div
                            key={group.id}
                            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/30 overflow-hidden"
                          >
                            <button
                              type="button"
                              onClick={() => toggleAwardGroup(group.id)}
                              className="w-full flex items-center justify-between px-5 md:px-6 py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {isExpanded ? (
                                  <ChevronDown className="w-5 h-5 text-black dark:text-white shrink-0" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-black dark:text-white shrink-0" />
                                )}
                                <div>
                                  <h4 className="text-lg md:text-2xl font-bold text-black dark:text-white opacity-90">
                                    {group.level}
                                  </h4>
                                  <p className="text-sm md:text-base font-bold text-gray-400 dark:text-gray-500 mt-1">
                                    {language === 'zh' ? `${group.awards.length}项` : `${group.awards.length}`}
                                  </p>
                                </div>
                              </div>
                            </button>

                            {isExpanded && (
                              <div className="px-5 md:px-6 pb-5 md:pb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {group.awards.map((award, aIdx) => (
                                    <div
                                      key={`${group.id}-${aIdx}`}
                                      className="p-3 rounded-xl bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700"
                                    >
                                      <span className="text-base md:text-lg font-bold text-gray-700 dark:text-gray-200 leading-tight">
                                        {award}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};