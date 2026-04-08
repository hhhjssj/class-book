import { createClient } from '@supabase/supabase-js';

// 这是你的 Supabase 项目地址
const supabaseUrl = 'https://uyskchqoyffxtkucuzv.supabase.co';

// 这是你刚才提供的身份钥匙
const supabaseAnonKey = 'sb_publishable_ujC10zwxvo6AEy1GPy3yzw_ir2HjKqf'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);