
export type Language = 'zh' | 'en';

export enum Category {
  ALL = 'All',
  VIDEO = 'Videography',
  DESIGN = 'Graphics & UI',
  PHOTO = 'Photography',
  DEV = 'Development',
  ARTICLE = 'Article'
}

export enum ArticleCategory {
  MEMORY = 'memory',
  GROUP = 'group',
  PERSONAL = 'personal',
  VOLUNTEER = 'volunteer'
}

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  link: string; // WeChat Official Account Link
  coverImage?: string; // Optional, will fallback if not provided
  date?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  description: string;
  role: string;
  image: string; // URL placeholder (Cover/Thumbnail)
  videoUrl?: string; // URL to .mp4 file
  bilibiliId?: string; // Bilibili Video ID (e.g. BV1xx...)
  figmaUrl?: string; // Figma File URL
  gallery?: string[]; // Additional images (URLs)
  externalLink?: string; // External link (e.g. Bilibili, Behance)
  tags: string[];
  // New detailed fields
  concept?: string;
  roleDetail?: string;
  awards?: string[]; // Array of award strings
  
  // Special field for placeholder UI
  bilingualTitle?: {
    zh: string;
    en: string;
  };

  websiteUrl?: string; // Online preview URL
  githubUrl?: string; // GitHub repository URL
  icon?: string; // Icon name for Dev projects
}

export interface Experience {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'work';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface CompetitionGroup {
  level: string;
  awards: string[];
}

export interface HonorsData {
  scholarships: string[];
  titles: string[];
  competitions: CompetitionGroup[];
  collectiveImages?: { title: string; image: string }[];
}
