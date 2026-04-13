import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS } from '../constants';
import { Category, Language, Project } from '../types';
import { ArrowUpRight, X } from 'lucide-react';

interface PortfolioSectionProps {
  language: Language;
  externalFilter?: string;
}

const ClassmateImage: React.FC<{ project: Project; mode?: 'card' | 'modal' }> = ({
  project,
  mode = 'card'
}) => {
  const [imgError, setImgError] = useState(false);

  if (!project.image || imgError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800">
        <div className="text-center px-6">
          <div className="text-5xl md:text-6xl font-black text-zinc-400 dark:text-zinc-500 mb-3">
            {project.title.slice(0, 1)}
          </div>
          <p className="text-sm font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
            Classmate
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={
        mode === 'modal'
          ? 'w-full h-full object-contain'
          : 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
      }
    />
  );
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  language,
  externalFilter: _externalFilter
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);

  const classmateProjects = PROJECTS[language].filter(
    (p) => p.category === Category.DESIGN
  );

  useEffect(() => {
    if (selectedProject) {
      setDisplayProject(selectedProject);
      setIsModalRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => {
        setIsModalRendered(false);
        setDisplayProject(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  return (
    <div className="w-full max-w-[96vw] mx-auto pb-20">
      <div className="mb-10 md:mb-14 border-b-2 border-black dark:border-white pb-6 md:pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
              {language === 'zh' ? 'CLASSMATES' : 'CLASSMATES'}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black dark:text-white leading-none mb-3">
              {language === 'zh' ? '同窗谱' : 'Classmates'}
            </h2>
            <p className="text-lg md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              {language === 'zh'
                ? `机2201-2班全体成员 · 共 ${classmateProjects.length} 人`
                : `${classmateProjects.length} members of Class ME2201-2`}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">
        {classmateProjects.map((project) => (
          <div
            key={project.id}
            className="group cursor-pointer flex flex-col"
            onClick={() => setSelectedProject(project)}
          >
            <div className="w-full aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 mb-6 overflow-hidden rounded-[2rem] relative border border-zinc-200 dark:border-zinc-800 transition-all duration-500 group-hover:shadow-2xl">
              <ClassmateImage project={project} mode="card" />

              <div className="absolute top-4 left-4 bg-white/95 dark:bg-black/90 text-black dark:text-white px-4 py-2 text-sm font-bold rounded-xl shadow-sm">
                {language === 'zh' ? '同窗谱' : 'Classmate'}
              </div>
            </div>

            <div className="flex justify-between items-start border-b-2 border-zinc-200 dark:border-zinc-800 pb-6 group-hover:border-black dark:group-hover:border-white transition-colors duration-300">
              <div className="pr-6">
                <h3 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-3 leading-tight">
                  {project.title}
                </h3>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>

              <div className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shrink-0">
                <ArrowUpRight size={22} />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold font-mono text-gray-500 dark:text-gray-400 border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalRendered &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <div
              className={`absolute inset-0 bg-black/80 ${
                selectedProject
                  ? 'animate-[fadeIn_0.3s_ease-out_forwards]'
                  : 'animate-fade-out'
              }`}
              onClick={() => setSelectedProject(null)}
            />

            <div
              className={`
                relative w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar
                bg-white dark:bg-gray-900
                rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/10
                flex flex-col
                ${selectedProject ? 'animate-message-pop' : 'animate-message-pop-out'}
              `}
            >
              {displayProject && (
                <>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 rounded-full bg-white/50 dark:bg-black/50 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <X size={24} className="text-black dark:text-white" />
                  </button>

                  <div className="w-full h-[28vh] md:h-[42vh] bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden rounded-t-[2rem] flex items-center justify-center">
                    <ClassmateImage project={displayProject} mode="modal" />
                  </div>

                  <div className="p-6 md:p-12">
                    <div className="mb-8 md:mb-12">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-md">
                          {language === 'zh' ? '同窗谱' : 'Classmate'}
                        </span>
                        <span className="text-gray-500 font-mono text-sm font-bold tracking-widest">
                          {displayProject.subtitle}
                        </span>
                      </div>

                      <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-6 leading-tight">
                        {displayProject.title}
                      </h2>

                      <p className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                        {displayProject.description}
                      </p>
                    </div>

                    <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 mb-8 md:mb-12" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                      {displayProject.concept && (
                        <div className="space-y-8">
                          <h3 className="text-2xl font-black tracking-wide text-black dark:text-white border-l-4 border-black dark:border-white pl-6">
                            {language === 'zh' ? '班级印象' : 'Class Memory'}
                          </h3>
                          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                            {displayProject.concept}
                          </p>
                        </div>
                      )}

                      <div className="space-y-10">
                        <div className="space-y-4">
                          <h4 className="text-base font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                            {language === 'zh' ? '班级身份' : 'Identity'}
                          </h4>
                          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                            <span className="font-bold text-black dark:text-white block mb-1 text-lg">
                              {displayProject.role}
                            </span>
                            {displayProject.roleDetail}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-base font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                            Tags
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {displayProject.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-bold font-mono text-gray-500 border border-gray-300 dark:border-gray-700 px-3 py-1.5 rounded-lg"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};