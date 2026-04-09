import { Language, Experience, HonorsData } from '../../types';

export interface EducationPageContent {
  title: string;
  about: string;
  openToWork: string;
  viewHonorsLabel: string;
  honorsTitle: string;
  competitionsTitle: string;
  scholarshipsLabel: string;
  titlesLabel: string;
  experiences: Experience[];
  honors: HonorsData;
}

export const EDUCATION_DATA: Record<Language, EducationPageContent> = {
  zh: {
    title: "荣誉殿堂",
    about: "机2201-2班：精工博学，笃行致远。我们在机械楼挥洒汗水，在图书馆挑灯夜战，共同铸就了这份沉甸甸的集体荣誉。",
    openToWork: "向着未来，顶峰相见",
    viewHonorsLabel: "点击查看详细奖项清单",
    honorsTitle: "班级荣誉大满贯",
    competitionsTitle: "学科竞赛与科创成果",
    scholarshipsLabel: "奖学金获得情况",
    titlesLabel: "集体荣誉称号",
    experiences: [
      {
        id: '1',
        year: '2022.09',
        title: '扬帆起航',
        institution: '机2201-2班正式组建',
        description: '缘分让我们从五湖四海汇聚在机械学院，开启了属于我们的四年时光。',
        type: 'education'
      },
      {
        id: '2',
        year: '2024.12',
        title: '巅峰时刻',
        institution: '荣获“先进班集体”称号',
        description: '全班同学共同努力，各项指标位居学院前列，荣誉挂在了机械楼一楼的墙上。',
        type: 'education'
      },
      {
        id: '3',
        year: '2026.06',
        title: '逐梦远方',
        institution: '毕业答辩与离校',
        description: '聚是一团火，散是满天星。无论未来在哪里，机2201-2班永远是我们的家。',
        type: 'education'
      }
    ],
    honors: {
      scholarships: [
        "国家奖学金 X 人次",
        "国家励志奖学金 X 人次",
        "校级一/二/三等奖学金 累计 XX 人次"
      ],
      titles: [
        "校级先进班集体",
        "优秀团支部",
        "机械学院'风云班级'称号"
      ],
      competitions: [
        {
          level: "国家级/省级",
          awards: [
            "一等奖 | 全国大学生机械创新设计大赛",
            "二等奖 | 中国机器人大赛",
            "金奖 | '互联网+'大学生创新创业大赛"
          ]
        },
        {
          level: "校级/院级",
          awards: [
            "优胜奖 | 机械工程制图大赛",
            "一等奖 | 班级合唱比赛"
          ]
        }
      ],
      collectiveImages: [
        { title: "班徽设计大赛最佳进步奖", image: `${import.meta.env.BASE_URL || "/"}honor/collective/banhui-sheji-dasai-zuiijia-jinbujiang.jpg` },
        { title: "示范宿舍", image: `${import.meta.env.BASE_URL || "/"}honor/collective/shifan-sushe.jpg` },
        { title: "文明宿舍", image: `${import.meta.env.BASE_URL || "/"}honor/collective/wenming-sushe.jpg` },
        { title: "文明宿舍（补充）", image: `${import.meta.env.BASE_URL || "/"}honor/collective/wenming-sushe-2.jpg` },
        { title: "五四红旗团支部", image: `${import.meta.env.BASE_URL || "/"}honor/collective/wusi-hongqi-tuanzhibu.jpg` },
        { title: "校级先进班集体", image: `${import.meta.env.BASE_URL || "/"}honor/collective/xiaoji-xianjin-banjiti.png` },
        { title: "校级先进团支部", image: `${import.meta.env.BASE_URL || "/"}honor/collective/xiaoji-xianjin-tuanzhibu.jpg` }
      ]
    }
  },
  en: {
    title: "Hall of Fame",
    about: "Class ME2201-2: Excellence and Pragmatism.",
    openToWork: "See you at the top",
    viewHonorsLabel: "View Full Awards List",
    honorsTitle: "Class Honors",
    competitionsTitle: "Competitions",
    scholarshipsLabel: "Scholarships",
    titlesLabel: "Collective Titles",
    experiences: [
      {
        id: '1',
        year: '2022.09',
        title: 'Beginning',
        institution: 'Class ME2201-2 Formed',
        description: 'Our journey began at the School of Mechanical Engineering.',
        type: 'education'
      }
    ],
    honors: {
      scholarships: ["National Scholarship", "Excellence Scholarship"],
      titles: ["Advanced Class Collective"],
      competitions: [
        {
          level: "National",
          awards: ["1st Prize | Innovation Contest"]
        }
      ],
      collectiveImages: [
        { title: "Class Logo Design Best Progress Award", image: `${import.meta.env.BASE_URL || '/'}honor/collective/banhui-sheji-dasai-zuiijia-jinbujiang.jpg` },
        { title: "Model Dormitory", image: `${import.meta.env.BASE_URL || '/'}honor/collective/shifan-sushe.jpg` },
        { title: "Civilized Dormitory", image: `${import.meta.env.BASE_URL || '/'}honor/collective/wenming-sushe.jpg` },
        { title: "Civilized Dormitory (Extra)", image: `${import.meta.env.BASE_URL || '/'}honor/collective/wenming-sushe-2.jpg` },
        { title: "May Fourth Red Banner Branch", image: `${import.meta.env.BASE_URL || '/'}honor/collective/wusi-hongqi-tuanzhibu.jpg` },
        { title: "School-Level Advanced Class", image: `${import.meta.env.BASE_URL || '/'}honor/collective/xiaoji-xianjin-banjiti.png` },
        { title: "School-Level Advanced Branch", image: `${import.meta.env.BASE_URL || '/'}honor/collective/xiaoji-xianjin-tuanzhibu.jpg` }
      ]
    }
  }
};