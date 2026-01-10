'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Code2,
  Search,
  FileText,
  ShieldCheck,
  BookOpen,
  ArrowLeft,
  Loader2,
  Copy,
  Check,
  AlertTriangle,
  Printer,
  ListTodo,
  Mic,
  Square,
  Download,
  Container
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AI_PROVIDERS = {
  openai: {
    name: 'OpenAI',
    models: [
      { id: 'gpt-5.2', name: 'GPT-5.2', description: 'Latest flagship model for advanced coding and agentic tasks' },
      { id: 'gpt-5-mini', name: 'GPT-5 Mini', description: 'Fast, cost-efficient variant for well-defined tasks' },
      { id: 'gpt-4.1', name: 'GPT-4.1', description: 'Powerful general-purpose model' }
    ],
    defaultModel: 'gpt-5.2',
    color: 'bg-[#74AA9C]',
    textColor: 'text-[#74AA9C]'
  },
  mistral: {
    name: 'Mistral AI',
    models: [
      { id: 'mistral-large-latest', name: 'Mistral Large', description: 'Le modèle flagship le plus puissant de Mistral' },
      { id: 'devstral-medium-latest', name: 'Devstral Medium', description: 'Équilibre parfait entre vitesse et intelligence pour le code' },
      { id: 'devstral-small-latestdev', name: 'Devstral Small', description: 'Modèle ultra-rapide optimisé pour les tâches simples' }
    ],
    defaultModel: 'mistral-large-latest',
    color: 'bg-orange-500',
    textColor: 'text-orange-500'
  }
};

const TOOLS_CONFIG = {
  'tech-stack-modernizer': {
    name: 'Tech Stack Modernizer',
    description: 'Analyse ta stack actuelle et suggère un plan de migration moderne vers les meilleures technologies actuelles (Next.js, Tailwind, etc.).',
    icon: Code2,
    placeholder: 'Collez le code source, une liste de dépendances (package.json) ou l\'URL d\'un site...', 
    category: 'Code'
  },
  'feature-architect': {
    name: 'Feature Smith & Estimator',
    description: 'Transforme une idée floue en spécifications techniques blindées : User Stories, impacts DB/API et estimation de complexité.',
    icon: ListTodo,
    placeholder: 'Décris ta fonctionnalité (ex: "Je veux un système de parrainage avec code unique et récompense débloquée au premier achat du filleul")...', 
    category: 'Conception'
  },
  'readme-architect': {
    name: 'README Architect',
    description: 'Craft beautiful, structured documentation and READMEs that engage developers instantly.',
    icon: FileText,
    placeholder: 'Paste a GitHub repository URL (e.g., https://github.com/owner/repo) or describe your project...',
    category: 'Documentation'
  },
  'legal-analyzer': {
    name: 'Is the website compliant?',
    description: 'Audit profond : Scanne l\'accueil et les pages légales (Mentions, CGU, RGPD) pour une vérification de conformité totale.',
    icon: ShieldCheck,
    placeholder: 'Collez l\'URL de la page d\'accueil (ex: https://monsite.fr)', 
    category: 'Légal'
  },
  'technical-documentation': {
    name: 'Documentation Technique',
    description: 'Génère l\'audit technique (Contexte, Technique, Évolution, Limites) pour tes prompts.',
    icon: BookOpen,
    placeholder: 'Décris l\'outil ou colle le prompt pour générer sa documentation technique...', 
    category: 'Admin'
  },
  'docker-compose-generator': {
    name: 'Docker Compose Generator',
    description: 'Génère un docker-compose.yml sécurisé : réseau interne isolé, seul le port web exposé, backend et DB protégés.',
    icon: Container,
    placeholder: 'Décris ton projet (ex: "Une app Next.js avec API Node.js, PostgreSQL et Redis. Le frontend doit être accessible sur le port 3000")...',
    category: 'DevOps'
  }
};

const SpecRenderer = ({ content }: { content: string }) => {
  return (
    <div className="spec-renderer space-y-8">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-black text-slate-900 mb-6 border-b-2 border-amber-500 pb-4 uppercase tracking-tight" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold text-amber-700 mt-10 mb-4 flex items-center gap-2 bg-amber-50 p-3 rounded-lg border border-amber-100" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3" {...props} />,
          p: ({node, ...props}) => {
            // Check if it's a Gherkin line (Given/When/Then) to style it
            const text = props.children?.toString() || '';
            if (text.startsWith('Given') || text.startsWith('When') || text.startsWith('Then') || text.startsWith('And')) {
              return <div className="font-mono text-sm text-slate-600 mb-1 pl-4 border-l-2 border-slate-300 py-0.5">{props.children}</div>
            }
            return <p className="text-slate-600 leading-relaxed mb-4" {...props} />
          },
          ul: ({node, ...props}) => <ul className="space-y-2 mb-6" {...props} />,
          li: ({node, ...props}) => <li className="flex items-start gap-2 text-slate-600" ><span className="mt-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" /><div>{props.children}</div></li>,
          table: ({node, ...props}) => <div className="overflow-x-auto my-6 rounded-xl border border-slate-200"><table className="w-full text-sm text-left" {...props} /></div>,
          thead: ({node, ...props}) => <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-xs" {...props} />,
          th: ({node, ...props}) => <th className="px-6 py-3 border-b border-slate-200" {...props} />,
          td: ({node, ...props}) => <td className="px-6 py-4 border-b border-slate-100" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-amber-500 pl-4 py-2 italic text-slate-500 bg-slate-50 rounded-r-lg my-4" {...props} />,
          pre: ({children}) => <>{children}</>,
          code: ({node, inline, className, children, ...props}: any) => {
            return !inline 
              ? <div className="not-prose relative my-8 overflow-hidden rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-800">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Gherkin Spec</span>
                  </div>
                  <code className="relative block bg-[#0d1117] text-[#e6edf3] p-6 text-[13px] font-mono overflow-x-auto whitespace-pre leading-relaxed" {...props}>
                    {children}
                  </code>
                </div>
              : <code className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md text-[12px] font-mono border border-amber-100 font-bold" {...props}>
                  {children}
                </code>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const toolId = params.toolId as string;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState<any>(null);
  
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);

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

  // Redirect technical-documentation to /docs
  useEffect(() => {
    if (toolId === 'technical-documentation') {
      router.push('/docs');
    }
  }, [toolId, router]);

  if (toolId === 'technical-documentation') {
    return null; // Don't render anything while redirecting
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

  const startRecording = async () => {
    if (!config) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setIsRecording(false);
        
        const formData = new FormData();
        formData.append('file', audioBlob);
        formData.append('provider', config.provider);
        formData.append('apiKey', config.apiKey);

        try {
          const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          });
          
          if (response.ok) {
            const data = await response.json();
            setInput((prev) => prev + (prev ? ' ' : '') + data.text);
          } else {
            console.error('Transcription failed');
          }
        } catch (err) {
          console.error('Transcription error', err);
        }
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone', err);
      alert('Impossible d\'accéder au microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

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

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setOutput((prev) => prev + chunk);
      }

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

  const isFeatureArchitect = toolId === 'feature-architect';
  const isReadmeArchitect = toolId === 'readme-architect';
  const isDockerCompose = toolId === 'docker-compose-generator';
  const themeColor = isFeatureArchitect ? 'amber' : isDockerCompose ? 'cyan' : 'emerald';
  const themeText = isFeatureArchitect ? 'text-amber-600' : isDockerCompose ? 'text-cyan-600' : 'text-emerald-600';
  const themeBg = isFeatureArchitect ? 'bg-amber-600' : isDockerCompose ? 'bg-cyan-600' : 'bg-emerald-600';
  const themeHover = isFeatureArchitect ? 'hover:bg-amber-700' : isDockerCompose ? 'hover:bg-cyan-700' : 'hover:bg-emerald-700';
  const themeRing = isFeatureArchitect ? 'focus:ring-amber-500' : isDockerCompose ? 'focus:ring-cyan-500' : 'focus:ring-emerald-500';
  const themeShadow = isFeatureArchitect ? 'shadow-amber-200' : isDockerCompose ? 'shadow-cyan-200' : 'shadow-emerald-200';
  const themeProse = isFeatureArchitect ? 'prose-amber' : isDockerCompose ? 'prose-cyan' : 'prose-emerald';
  const themePre = isFeatureArchitect ? 'prose-pre:text-amber-400' : isDockerCompose ? 'prose-pre:text-cyan-400' : 'prose-pre:text-emerald-400';

  const inputTitle = isFeatureArchitect ? "Définition du Besoin" : isDockerCompose ? "Description du Projet" : "Source à Analyser";
  const buttonText = isFeatureArchitect ? "Générer les Spécifications" : isDockerCompose ? "Générer le Docker Compose" : "Lancer l\'Expertise AI";
  const emptyStateTitle = isFeatureArchitect ? "Atelier de Conception" : isDockerCompose ? "Docker Compose Generator" : "Prêt pour l\'analyse";
  const emptyStateDesc = isFeatureArchitect 
    ? "Décrivez votre fonctionnalité pour obtenir un cahier des charges technique complet (User Stories, DB, API)." 
    : isDockerCompose
    ? "Décrivez votre stack (frontend, backend, DB) pour générer un docker-compose.yml sécurisé."
    : "Saisissez une URL ou collez un document pour générer votre rapport de conformité intelligent.";
  const outputTitle = isFeatureArchitect ? "Spécifications Techniques" : isReadmeArchitect ? "README.md" : isDockerCompose ? "docker-compose.yml" : "Rapport d\'Analyse";

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([output], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-slate-800 pb-12">
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { 
            background: white !important; 
            color: black !important;
          }
          .report-container { 
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            min-height: auto !important;
            overflow: visible !important;
            border-radius: 0 !important;
          }
          .report-header {
            margin-bottom: 30px;
            border-bottom: 2px solid #10b981;
            padding-bottom: 20px;
            page-break-after: avoid;
          }
          h1, h2, h3, h4 { page-break-after: avoid; }
          table, pre, blockquote, img { page-break-inside: avoid; }
          ul, ol { page-break-before: avoid; }
          .prose { max-width: none !important; }
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
                {(() => {
                  const provider = AI_PROVIDERS[config.provider as keyof typeof AI_PROVIDERS];
                  const model = provider?.models.find((m: any) => m.id === config.model);
                  return `${provider?.name || ''} ${model?.name || config.model}`;
                })()}
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
              <h3 className="text-sm font-bold text-rose-900 uppercase tracking-wide">Avertissement de Conformité Web</h3>
              <p className="text-sm text-rose-700 mt-1">
                Le non-respect de la <strong>LCEN</strong> ou du <strong>RGPD</strong> peut entraîner des sanctions allant jusqu\'à <strong>20 millions d\'euros</strong>. Notre IA vérifie désormais la correspondance entre votre SIRET et votre activité réelle via l\'API Recherche d\'entreprises.
              </p>
            </div>
          </div>
        )}

        {/* README Architect Warning Banner */}
        {toolId === 'readme-architect' && (
          <div className="mb-8 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start space-x-4 no-print">
            <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide">Usage de README Architect</h3>
              <p className="text-sm text-blue-700 mt-1">
                Cet outil fonctionne uniquement sur les <strong>dépôts GitHub publics</strong>. Pour les projets de très grande taille, l\'analyse peut être partielle en raison des limites de fenêtre de contexte de l\'IA.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6 no-print">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <span>{inputTitle}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isFeatureArchitect ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`}></span>
              </h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={tool.placeholder}
                    className={`w-full ${toolId === 'legal-analyzer' ? 'h-14 py-4 overflow-hidden' : 'h-96 py-4'} px-4 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:ring-2 ${themeRing} focus:border-transparent outline-none text-slate-800 placeholder-slate-400 transition-all duration-300 font-mono text-sm`}
                  />
                  {(toolId === 'readme-architect' || toolId === 'feature-architect') && (
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-200 ${
                        isRecording 
                          ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-200' 
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                      title={isRecording ? "Arrêter l'enregistrement" : "Dicter avec IA"}
                    >
                      {isRecording ? <Square size={16} fill="currentColor" /> : <Mic size={18} />}
                    </button>
                  )}
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!input.trim() || isLoading}
                  className={`w-full ${themeBg} ${themeHover} disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg ${themeShadow} group`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Analyse en cours...</span>
                    </>
                  ) : (
                    <>
                      <IconComponent size={20} className="group-hover:rotate-12 transition-transform" />
                      <span>{buttonText}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between no-print">
              <h2 className="text-lg font-bold">{outputTitle}</h2>
              <div className="flex items-center space-x-2">
                {output && (
                  <>
                    {!isReadmeArchitect && (
                      <button
                        onClick={handlePrint}
                        className={`p-2.5 rounded-xl bg-white border border-slate-200 ${isFeatureArchitect ? 'hover:border-amber-500 hover:text-amber-600' : 'hover:border-emerald-500 hover:text-emerald-600'} transition-all duration-200 flex items-center space-x-2 shadow-sm`}
                      >
                        <Printer size={18} />
                        <span className="text-sm font-semibold">Exporter PDF</span>
                      </button>
                    )}
                    {isReadmeArchitect && (
                      <button
                        onClick={handleDownloadReadme}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                      >
                        <Download size={18} />
                        <span className="text-sm font-semibold">Download README.md</span>
                      </button>
                    )}
                    <button
                      onClick={copyToClipboard}
                      className={`p-2.5 rounded-xl bg-white border border-slate-200 ${isFeatureArchitect ? 'hover:border-amber-500 hover:text-amber-600' : 'hover:border-emerald-500 hover:text-emerald-600'} transition-all duration-200 flex items-center space-x-2 shadow-sm`}
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
                  <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                    {outputTitle}
                  </h1>
                  <p className="text-slate-500 font-mono text-sm mt-1">Généré le {new Date().toLocaleDateString('fr-FR')} • AI Toolkit v1.0</p>
                </div>
                <div className={`${themeBg} text-white p-4 rounded-2xl font-black text-xl`}>
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
                  <p className="text-sm font-semibold text-slate-700">
                    {toolId === 'legal-analyzer' ? 'Audit Juridique & Conformité Web' :
                     toolId === 'tech-stack-modernizer' ? 'Analyse & Modernisation de Stack' :
                     tool.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] min-h-[500px] shadow-sm overflow-hidden report-container relative">
              {output ? (
                <div className={`p-8 ${isFeatureArchitect ? '' : isReadmeArchitect ? '' : `prose ${themeProse} max-w-none prose-headings:font-bold prose-p:text-slate-600 prose-table:border prose-table:rounded-xl prose-th:bg-slate-50 prose-th:p-3 prose-td:p-3 prose-pre:p-0 prose-pre:bg-transparent ${themePre}`}`}>
                  {isFeatureArchitect ? (
                    <SpecRenderer content={output} />
                  ) : isReadmeArchitect ? (
                    <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800 leading-relaxed">{output}</pre>
                  ) : isDockerCompose ? (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        pre: ({children}) => <pre className="my-4 overflow-x-auto">{children}</pre>,
                        code: ({node, inline, className, children, ...props}: any) => {
                          return !inline 
                            ? <code className="block bg-slate-900 text-slate-100 p-4 rounded-lg text-sm font-mono whitespace-pre" {...props}>{children}</code>
                            : <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
                        }
                      }}
                    >
                      {output}
                    </ReactMarkdown>
                  ) : (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        pre: ({children}) => <>{children}</>,
                        code: ({node, inline, className, children, ...props}: any) => {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline 
                            ? <div className="not-prose relative my-8 overflow-hidden rounded-2xl border border-slate-800 shadow-xl">
                                <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-800">
                                  <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                    {match ? match[1].toUpperCase() : 'PREVIEW'}
                                  </span>
                                </div>
                                <code className="relative block bg-[#0d1117] text-[#e6edf3] p-6 text-[13px] font-mono overflow-x-auto whitespace-pre leading-relaxed" {...props}>
                                  {children}
                                </code>
                              </div>
                            : <code className="bg-slate-100 text-emerald-700 px-1.5 py-0.5 rounded-md text-[12px] font-mono border border-slate-200 font-bold" {...props}>
                                {children}
                              </code>
                        }
                      }}
                    >
                      {output}
                    </ReactMarkdown>
                  )}
                </div>
              ) : (
                <div className="h-[500px] flex items-center justify-center text-slate-400 no-print">
                  <div className="text-center px-8">
                    <div className="relative inline-block mb-6">
                      <IconComponent size={64} className="mx-auto opacity-20" />
                      <div className={`absolute inset-0 ${isFeatureArchitect ? 'bg-amber-500/10' : 'bg-emerald-500/10'} blur-2xl rounded-full`}></div>
                    </div>
                    <h3 className="text-slate-600 font-bold text-lg mb-2">{emptyStateTitle}</h3>
                    <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                      {emptyStateDesc}
                    </p>
                  </div>
                </div>
              )}

              {/* Print Footer */}
              <div className="print-only mt-12 pt-8 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex justify-between uppercase tracking-widest">
                <span>Certifié par ToolsWithAI Analyzer</span>
                <span>Page 1 / 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}