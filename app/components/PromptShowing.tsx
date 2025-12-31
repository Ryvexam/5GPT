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
  const [activeIndex, setActiveIndex] = useState(prompts.length - 1);

  const next = () => setActiveIndex((prev) => (prev + 1) % prompts.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + prompts.length) % prompts.length);

  const activePrompt = prompts[activeIndex];

  const getTypeColor = (type: PromptVersion['type']) => {
    switch (type) {
      case 'final':
        return 'emerald';
      case 'integrated':
        return 'blue';
      default:
        return 'slate';
    }
  };

  const color = getTypeColor(activePrompt.type);
  
  // Mapping for dynamic tailwind classes
  const colors = {
    emerald: { text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700', icon: <Sparkles size={18} /> },
    blue: { text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700', icon: <Terminal size={18} /> },
    slate: { text: 'text-slate-600', badge: 'bg-slate-100 text-slate-700', icon: <Code2 size={18} /> },
  };

  const currentStyle = colors[color as keyof typeof colors];

  return (
    <div className="not-prose group relative w-full max-w-4xl mx-auto my-8">
      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <div className={`${currentStyle.text} transition-colors duration-300`}>
              {currentStyle.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-slate-900 text-sm">{activePrompt.title}</h4>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${currentStyle.badge} transition-colors duration-300`}>
                  {activePrompt.version}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center space-x-1.5">
            {prompts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex 
                    ? `w-4 ${currentStyle.text.replace('text-', 'bg-')}` 
                    : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative bg-slate-50/50">
          {/* Side Navigation Buttons (Hover only) */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
          >
            <ChevronRight size={16} />
          </button>

          <div className="p-0">
            {activePrompt.note && (
              <div className="px-6 py-2bg-slate-50 border-b border-slate-100 text-xs font-mono text-slate-500 italic">
                // {activePrompt.note}
              </div>
            )}
            <div className="relative group/code">
              <pre className="p-6 text-xs sm:text-sm text-slate-600 font-mono leading-relaxed whitespace-pre-wrap break-words max-h-[400px] overflow-y-auto custom-scrollbar bg-slate-50">
                {activePrompt.content}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};