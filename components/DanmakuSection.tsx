import React, { useState, useEffect } from 'react';
import { cloud } from '../src/lafClient'; 
import { Send } from 'lucide-react';

export const DanmakuSection: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [nickname, setNickname] = useState('');

  const fetchMsgs = async () => {
    try {
      const data = await cloud.invoke('get-danmaku');
      if (Array.isArray(data)) {
        // 🚀 班长注意：这里我们只在数量变化时更新，或者保持原样，
        // 只要 key 不变，正在跑的动画就不会被打断
        setMessages(data);
      }
    } catch (err) {
      console.error("读取失败:", err);
    }
  };

  useEffect(() => {
    fetchMsgs();
    const timer = setInterval(fetchMsgs, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    try {
      await cloud.invoke('add-danmaku', {
        nickname: nickname.trim() || '机2201-2班校友',
        content: inputText.trim()
      });
      setInputText('');
      fetchMsgs();
    } catch (err) {
      alert('发射失败，请确认 App ID 和云函数路径');
    }
  };

  return (
    <div className="w-full mt-12 px-4">
      <h2 className="text-center text-xl font-black mb-8 opacity-50">有什么想对大家说的？</h2>

      {/* 🚀 弹幕舞台：无限循环模式 */}
      <div className="h-[50vh] relative mb-12 overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/50 rounded-[4rem] border-4 border-double border-zinc-200 dark:border-zinc-800 shadow-inner">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-zinc-400 font-bold animate-pulse">
            北京服务器已就绪，等待首条留言...
          </div>
        ) : (
          messages.map((m, i) => (
            <div 
              // 🚀 重点：必须用 _id 做 key，这样刷新数据时动画才不会重置
              key={m._id} 
              className="absolute whitespace-nowrap text-3xl md:text-6xl font-black text-zinc-800/20 dark:text-white/10 animate-danmaku flex items-center gap-4 hover:text-orange-500/50 transition-colors cursor-default"
              style={{ 
                // 分行逻辑：i % 5 确保弹幕分布在 5 条不同的高度
                top: `${(i % 5) * 80 + 50}px`, 
                // 随机速度：让有的快有的慢，看起来更自然
                animationDuration: `${15 + (i % 7) * 3}s`,
                // 随机延迟：防止所有弹幕同时起跑
                animationDelay: `${(i * 1.5) % 10}s` 
              }}
            >
              <span className="text-xs font-mono px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg opacity-40">
                @{m.nickname}
              </span>
              {m.content}
            </div>
          ))
        )}
      </div>

      {/* 发射器：机械感十足的设计 */}
      <form onSubmit={handleSend} className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-zinc-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 dark:border-zinc-700">
        <input 
          value={nickname} 
          onChange={e => setNickname(e.target.value)} 
          placeholder="昵称" 
          className="w-full md:w-48 px-8 py-5 bg-zinc-100 dark:bg-zinc-900 rounded-3xl outline-none font-black text-center focus:ring-4 ring-orange-500/20 transition-all" 
        />
        <input 
          value={inputText} 
          onChange={e => setInputText(e.target.value)} 
          placeholder="毕业快乐！未来顶峰相见！" 
          className="flex-1 px-8 py-5 bg-zinc-100 dark:bg-zinc-900 rounded-3xl outline-none font-bold focus:ring-4 ring-orange-500/20 transition-all" 
        />
        <button 
          type="submit" 
          className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-3xl flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-500/30"
        >
          <span className="font-black text-lg">发射</span>
          <Send size={24} />
        </button>
      </form>

      {/* 🚀 永动机 CSS 动画 */}
      <style>{`
        @keyframes danmaku {
          from { transform: translateX(100vw); }
          to { transform: translateX(-250%); } 
        }
        .animate-danmaku { 
          /* infinite 让它停不下来 */
          animation: danmaku linear infinite; 
          will-change: transform;
        }
      `}</style>
    </div>
  );
};