'use client';

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import {
  Code2,
  Container,
  Search,
  FileText,
  GitCommit,
  Home,
  Zap,
  Menu,
  X
} from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Toolkit | Developer AI Tools",
  description: "Comprehensive AI toolkit for developers with unit testing, Docker generation, log analysis, documentation, and commit message optimization.",
};

const tools = [
  {
    id: "unit-test",
    name: "Unit Test Generator",
    description: "Generate comprehensive unit tests",
    icon: Code2,
    category: "Code",
    color: "text-blue-400"
  },
  {
    id: "dockerizer",
    name: "Smart Dockerizer",
    description: "Create optimized Dockerfiles",
    icon: Container,
    category: "DevOps",
    color: "text-cyan-400"
  },
  {
    id: "log-analyzer",
    name: "Log Deep Analyzer",
    description: "Analyze error logs and root causes",
    icon: Search,
    category: "Debug",
    color: "text-amber-400"
  },
  {
    id: "readme-architect",
    name: "README Architect",
    description: "Generate professional documentation",
    icon: FileText,
    category: "Documentation",
    color: "text-emerald-400"
  },
  {
    id: "commit-beautifier",
    name: "Commit Message Beautifier",
    description: "Create semantic commit messages",
    icon: GitCommit,
    category: "Productivité",
    color: "text-purple-400"
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const openMobileSidebar = () => setMobileSidebarOpen(true);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-slate-950 text-slate-100 flex">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-900 border-r border-slate-800 fixed h-full z-30 hidden lg:block">
            <div className="flex flex-col h-full p-6">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">AI Toolkit</h1>
                  <p className="text-xs text-slate-400">Developer Tools</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2">
                <Link
                  href="/"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group"
                >
                  <Home size={18} className="text-slate-400 group-hover:text-blue-400" />
                  <span className="font-medium">Dashboard</span>
                </Link>

                <div className="pt-4">
                  <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">AI Tools</p>
                  <div className="space-y-1">
                    {tools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.id}`}
                        className="flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group"
                      >
                        <tool.icon size={18} className={`text-slate-400 ${tool.color} group-hover:opacity-100`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{tool.name}</p>
                          <p className="text-xs text-slate-500 truncate">{tool.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Footer */}
              <div className="border-t border-slate-800 pt-4 mt-4">
                <div className="px-3 py-2 rounded-lg bg-slate-800/50">
                  <p className="text-xs text-slate-400">Powered by</p>
                  <p className="text-sm font-semibold text-blue-400">Mistral AI</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300 ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={closeMobileSidebar}
          />

          {/* Mobile Sidebar */}
          <aside className={`w-64 bg-slate-900 border-r border-slate-800 fixed h-full z-30 lg:hidden transform transition-transform duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full p-6">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Zap className="text-white" size={16} />
                  </div>
                  <h1 className="text-lg font-bold text-white">AI Toolkit</h1>
                </div>
                <button
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  onClick={closeMobileSidebar}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 space-y-2">
                <Link
                  href="/"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  onClick={closeMobileSidebar}
                >
                  <Home size={18} className="text-slate-400" />
                  <span className="font-medium">Dashboard</span>
                </Link>

                <div className="pt-4">
                  <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">AI Tools</p>
                  <div className="space-y-1">
                    {tools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.id}`}
                        className="flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group"
                        onClick={closeMobileSidebar}
                      >
                        <tool.icon size={18} className={`text-slate-400 ${tool.color} group-hover:opacity-100`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{tool.name}</p>
                          <p className="text-xs text-slate-500 truncate">{tool.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 lg:ml-64">
            {/* Mobile Header */}
            <header className="sticky top-0 z-10 bg-slate-950 border-b border-slate-800 px-4 py-4 lg:hidden">
              <div className="flex items-center justify-between">
                <button
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  onClick={openMobileSidebar}
                >
                  <Menu size={24} />
                </button>
                <h1 className="text-lg font-bold text-white">AI Toolkit</h1>
                <div className="w-10" /> {/* Spacer for centering */}
              </div>
            </header>

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
