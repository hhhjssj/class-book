import { Language } from '../../types';

export interface PortfolioPageContent {
  title: string;
  description: string;
}

export const PORTFOLIO_PAGE_DATA: Record<Language, PortfolioPageContent> = {
  zh: {
    title: '同窗谱',
    description: '机2201-2班全体成员。聚是一团火，散是满天星。'
  },
  en: {
    title: 'Classmates',
    description: 'All members of Class ME2201-2. Gather as a fire, scatter as stars.'
  }
};