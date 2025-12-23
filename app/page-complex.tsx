'use client';

import Link from "next/link";
import {
  Code2,
  Container,
  Search,
  FileText,
  GitCommit,
  ArrowRight,
  Zap,
  Clock,
  TrendingUp
} from "lucide-react";

const tools = [
  {
    id: "unit-test",
    name: "Unit Test Generator",
    description: "Generate comprehensive unit tests with AI pattern matching for maximum coverage and edge case detection.",
    icon: Code2,
    category: "Code",
    color: "text-blue-400",
    bgGradient: "from-blue-500/10 to-indigo-500/10",
    borderColor: "border-blue-500/20",
    hoverBg: "hover:bg-blue-500/5"
  },
  {
    id: "dockerizer",
    name: "Smart Dockerizer",
    description: "Create production-ready Dockerfiles with multi-stage builds and intelligent layer caching optimization.",
    icon: Container,
    category: "DevOps",
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/10 to-teal-500/10",
    borderColor: "border-cyan-500/20",
    hoverBg: "hover:bg-cyan-500/5"
  },
  {
    id: "log-analyzer",
    name: "Log Deep Analyzer",
    description: "Parse massive log files to identify anomalies, root causes, and provide structured debugging solutions.",
    icon: Search,
    category: "Debug",
    color: "text-amber-400",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/20",
    hoverBg: "hover:bg-amber-500/5"
  },
  {
    id: "readme-architect",
    name: "README Architect",
    description: "Craft professional, engaging documentation with badges, installation guides, and comprehensive usage examples.",
    icon: FileText,
    category: "Documentation",
    color: "text-emerald-400",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    borderColor: "border-emerald-500/20",
    hoverBg: "hover:bg-emerald-500/5"
  },
  {
    id: "commit-beautifier",
    name: "Commit Message Beautifier",
    description: "Transform your git history with semantic, conventional commit messages and relevant emoji usage.",
    icon: GitCommit,
    category: "Productivité",
    color: "text-purple-400",
    bgGradient: "from-purple-500/10 to-violet-500/10",
    borderColor: "border-purple-500/20",
    hoverBg: "hover:bg-purple-500/5"
  }
];

const ToolCard = ({ tool }: { tool: typeof tools[0] }) => (
  <Link href={`/tools/${tool.id}`}>
    <div className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border ${tool.borderColor} ${tool.hoverBg} transition-all duration-300 ease-out cursor-pointer overflow-hidden hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-900/50`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl bg-slate-700/50 border border-slate-600/50`}>
            <tool.icon size={24} className={tool.color} />
          </div>
          <span className={`px-3 py-1 text-xs font-medium tracking-wide text-slate-300 bg-slate-700/50 rounded-full border border-slate-600/50`}>
            {tool.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-slate-100 transition-colors">
          {tool.name}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {tool.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Use Tool
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-slate-600 transition-colors">
            <ArrowRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Simple Sidebar for now */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 fixed h-full z-30 hidden lg:block">
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Toolkit</h1>
              <p className="text-xs text-slate-400">Developer Tools</p>
            </div>
          </div>
          <nav className="flex-1 space-y-2">
            <Link
              href="/"
              className="flex items-center space-x-3 px-3 py-3 rounded-lg bg-slate-800 text-white"
            >
              <div className="text-blue-400">🏠</div>
              <span className="font-medium">Dashboard</span>
            </Link>
            <div className="pt-4">
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">AI Tools</p>
              <div className="space-y-1">
                <Link href="/tools/unit-test" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <Code2 size={18} className="text-blue-400" />
                  <span className="font-medium text-sm">Unit Test Generator</span>
                </Link>
                <Link href="/tools/dockerizer" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <Container size={18} className="text-cyan-400" />
                  <span className="font-medium text-sm">Smart Dockerizer</span>
                </Link>
                <Link href="/tools/log-analyzer" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <Search size={18} className="text-amber-400" />
                  <span className="font-medium text-sm">Log Deep Analyzer</span>
                </Link>
                <Link href="/tools/readme-architect" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <FileText size={18} className="text-emerald-400" />
                  <span className="font-medium text-sm">README Architect</span>
                </Link>
                <Link href="/tools/commit-beautifier" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <GitCommit size={18} className="text-purple-400" />
                  <span className="font-medium text-sm">Commit Beautifier</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64">
        <div className="min-h-screen">
          {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <Zap className="text-blue-400" size={48} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              AI Toolkit for
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Developers</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Boost your productivity with 5 powerful AI tools designed specifically for developers.
              Generate tests, create Dockerfiles, analyze logs, write docs, and beautify commits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center space-x-2 text-slate-300">
                <Clock size={20} className="text-blue-400" />
                <span>Save 20+ hours per month</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-slate-300">
                <TrendingUp size={20} className="text-purple-400" />
                <span>Powered by Mistral AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
              <div className="text-slate-400">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">20h+</div>
              <div className="text-slate-400">Time Saved Monthly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
              <div className="text-slate-400">Open Source</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Choose Your AI Tool
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Select from our collection of specialized AI tools designed to streamline your development workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 lg:mt-24 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Boost Your Productivity?
            </h3>
            <p className="text-slate-400 mb-6">
              Get started with any of our AI tools. Configure your Mistral API key and begin automating your development tasks.
            </p>
            <div className="text-sm text-slate-500">
              <code className="bg-slate-800 px-3 py-1 rounded">MISTRAL_API_KEY=your_key_here</code>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}