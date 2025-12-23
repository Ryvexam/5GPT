"use client";

import React, { useState, useEffect } from 'react';
import {
  Code2,
  Container,
  Search,
  FileText,
  GitCommit,
  Home,
  Settings,
  Menu,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Calendar,
  Sparkles
} from 'lucide-react';

const ToolCard = ({ tool }) => (
  <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 ease-out cursor-pointer overflow-hidden">
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

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <button
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
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
  }, []);

  const tools = [
    {
      name: "Unit Test Generator",
      category: "Code",
      description: "Generate comprehensive unit tests automatically using AI pattern matching for high coverage.",
      icon: Code2,
      iconBg: "from-blue-50 to-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      name: "Smart Dockerizer",
      category: "DevOps",
      description: "Instant Dockerfile creation with intelligent layer caching optimization strategies.",
      icon: Container,
      iconBg: "from-sky-50 to-cyan-50",
      iconColor: "text-cyan-600"
    },
    {
      name: "Log Deep Analyzer",
      category: "Debug",
      description: "Parse gigabytes of logs in seconds to identify anomalies and root causes visually.",
      icon: Search,
      iconBg: "from-amber-50 to-orange-50",
      iconColor: "text-amber-600"
    },
    {
      name: "README Architect",
      category: "Documentation",
      description: "Craft beautiful, structured documentation and READMEs that engage developers instantly.",
      icon: FileText,
      iconBg: "from-emerald-50 to-teal-50",
      iconColor: "text-emerald-600"
    },
    {
      name: "Commit Message Beautifier",
      category: "Productivité",
      description: "Standardize your git history with semantic, beautifully formatted commit messages.",
      icon: GitCommit,
      iconBg: "from-rose-50 to-pink-50",
      iconColor: "text-rose-600"
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
              <Sparkles className="text-white" size={16} className="sm:w-5 sm:h-5" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              DevSuite
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-6">
            <div>
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">Main</p>
              <SidebarItem icon={Home} label="Home" active />
            </div>

            <div>
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">My Tools</p>
              <div className="space-y-1">
                {tools.map((tool, idx) => (
                  <SidebarItem key={idx} icon={tool.icon} label={tool.name} />
                ))}
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-100">
            <SidebarItem icon={Settings} label="Settings" />
            <div className="mt-3 sm:mt-4 flex items-center space-x-2 sm:space-x-3 px-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">Alex Developer</p>
                <p className="text-[10px] text-slate-500 truncate">Pro Account</p>
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

          {/* Stats Row */}
          <div className="mb-8 lg:mb-12">
            <div className="max-w-sm sm:max-w-md bg-emerald-900 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden group shadow-2xl shadow-emerald-900/20">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-800 rounded-full -mr-20 -mt-20 opacity-30 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400 rounded-full -ml-12 -mb-12 opacity-10 group-hover:scale-125 transition-transform duration-700"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 bg-emerald-800/50 rounded-2xl backdrop-blur-sm">
                    <Clock size={24} className="text-emerald-300" />
                  </div>
                  <div className="flex items-center space-x-1 bg-emerald-800/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <Calendar size={12} />
                    <span>Monthly View</span>
                  </div>
                </div>

                <p className="text-emerald-200/80 text-xs sm:text-sm font-medium mb-1">Estimated Time Saved</p>
                <div className="flex items-baseline space-x-2">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">128h</h3>
                  <span className="text-emerald-400 font-bold text-xs sm:text-sm">/ mo</span>
                </div>

                <div className="mt-8 pt-6 border-t border-emerald-800/50 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Efficiency Rate</span>
                    <span className="text-lg font-bold">+24% <span className="text-xs font-normal text-emerald-300 opacity-60">vs last mo</span></span>
                  </div>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                    <ArrowUpRight size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center space-x-2">
              <span>Quick Access Tools</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </h2>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tools.map((tool, index) => (
              <ToolCard key={index} tool={tool} />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
