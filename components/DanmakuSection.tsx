import React, { useState, useEffect, useMemo, useRef } from 'react';
import { cloud } from '../src/lafClient';
import { Send } from 'lucide-react';

interface DanmakuMessage {
  _id: string;
  nickname: string;
  content: string;
}

interface PositionedDanmaku extends DanmakuMessage {
  top: number;
  duration: number;
  delay: number;
}

const TRACK_HEIGHT = 72;
const TRACK_GAP = 12;
const TOP_PADDING = 24;
const BOTTOM_PADDING = 24;

export const DanmakuSection: React.FC = () => {
  const [messages, setMessages] = useState<DanmakuMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [nickname, setNickname] = useState('');
  const [trackCount, setTrackCount] = useState(5);

  const stageRef = useRef<HTMLDivElement | null>(null);

  const fetchMsgs = async () => {
    try {
      const data = await cloud.invoke('get-danmaku');
      if (Array.isArray(data)) {
        setMessages(data as DanmakuMessage[]);
      }
    } catch (err) {
      console.error('读取失败:', err);
    }
  };

  useEffect(() => {
    fetchMsgs();
    const timer = setInterval(fetchMsgs, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateTrackCount = () => {
      if (!stageRef.current) return;

      const stageHeight = stageRef.current.clientHeight;
      const usableHeight = stageHeight - TOP_PADDING - BOTTOM_PADDING;
      const singleTrackTotal = TRACK_HEIGHT + TRACK_GAP;
      const nextCount = Math.max(1, Math.floor((usableHeight + TRACK_GAP) / singleTrackTotal));

      setTrackCount(nextCount);
    };

    updateTrackCount();

    const el = stageRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      updateTrackCount();
    });

    observer.observe(el);
    window.addEventListener('resize', updateTrackCount);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateTrackCount);
    };
  }, []);

  const positionedMessages = useMemo<PositionedDanmaku[]>(() => {
    if (trackCount <= 0) return [];

    const laneClock = Array(trackCount).fill(0) as number[];

    return messages.map((m) => {
      const contentLength = `${m.nickname}${m.content}`.length;

      const duration = Math.min(30, Math.max(18, 14 + contentLength * 0.22));
      const spacingSeconds = Math.min(6.5, Math.max(4.2, 3.2 + contentLength * 0.05));

      let targetLane = 0;
      let minClock = laneClock[0];

      for (let i = 1; i < laneClock.length; i++) {
        if (laneClock[i] < minClock) {
          minClock = laneClock[i];
          targetLane = i;
        }
      }

      const top = TOP_PADDING + targetLane * (TRACK_HEIGHT + TRACK_GAP);
      const delay = laneClock[targetLane];

      laneClock[targetLane] += spacingSeconds;

      return {
        ...m,
        top,
        duration,
        delay
      };
    });
  }, [messages, trackCount]);

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

      <div
        ref={stageRef}
        className="h-[50vh] relative mb-12 overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/50 rounded-[4rem] border-4 border-double border-zinc-200 dark:border-zinc-800 shadow-inner"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-zinc-400 font-bold animate-pulse">
            北京服务器已就绪，等待首条留言...
          </div>
        ) : (
          positionedMessages.map((m) => (
            <div
              key={m._id}
              className="absolute whitespace-nowrap text-3xl md:text-6xl font-black text-zinc-800/20 dark:text-white/10 animate-danmaku flex items-center gap-4 hover:text-orange-500/50 transition-colors cursor-default"
              style={{
                top: `${m.top}px`,
                animationDuration: `${m.duration}s`,
                animationDelay: `${m.delay}s`
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

      <form
        onSubmit={handleSend}
        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-zinc-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 dark:border-zinc-700"
      >
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="昵称"
          className="w-full md:w-48 px-8 py-5 bg-zinc-100 dark:bg-zinc-900 rounded-3xl outline-none font-black text-center focus:ring-4 ring-orange-500/20 transition-all"
        />
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
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

      <style>{`
        @keyframes danmaku {
          from {
            transform: translateX(calc(100vw + 120%));
          }
          to {
            transform: translateX(calc(-120vw - 100%));
          }
        }

        .animate-danmaku {
          animation-name: danmaku;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};