"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Code2,
  FileText,
  ShieldCheck,
  ArrowUpRight,
  BookOpen,
  ListTodo,
  Container
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

const App = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is configured
    const config = localStorage.getItem('ai-toolkit-config');
    if (!config) {
      router.push('/config');
      return;
    }
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
    },
    {
      id: 'docker-compose-generator',
      name: "Docker Compose Generator",
      category: "DevOps",
      description: "Génère un docker-compose.yml sécurisé : réseau interne isolé, seul le port web exposé, backend et DB protégés.",
      icon: Container,
      iconBg: "from-cyan-50 to-blue-50",
      iconColor: "text-cyan-600"
    }
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3 sm:space-x-4">
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
    </>
  );
};

export default App;
