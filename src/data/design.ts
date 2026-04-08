import { Project } from '../../types';

// 机2201-2班 同窗谱数据库
export const DESIGN_DATA = [
  "高超", "张希男", "沈亚良", "申志浩", "刘明宇", "李家硕", "周志豪", "靖世豪", 
  "高养家", "桂祥佳", "张阳", "孟子航", "刘佳豪", "张英豪", "梁路宾", "李天宇", 
  "张傲", "栗辟", "李宗烨", "时利博", "王康", "杨子轩", "王泽京", "崔宁", 
  "盛洪洋", "孙世杰", "曹志远", "畅瑞瑾", "马晓凯", "金俐丽", "邢佳洁"
].map((name, index) => ({
  id: `student-${index + 1}`,
  common: {
    category: 'Graphics & UI', 
    image: '/students/placeholder.jpg', // 默认占位图路径
    tags: ['机2201-2班']
  },
  zh: {
    title: name,
    subtitle: "机2201-2班 成员",
    description: "暂无个人寄语。",
    role: "同窗",
    roleDetail: "属于我们的四年时光。",
    tags: ["机械工程", "2022-2026"],
    awards: [],
    concept: "聚是一团火，散是满天星。"
  },
  en: {
    title: name,
    subtitle: "Member of Class 2201-2",
    description: "No bio yet.",
    role: "Classmate",
    roleDetail: "Our four years together.",
    tags: ["ME", "2022-2026"],
    awards: [],
    concept: "Gather as a fire, scatter as stars.",
  }
}));