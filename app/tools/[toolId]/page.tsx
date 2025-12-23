'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Code2,
  Container,
  Search,
  FileText,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Copy,
  Check,
  AlertTriangle,
  Printer
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TOOLS_CONFIG = {
  'unit-test-generator': {
    name: 'Unit Test Generator',
    description: 'Generate comprehensive unit tests automatically using AI pattern matching for high coverage.',
    icon: Code2,
    placeholder: 'Paste your code here to generate unit tests...',
    category: 'Code'
  },
  'smart-dockerizer': {
    name: 'Smart Dockerizer',
    description: 'Instant Dockerfile creation with intelligent layer caching optimization strategies.',
    icon: Container,
    placeholder: 'Describe your project or paste your code structure...',
    category: 'DevOps'
  },
  'log-deep-analyzer': {
    name: 'Log Deep Analyzer',
    description: 'Parse gigabytes of logs in seconds to identify anomalies and root causes visually.',
    icon: Search,
    placeholder: 'Paste your error logs here for analysis...',
    category: 'Debug'
  },
  'readme-architect': {
    name: 'README Architect',
    description: 'Craft beautiful, structured documentation and READMEs that engage developers instantly.',
    icon: FileText,
    placeholder: 'Describe your project or paste code snippets...',
    category: 'Documentation'
  },
  'legal-analyzer': {
    name: 'Legal Privacy Analyzer',
    description: 'Audit complet : Mentions Légales, CGU, CGV et conformité RGPD à partir d\'un lien ou texte.',
    icon: ShieldCheck,
    placeholder: 'Lien vers le site ou texte juridique (ex: https://monsite.fr/mentions-legales)',
    category: 'Légal'
  }
};

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const toolId = params.toolId as string;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState<any>(null);

  const tool = TOOLS_CONFIG[toolId as keyof typeof TOOLS_CONFIG];

  useEffect(() => {
    // Load configuration from localStorage
    const storedConfig = localStorage.getItem('ai-toolkit-config');
    if (storedConfig) {
      try {
        const parsedConfig = JSON.parse(storedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Error parsing config:', error);
        router.push('/config');
      }
    } else {
      router.push('/config');
    }
  }, [router]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Tool not found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-emerald-600 hover:text-emerald-700 underline"
          >
            Go back to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading configuration...</p>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!input.trim() || !config) return;

    setIsLoading(true);
    setOutput('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId,
          userContent: input,
          provider: config.provider,
          model: config.model,
          apiKey: config.apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      setOutput(data.response);
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while generating the response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const IconComponent = tool.icon;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12">
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .report-container { 
            padding: 40px !important;
            border: none !important;
            box-shadow: none !important;
          }
          .report-header {
            margin-bottom: 30px;
            border-bottom: 2px solid #10b981;
            padding-bottom: 20px;
          }
        }
        .print-only { display: none; }
      `}</style>

      {/* Header */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm no-print">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-600/10">
                  <IconComponent size={24} className="text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{tool.name}</h1>
                  <p className="text-sm text-slate-600">{tool.category}</p>
                </div>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Configuration</p>
              <p className="text-sm font-semibold text-emerald-600">
                {config.provider === 'openai' ? 'OpenAI GPT-5' : 'Mistral Devstral 2'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Legal Warning Banner */}
        {toolId === 'legal-analyzer' && (
          <div className="mb-8 bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start space-x-4 no-print">
            <div className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-900 uppercase tracking-wide">Avertissement Légal Critique</h3>
              <p className="text-sm text-rose-700 mt-1">
                La non-conformité (RGPD, Mentions Légales) peut entraîner des amendes jusqu'à <strong>20 millions d'euros</strong> ou <strong>4% du CA mondial</strong>. Cet outil vous aide à identifier les risques majeurs immédiatement.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6 no-print">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <span>Source à Analyser</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </h2>
              
              <div className="space-y-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={tool.placeholder}
                  className={`w-full ${toolId === 'legal-analyzer' ? 'h-14 py-4 overflow-hidden' : 'h-96 py-4'} px-4 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-slate-800 placeholder-slate-400 transition-all duration-300 font-mono text-sm`}
                />

                <button
                  onClick={handleGenerate}
                  disabled={!input.trim() || isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-emerald-200 group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Analyse en cours...</span>
                    </>
                  ) : (
                    <>
                      <IconComponent size={20} className="group-hover:rotate-12 transition-transform" />
                      <span>Lancer l'Expertise AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between no-print">
              <h2 className="text-lg font-bold">Rapport d'Analyse</h2>
              <div className="flex items-center space-x-2">
                {output && (
                  <>
                    <button
                      onClick={handlePrint}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                    >
                      <Printer size={18} />
                      <span className="text-sm font-semibold">Exporter PDF</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                    >
                      {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                      <span className="text-sm font-semibold">{copied ? 'Copié' : 'Copier'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Print Header (Only visible when printing) */}
            <div className="print-only report-header">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Rapport de Conformité AI</h1>
                  <p className="text-slate-500 font-mono text-sm mt-1">Généré le {new Date().toLocaleDateString('fr-FR')} • AI Toolkit v1.0</p>
                </div>
                <div className="bg-emerald-600 text-white p-4 rounded-2xl font-black text-xl">
                  {tool.name.toUpperCase()}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-100 mb-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source d'Analyse</p>
                  <p className="text-sm font-semibold text-slate-700 truncate">{input}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Expertise IA</p>
                  <p className="text-sm font-semibold text-slate-700">Audit Juridique & Conformité Web</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] min-h-[500px] shadow-sm overflow-hidden report-container relative">
              {output ? (
                <div className="p-8 prose prose-emerald max-w-none prose-headings:font-bold prose-p:text-slate-600 prose-table:border prose-table:rounded-xl prose-th:bg-slate-50 prose-th:p-3 prose-td:p-3 prose-pre:bg-slate-900 prose-pre:text-emerald-400">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
                </div>
              ) : (
                <div className="h-[500px] flex items-center justify-center text-slate-400 no-print">
                  <div className="text-center px-8">
                    <div className="relative inline-block mb-6">
                      <IconComponent size={64} className="mx-auto opacity-20" />
                      <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-full"></div>
                    </div>
                    <h3 className="text-slate-600 font-bold text-lg mb-2">Prêt pour l'analyse</h3>
                    <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Saisissez une URL ou collez un document pour générer votre rapport de conformité intelligent.
                    </p>
                  </div>
                </div>
              )}

              {/* Print Footer */}
              <div className="print-only mt-12 pt-8 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex justify-between uppercase tracking-widest">
                <span>Certifié par DevSuite AI Analyzer</span>
                <span>Page 1 / 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

