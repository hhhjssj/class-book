import { ArticleCategory, Language } from '../../types';

export interface ArticlesPageContent {
  title: string;
  description: string;
}

const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\/+/, '')}`;
};

export const ARTICLES_PAGE_DATA: Record<Language, ArticlesPageContent> = {
  zh: {
    title: '时光长廊',
    description: '记录机2201-2班的点滴瞬间，留住那些年我们一起走过的日子。'
  },
  en: {
    title: 'Time Gallery',
    description: 'Recording every memorable moment of Class ME2201-2.'
  }
};

export const ARTICLE_DATA = [
  {
    id: 'moment-1',
    common: {
      category: ArticleCategory.MEMORY,
      link: '#',
      coverImage: withBase('gallery/baoduzhai.jpg'),
      date: '2023-10-20'
    },
    zh: {
      title: '抱犊寨之行',
      content: '那是大二那一年的秋天，全班同学一起爬上了抱犊寨。虽然腿很酸，但山顶的合照里，每个人的笑容都很灿烂。'
    },
    en: {
      title: 'Trip to Baoduzhai',
      content: 'A memorable autumn trip during our sophomore year.'
    }
  },
  {
    id: 'moment-2',
    common: {
      category: ArticleCategory.MEMORY,
      link: '#',
      coverImage: withBase('gallery/museum.jpg'),
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
  },
  {
    id: 'moment-3',
    common: {
      category: ArticleCategory.MEMORY,
      link: '#',
      coverImage: withBase('gallery/zhengdingxing-1.jpg'),
      date: '2023-11-10'
    },
    zh: {
      title: '正定之行',
      content: '周末的古城之旅，大家一起逛古街、尝美食，在城墙根下留下了很多轻松又热闹的瞬间。'
    },
    en: {
      title: 'Trip to Zhengding',
      content: 'A weekend trip to the ancient city with plenty of fun moments.'
    }
  },
  {
    id: 'moment-4',
    common: {
      category: ArticleCategory.MEMORY,
      link: '#',
      coverImage: withBase('gallery/banji-hezhao.jpg'),
      date: '2022-09-01'
    },
    zh: {
      title: '班级合照',
      content: '一张合照，定格的是属于机2201-2班的集体记忆。镜头里的每一张笑脸，都是这段同窗时光最真实的注脚。'
    },
    en: {
      title: 'Class Photo',
      content: 'A group photo capturing one of the most precious memories of our class.'
    }
  },
  {
    id: 'moment-5',
    common: {
      category: ArticleCategory.MEMORY,
      link: '#',
      coverImage: withBase('gallery/jinian-maozhuxi-danchen.jpg'),
      date: '2023-12-26'
    },
    zh: {
      title: '纪念毛主席诞辰',
      content: '在纪念活动中，大家共同回望历史、缅怀伟人，也在庄重的氛围里感受到青年一代肩上的责任与担当。'
    },
    en: {
      title: 'Commemorating Mao Zedong',
      content: 'A meaningful commemorative activity to reflect on history and responsibility.'
    }
  },

  {
    id: 'moment-6',
    common: {
      category: ArticleCategory.GROUP,
      link: '#',
      coverImage: withBase('gallery/fenglongshan-tuanjian.jpg'),
      date: '2023-04-15'
    },
    zh: {
      title: '封龙山团建',
      content: '宿舍团建爬封龙山的那次，大家一路说说笑笑，爬山的疲惫也被同伴之间的热闹冲淡了不少。'
    },
    en: {
      title: 'Fenglongshan Trip',
      content: 'A cheerful dorm outing to Fenglongshan, full of laughter and shared memories.'
    }
  },
  {
    id: 'moment-7',
    common: {
      category: ArticleCategory.GROUP,
      link: '#',
      coverImage: withBase('gallery/415-yuebing.jpg'),
      date: '2023-09-28'
    },
    zh: {
      title: '包月饼活动',
      content: '中秋前后的包月饼活动，让忙碌的学习生活里多了一点节日气息，也多了一份属于班级的温暖。'
    },
    en: {
      title: 'Mooncake Making',
      content: 'A festive mooncake-making activity that brought warmth to our class life.'
    }
  },
  {
    id: 'moment-8',
    common: {
      category: ArticleCategory.GROUP,
      link: '#',
      coverImage: withBase('gallery/dongzhi-jiaozi.jpg'),
      date: '2023-12-22'
    },
    zh: {
      title: '冬至包饺子',
      content: '冬至包饺子的时候，大家一边忙活一边聊天，食堂里那阵热气腾腾的氛围，现在想起来都很有画面感。'
    },
    en: {
      title: 'Dumpling Day',
      content: 'A cozy winter-solstice dumpling gathering filled with warmth and conversation.'
    }
  },
  {
    id: 'moment-9',
    common: {
      category: ArticleCategory.GROUP,
      link: '#',
      coverImage: withBase('gallery/banji-baoduzhai.jpg'),
      date: '2023-10-21'
    },
    zh: {
      title: '班级再游抱犊寨',
      content: '同样是抱犊寨，这一次更多了几分熟悉与默契。一路同行的欢笑，让这段班级记忆显得更加鲜活。'
    },
    en: {
      title: 'Baoduzhai Again',
      content: 'Another trip to Baoduzhai, this time with even stronger friendship and chemistry.'
    }
  },

  {
    id: 'moment-10',
    common: {
      category: ArticleCategory.PERSONAL,
      link: '#',
      coverImage: withBase('gallery/sunshijie-marathon.jpg'),
      date: '2024-03-31'
    },
    zh: {
      title: '石家庄马拉松',
      content: '奔跑的过程不只是体能的挑战，也是一种坚持到底的状态。赛道上的身影，记录下了青春很有力量的一面。'
    },
    en: {
      title: 'Shijiazhuang Marathon',
      content: 'A snapshot of endurance, persistence, and youthful energy on the marathon course.'
    }
  },
  {
    id: 'moment-11',
    common: {
      category: ArticleCategory.PERSONAL,
      link: '#',
      coverImage: withBase('gallery/maxiaokai-host.jpg'),
      date: '2023-12-10'
    },
    zh: {
      title: '主持晚会',
      content: '站在舞台中央的从容与自信，总能让人眼前一亮。属于同学们的光彩，也正体现在这些闪耀的瞬间里。'
    },
    en: {
      title: 'Hosting the Show',
      content: 'A confident and memorable stage moment that reflects the spirit of our classmates.'
    }
  },
  {
    id: 'moment-12',
    common: {
      category: ArticleCategory.PERSONAL,
      link: '#',
      coverImage: withBase('gallery/zhangao-study.jpg'),
      date: '2023-11-05'
    },
    zh: {
      title: '学习日常',
      content: '安静专注的学习状态，其实也是大学生活里最常见、也最值得被记录下来的一个切面。'
    },
    en: {
      title: 'Study Time',
      content: 'A quiet study moment that captures the everyday dedication of college life.'
    }
  },

  {
    id: 'moment-13',
    common: {
      category: ArticleCategory.VOLUNTEER,
      link: '#',
      coverImage: withBase('gallery/volunteer-hutuohe.jpg'),
      date: '2023-04-08'
    },
    zh: {
      title: '净化滹沱河',
      content: '走到河边、弯下腰去做一件具体的小事，或许平凡，却也让“志愿服务”这四个字有了更真实的分量。'
    },
    en: {
      title: 'Hutuo River Cleanup',
      content: 'A meaningful cleanup activity that turned volunteer service into something real and tangible.'
    }
  },
  {
    id: 'moment-14',
    common: {
      category: ArticleCategory.VOLUNTEER,
      link: '#',
      coverImage: withBase('gallery/volunteer-school.jpg'),
      date: '2023-05-20'
    },
    zh: {
      title: '小学授课志愿',
      content: '走进小学课堂，为孩子们带去知识与陪伴。这样的经历，不只是一次服务，也是一份很特别的成长。'
    },
    en: {
      title: 'Teaching at Primary School',
      content: 'A special volunteering experience of teaching and sharing with younger students.'
    }
  },
  {
    id: 'moment-15',
    common: {
      category: ArticleCategory.VOLUNTEER,
      link: '#',
      coverImage: withBase('gallery/volunteer-epidemic.jpg'),
      date: '2022-11-18'
    },
    zh: {
      title: '疫情志愿',
      content: '在特殊时期里挺身而出，去做力所能及的事。那些看似普通的瞬间，其实最能体现责任感与担当。'
    },
    en: {
      title: 'Epidemic Support',
      content: 'Ordinary moments of service that showed responsibility and commitment in a special time.'
    }
  }
];