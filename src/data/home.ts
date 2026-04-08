import { Language, Category } from '../../types';

export interface HeroItem {
  text: string;
  annotation: string;
  category: Category | null;
}

export interface HomeContent {
  heroItems: HeroItem[];
  intro: string;
  selectedWorks: string;
  years: string;
}

export const HOME_DATA: Record<Language, HomeContent> = {
  zh: {
    heroItems: [
      { text: "同窗谱", annotation: "（聚是一团火，散是满天星）", category: Category.DESIGN },
      { text: "荣誉殿堂", annotation: "（先进班集体的硬核实力）", category: Category.DEV },
      { text: "时光长廊", annotation: "（那些年我们一起疯过的日子）", category: Category.VIDEO },
      { text: "留言寄语", annotation: "（不说再见，顶峰相见）", category: null }
    ],
    intro: "精工博学，笃行致远 —— 属于我们的独家记忆。",
    selectedWorks: "岁月留影",
    years: "[ 2022 — 2026 ]"
  },
  en: {
    heroItems: [
      { text: "Classmates", annotation: "(Gather as a fire, scatter as stars)", category: Category.DESIGN },
      { text: "Honors", annotation: "(The hard power of our class)", category: Category.DEV },
      { text: "Gallery", annotation: "(The days we spent together)", category: Category.VIDEO },
      { text: "Wishes", annotation: "(See you at the top)", category: null }
    ],
    intro: "Excellence and Pragmatism — Our exclusive memories.",
    selectedWorks: "Class Highlights",
    years: "[ 2022 — 2026 ]"
  }
};