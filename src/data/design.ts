import { Project } from '../../types';

const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\/+/, '')}`;
};

const STUDENT_IMAGES: Record<string, string> = {
  "高超": withBase('students/gaochao.jpg'),
  "张希男": withBase('students/zhangxinan.jpg'),
  "沈亚良": withBase('students/shenyaliang.jpg'),
  "申志浩": withBase('students/shenzhihao.jpg'),
  "刘明宇": withBase('students/liumingyu.jpg'),
  "李家硕": withBase('students/lijiashuo.jpg'),
  "周志豪": withBase('students/zhouzhihao.jpg'),
  "靖世豪": withBase('students/jingshihao.jpg'),
  "高养家": withBase('students/gaoyangjia.jpg'),
  "桂祥佳": withBase('students/guixiangjia.jpg'),
  "张阳": withBase('students/zhangyang.jpg'),
  "孟子航": withBase('students/mengzihang.jpg'),
  "刘佳豪": withBase('students/liujiahao.jpg'),
  "张英豪": withBase('students/zhangyinghao.jpg'),
  "梁路宾": withBase('students/lianglubin.jpg'),
  "李天宇": withBase('students/litianyu.jpg'),
  "张傲": withBase('students/zhangao.jpg'),
  "栗辟": withBase('students/lipi.jpg'),
  "李宗烨": withBase('students/lizongye.jpg'),
  "时利博": withBase('students/shilibo.jpg'),
  "王康": withBase('students/wangkang.jpg'),
  "杨子轩": withBase('students/yangzixuan.jpg'),
  "王泽京": withBase('students/wangzejing.jpg'),
  "崔宁": withBase('students/cuining.jpg'),
  "盛洪洋": withBase('students/shenghongyang.jpg'),
  "孙世杰": withBase('students/sunshijie.jpg'),
  "曹志远": withBase('students/caozhiyuan.jpg'),
  "畅瑞瑾": withBase('students/changruijin.jpg'),
  "马晓凯": withBase('students/maxiaokai.jpg'),
  "金俐丽": withBase('students/jinlili.jpg'),
  "邢佳洁": withBase('students/xingjiajie.jpg')
};

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
    image: STUDENT_IMAGES[name] || withBase('students/placeholder.jpg'),
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
    concept: "Gather as a fire, scatter as stars."
  }
}));