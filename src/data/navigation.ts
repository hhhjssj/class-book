import { Language } from '../../types';

export const NAV_ITEMS: Record<Language, { id: string; label: string }[]> = {
  zh: [
    { id: 'dashboard', label: '主页' },
    { id: 'portfolio', label: '同窗谱' },
    { id: 'about', label: '荣誉殿堂' },
    { id: 'articles', label: '时光长廊' },
    { id: 'contact', label: '留言寄语' }
  ],
  en: [
    { id: 'dashboard', label: 'Home' },
    { id: 'portfolio', label: 'Classmates' },
    { id: 'about', label: 'Honors' },
    { id: 'articles', label: 'Gallery' },
    { id: 'contact', label: 'Wishes' }
  ]
};