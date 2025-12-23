'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Code2, Terminal, Sparkles } from 'lucide-react';

interface PromptVersion {
  id: string;
  version: string;
  title: string;
  content: string;
  note?: string;
  type: 'basic' | 'integrated' | 'final';
}

interface PromptShowingProps {
  prompts: PromptVersion[];
}

export const PromptShowing: React.FC<PromptShowingProps> = ({ prompts }) => {
  const [activeIndex, setActiveIndex] = useState(prompts.length - 1); // Default to latest

  const next = () => setActiveIndex((prev) => (prev + 1) % prompts.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + prompts.length) % prompts.length);

  const activePrompt = prompts[activeIndex];

  const getTypeStyles = (type: PromptVersion['type']) => {
    switch (type) {
      case 'final':
        return {
          bg: 'bg-emerald-900/20',
          border: 'border-emerald-900/30',
          text: 'text-emerald-400',
          badge: 'bg-emerald-600 text-white',
          icon: <Sparkles size={16} className="text-emerald-400" />
        };
      case 'integrated':
        return {
          bg: 'bg-blue-900/20',
          border: 'border-blue-900/30',
          text: 'text-blue-400',
          badge: 'bg-blue-600 text-white',
          icon: <Terminal size={16} className="text-blue-400" />
        };
      default:
        return {
          bg: 'bg-slate-900/40',
          border: 'border-slate-800',
          text: 'text-slate-400',
          badge: 'bg-slate-700 text-slate-200',
          icon: <Code2 size={16} className="text-slate-400" />
        };
    }
  };

  const styles = getTypeStyles(activePrompt.type);

  return (
    <div className="not-prose relative group">
      {/* Navigation Controls */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-white shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={next}
          className="p-2 rounded-full bg-white shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Main Card */}
      <div className={`rounded-[2rem] border-2 ${styles.border} ${styles.bg} overflow-hidden transition-all duration-500 shadow-xl`}>
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${styles.bg} border ${styles.border}`}>
                {styles.icon}
              </div>
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${styles.badge} mb-1 inline-block`}>
                  {activePrompt.version}
                </span>
                <h4 className="text-white font-bold text-lg">{activePrompt.title}</h4>
              </div>
            </div>
            
            <div className="flex items-center space-x-1.5 bg-slate-950/40 px-3 py-1.5 rounded-full border border-white/5">
              {prompts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'bg-emerald-500 w-6' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            {activePrompt.note && (
              <p className={`text-xs font-mono mb-3 ${styles.text} italic opacity-80`}>
                // {activePrompt.note}
              </p>
            )}
            <div className="bg-slate-950/60 rounded-2xl p-5 sm:p-6 border border-white/5 shadow-inner">
              <pre className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-wrap break-words max-h-[400px] overflow-y-auto custom-scrollbar">
                {activePrompt.content}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

