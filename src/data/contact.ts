import { Language } from '../../types';

export interface ContactContent {
  baseLabel: string;
  locationValue: string;
  contactLabel: string;
  emailMeLabel: string;
  email: string;
  hello: string;
  intro: string;
  socials: any;
  githubLabel: string;
  footerDesign: string;
}

export const CONTACT_DATA: Record<Language, ContactContent> = {
  zh: {
    baseLabel: "石家庄铁道大学", 
    locationValue: "机械工程学院", 
    contactLabel: "联系班委会",
    emailMeLabel: "班长邮箱",
    email: "2874731969@qq.com",
    hello: "毕业快乐！",
    intro: "有什么想对大家说的话，欢迎在这里留言。",
    socials: {}, // 删掉所有社交媒体
    githubLabel: "",
    footerDesign: "机2201-2班 毕业留念"
  },
  en: {
    baseLabel: "Shijiazhuang Tiedao University",
    locationValue: "School of Mechanical Engineering",
    contactLabel: "Contact Us",
    emailMeLabel: "Class Monitor's Email",
    email: "2874731969@qq.com",
    hello: "Happy Graduation!",
    intro: "Leave a message for your classmates here.",
    socials: {},
    githubLabel: "",
    footerDesign: "Class ME2201-2 Memorial"
  }
};