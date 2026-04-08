import { Project, Language, Article, ArticleCategory } from './types';
import { PROJECT_DATA } from './src/data/projects';
import { ARTICLE_DATA } from './src/data/articles';

export const CATEGORY_LABELS: Record<Language, Record<string, string>> = {
  zh: {
    All: '全部',
    Videography: '时光长廊',
    'Graphics & UI': '同窗谱',
    Photography: '荣誉殿堂',
    Development: '其他'
  },
  en: {
    All: 'All',
    Videography: 'Gallery',
    'Graphics & UI': 'Classmates',
    Photography: 'Honors',
    Development: 'Other'
  }
};

export const ARTICLE_LABELS: Record<Language, Record<string, string>> = {
  zh: {
    All: '全部',
    [ArticleCategory.SERENITY]: '班级记忆'
  },
  en: {
    All: 'All',
    [ArticleCategory.SERENITY]: 'Class Memories'
  }
};

export const PROJECTS: Record<Language, Project[]> = {
  zh: PROJECT_DATA.map((p) => ({
    id: p.id,
    ...p.common,
    ...p.zh,
    bilingualTitle: {
      zh: p.zh.title,
      en: p.en.title
    }
  })),
  en: PROJECT_DATA.map((p) => ({
    id: p.id,
    ...p.common,
    ...p.en,
    bilingualTitle: {
      zh: p.zh.title,
      en: p.en.title
    }
  }))
};

export const ARTICLES: Record<Language, Article[]> = {
  zh: ARTICLE_DATA.map((a) => ({
    id: a.id,
    ...a.common,
    ...a.zh
  })),
  en: ARTICLE_DATA.map((a) => ({
    id: a.id,
    ...a.common,
    ...a.en
  }))
};