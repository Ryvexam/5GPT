import fs from 'fs';
import path from 'path';
import React from 'react';
import Link from 'next/link';
import { FileText, ShieldAlert, CheckCircle, Book } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';

// Map slugs to filenames and metadata
const DOCS_MAP = {
  'implementation-guide': {
    file: 'IMPLEMENTATION_GUIDE.md',
    title: 'Suggestions de correctifs',
    icon: Book,
    color: 'text-blue-600',
    bg: 'bg-blue-600/10'
  },
  'security': {
    file: 'SECURITY.md',
    title: 'Analyse de Sécurité',
    icon: ShieldAlert,
    color: 'text-rose-600',
    bg: 'bg-rose-600/10'
  },
  'test-results': {
    file: 'TEST_RESULTS.md',
    title: 'Résultats des Tests',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-600/10'
  }
};

type DocSlug = keyof typeof DOCS_MAP;

export async function generateStaticParams() {
  return Object.keys(DOCS_MAP).map((slug) => ({
    slug,
  }));
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!Object.keys(DOCS_MAP).includes(slug)) {
    notFound();
  }

  const docConfig = DOCS_MAP[slug as DocSlug];
  const filePath = path.join(process.cwd(), 'docs', docConfig.file);
  
  let fileContent = '';
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    notFound();
  }

  const Icon = docConfig.icon;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <article className="prose prose-slate max-w-none bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-sm border border-slate-200">
         <div className="flex items-center gap-3 mb-8 not-prose">
            <div className={`p-2 rounded-lg ${docConfig.bg}`}>
              <Icon size={24} className={docConfig.color} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{docConfig.title}</h1>
              <p className="text-xs text-slate-500 font-mono">{docConfig.file}</p>
            </div>
         </div>

         <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-black text-slate-900 mb-8 pb-4 border-b border-slate-100" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-800 mt-12 mb-6 flex items-center gap-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4 uppercase tracking-wider text-xs bg-slate-100 inline-block px-2 py-1 rounded" {...props} />,
              pre: ({children}) => <>{children}</>,
              code: ({node, inline, className, children, ...props}: any) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <div className="not-prose relative my-8 overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-800">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {match ? match[1].toUpperCase() : 'TEXT'}
                      </span>
                    </div>
                    <code className="relative block bg-[#0d1117] text-[#e6edf3] p-6 text-[13px] font-mono overflow-x-auto whitespace-pre leading-relaxed" {...props}>
                      {children}
                    </code>
                  </div>
                ) : (
                  <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md text-[12px] font-mono border border-indigo-100 font-bold" {...props}>
                    {children}
                  </code>
                );
              },
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-600 my-6 bg-slate-50 py-2 pr-4 rounded-r-lg" {...props} />,
              table: ({node, ...props}) => <div className="overflow-x-auto my-6 rounded-xl border border-slate-200"><table className="w-full text-sm text-left" {...props} /></div>,
              thead: ({node, ...props}) => <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-xs" {...props} />,
              th: ({node, ...props}) => <th className="px-6 py-3 border-b border-slate-200" {...props} />,
              td: ({node, ...props}) => <td className="px-6 py-4 border-b border-slate-100" {...props} />,
            }}
           >
             {fileContent}
           </ReactMarkdown>
        </article>
    </div>
  );
}