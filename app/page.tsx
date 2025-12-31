"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Code2,
  Search,
  FileText,
  ShieldCheck,
  Home,
  Settings,
  Menu,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  ListTodo
} from 'lucide-react';

const ToolCard = ({ tool, onClick, className = "" }: { tool: any; onClick: () => void; className?: string }) => (
  <div
    onClick={onClick}
    className={`group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 ease-out cursor-pointer overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br ${tool.iconBg} ${tool.iconColor} shadow-inner`}>
          <tool.icon size={20} className="sm:w-6 sm:h-6" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 sm:px-3 py-1 text-xs font-medium tracking-wide text-emerald-800 bg-emerald-50 rounded-full border border-emerald-100/50">
            {tool.category}
          </span>
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-900 transition-colors">
        {tool.name}
      </h3>

      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 flex-grow">
        {tool.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 sm:pt-6 border-t border-slate-50">
        <span className="text-xs font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors uppercase tracking-wider">
          Launch Tool
        </span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
          <ArrowUpRight size={14} className="sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
      ${active
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
        : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
      }`}
  >
    <Icon size={20} className={active ? 'text-emerald-100' : 'text-slate-400 group-hover:text-emerald-600'} />
    <span className="font-medium text-sm text-left truncate">{label}</span>
    {active && <ChevronRight size={14} className="ml-auto text-emerald-200" />}
  </button>
);

const App = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    // Check if user is configured
    const config = localStorage.getItem('ai-toolkit-config');
    if (!config) {
      router.push('/config');
      return;
    }

    try {
      const parsedConfig = JSON.parse(config);
      setConfig(parsedConfig);
    } catch (error) {
      console.error('Error parsing config:', error);
      router.push('/config');
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  const tools = [
    {
      id: 'technical-documentation',
      name: "Documentation Technique",
      category: "Admin",
      path: "/docs",
      description: "Découvre notre processus : pourquoi ces outils, l'analyse de nos techniques de Prompt Engineering et les choix des modèles IA.",
      icon: BookOpen,
      iconBg: "from-indigo-50 to-violet-50",
      iconColor: "text-indigo-600",
      fullWidth: true
    },
    {
      id: 'legal-analyzer',
      name: "Is the website compliant?",
      category: "Légal",
      description: "Audit profond : Scanne l'accueil et les pages légales (Mentions, CGU, RGPD) pour une vérification de conformité totale.",
      icon: ShieldCheck,
      iconBg: "from-rose-50 to-pink-50",
      iconColor: "text-rose-600"
    },
    {
      id: 'tech-stack-modernizer',
      name: "Tech Stack Modernizer",
      category: "Code",
      description: "Analyse ta stack actuelle et suggère un plan de migration moderne vers les meilleures technologies actuelles (Next.js, Tailwind, etc.).",
      icon: Code2,
      iconBg: "from-blue-50 to-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      id: 'feature-architect',
      name: "Feature Smith & Estimator",
      category: "Conception",
      description: "Transforme une idée floue en spécifications techniques blindées : User Stories, impacts DB/API et estimation de complexité.",
      icon: ListTodo,
      iconBg: "from-amber-50 to-orange-50",
      iconColor: "text-amber-600"
    },
    {
      id: 'readme-architect',
      name: "README Architect",
      category: "Documentation",
      description: "Craft beautiful, structured documentation and READMEs that engage developers instantly.",
      icon: FileText,
      iconBg: "from-emerald-50 to-teal-50",
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-emerald-100">

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 sm:w-72 bg-white border-r border-slate-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-full flex flex-col p-4 sm:p-6">
          <div className="flex items-center space-x-2 sm:space-x-3 px-2 mb-8 sm:mb-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-200">
              <Sparkles className="text-white sm:w-5 sm:h-5" size={16} />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              DevSuite
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-6">
            <div>
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">Main</p>
              <SidebarItem icon={Home} label="Home" active onClick={() => router.push('/')} />
            </div>

            <div>
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">My Tools</p>
              <div className="space-y-1">
                {tools.map((tool, idx) => (
                  <SidebarItem
                    key={idx}
                    icon={tool.icon}
                    label={tool.name}
                    onClick={() => router.push(tool.path || `/tools/${tool.id}`)}
                  />
                ))}
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-100">
            <SidebarItem icon={Settings} label="Settings" onClick={() => router.push('/settings')} />
            <div className="mt-3 sm:mt-4 flex items-center space-x-2 sm:space-x-3 px-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">Alex Developer</p>
                <p className="text-[10px] text-slate-500 truncate">
                  {config?.provider === 'openai' ? 'OpenAI' : 'Mistral AI'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64 lg:sm:ml-72' : ''} min-h-screen`}>

        {/* Header */}
        <header className="sticky top-0 z-40 bg-white backdrop-blur-md border-b border-slate-200/50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center shadow-sm">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-50 hover:shadow-sm text-slate-500 transition-colors lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">Home Dashboard</h1>
              <p className="text-slate-400 text-xs sm:text-sm font-medium hidden sm:block">Efficiency & Tooling Overview</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tools.map((tool, index) => (
              <ToolCard
                key={index}
                tool={tool}
                onClick={() => router.push(tool.path || `/tools/${tool.id}`)}
                className={tool.fullWidth ? "sm:col-span-2 lg:col-span-3" : ""}
              />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
