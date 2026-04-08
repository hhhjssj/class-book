import { ArticleCategory, Language } from '../../types';

export interface ArticlesPageContent {
  title: string;
  description: string;
}

export const ARTICLES_PAGE_DATA: Record<Language, ArticlesPageContent> = {
  zh: {
    title: '时光长廊',
    description: '记录机2201-2班的点滴瞬间，留住那些年我们一起疯过的日子。'
  },
  en: {
    title: 'Time Gallery',
    description: 'Recording every moment of Class ME2201-2.'
  }
};

export const ARTICLE_DATA = [
  {
    id: 'moment-1',
    common: {
      category: ArticleCategory.SERENITY,
      link: '#', 
      coverImage: '/gallery/baoduzhai.jpg',
      date: '2023-10-20'
    },
    zh: {
      title: '抱犊寨之行',
      content: '那是大二那一年的秋天，全班同学一起爬上了抱犊寨。虽然腿很酸，但山顶的合照里，每个人的笑容都很灿烂。' // 详细内容
    },
    en: {
      title: 'Trip to Baoduzhai',
      content: 'A memorable autumn trip during our sophomore year.'
    }
  },
  {
    id: 'moment-2',
    common: {
      category: ArticleCategory.SERENITY,
      link: '#',
      coverImage: '/gallery/museum.jpg',
      date: '2022-11-15'
    },
    zh: {
      title: '参观校史馆',
      content: '开学初的第一次集体出游，我们在校史馆里了解了学校的百年底蕴，也第一次对“机械人”这个身份有了归属感。'
    },
    en: {
      title: 'Visiting History Museum',
      content: 'Our first class outing to learn about our university inheritance.'
    }
  }
];