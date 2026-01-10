"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Code2,
  Home,
  Settings,
  Menu,
  ChevronRight,
  Sparkles,
  BookOpen,
  ListTodo,
  FileText,
  ShieldCheck,
  Container
} from 'lucide-react';

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

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const configStr = localStorage.getItem('ai-toolkit-config');
    if (configStr) {
      try {
        setConfig(JSON.parse(configStr));
      } catch (e) {}
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tools = [
    { id: 'technical-documentation', name: "Documentation", path: "/docs", icon: BookOpen },
    { id: 'legal-analyzer', name: "Legal Analyzer", path: "/tools/legal-analyzer", icon: ShieldCheck },
    { id: 'tech-stack-modernizer', name: "Stack Modernizer", path: "/tools/tech-stack-modernizer", icon: Code2 },
    { id: 'feature-architect', name: "Feature Smith", path: "/tools/feature-architect", icon: ListTodo },
    { id: 'readme-architect', name: "README Architect", path: "/tools/readme-architect", icon: FileText },
    { id: 'docker-compose-generator', name: "Docker Compose", path: "/tools/docker-compose-generator", icon: Container },
  ];

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-emerald-100">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 sm:w-72 bg-white border-r border-slate-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-full flex flex-col p-4 sm:p-6">
          <div className="flex items-center space-x-2 sm:space-x-3 px-2 mb-8 sm:mb-10 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-200">
              <Sparkles className="text-white sm:w-5 sm:h-5" size={16} />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              ToolsWithAI
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-6">
            <div>
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">Main</p>
              <SidebarItem icon={Home} label="Home" active={pathname === '/'} onClick={() => router.push('/')} />
            </div>

            <div>
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">My Tools</p>
              <div className="space-y-1">
                {tools.map((tool) => (
                  <SidebarItem
                    key={tool.id}
                    icon={tool.icon}
                    label={tool.name}
                    active={isActive(tool.path)}
                    onClick={() => router.push(tool.path)}
                  />
                ))}
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-100">
            <SidebarItem icon={Settings} label="Settings" active={isActive('/settings')} onClick={() => router.push('/settings')} />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64 lg:sm:ml-72' : ''} min-h-screen flex flex-col`}>
        {/* Mobile Header (only visible on small screens when sidebar is closed) */}
        <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-4 py-4 flex items-center shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-50 text-slate-500 transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-slate-800">ToolsWithAI</span>
        </header>

        <main className="flex-1 flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          
          <footer className="py-8 px-8 border-t border-slate-200 mt-auto bg-white/50">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
              <div className="flex space-x-6">
                <a href="/terms" className="hover:text-emerald-600 transition-colors">Mentions Légales & CGU</a>
                <a href="/privacy" className="hover:text-emerald-600 transition-colors">Politique de Confidentialité</a>
              </div>
              <div>
                &copy; {new Date().getFullYear()} ToolsWithAI. Tous droits réservés.
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
