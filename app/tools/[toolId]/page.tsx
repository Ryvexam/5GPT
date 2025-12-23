'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Code2,
  Container,
  Search,
  FileText,
  ShieldCheck,
  BookOpen,
  ArrowLeft,
  Loader2,
  Copy,
  Check,
  AlertTriangle,
  Printer
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PromptShowing } from '@/app/components/PromptShowing';

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

  if (toolId === 'technical-documentation') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-12">
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
              overflow: visible !important;
              border-radius: 0 !important;
            }
            .report-header {
              margin-bottom: 30px;
              border-bottom: 2px solid #4f46e5;
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
                  <div className="p-2 rounded-lg bg-indigo-600/10">
                    <IconComponent size={24} className="text-indigo-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">{tool.name}</h1>
                    <p className="text-sm text-slate-600">Audit du Projet 5GPT</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePrint}
                className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-indigo-200"
              >
                <Printer size={18} />
                <span className="text-sm font-semibold">Exporter la Doc en PDF</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Print Header */}
          <div className="print-only report-header">
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Documentation Technique du Projet 5GPT</h1>
            <p className="text-slate-500 font-mono text-sm mt-1">Analyse du Processus de Prompt Engineering • 2026</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden report-container prose prose-indigo max-w-none p-8 sm:p-12">
            <h1>Notre Processus de Développement</h1>
            <p className="lead">
              Cette page détaille la conception stratégique de nos outils d'IA, le choix des modèles et les techniques de prompt engineering utilisées pour maximiser la pertinence des résultats.
            </p>

            <h2>1. Pourquoi ces outils ?</h2>
            <p>
              Nous avons sélectionné 5 outils couvrant le cycle de vie complet d'un projet web :
            </p>
            <ul>
              <li><strong>Is the website compliant?</strong> : Pour la conformité légale et la sécurité RGPD/LCEN via l'API Recherche d'entreprises.</li>
              <li><strong>Unit Test Generator</strong> : Pour réduire la dette technique dès la phase de code.</li>
              <li><strong>Smart Dockerizer</strong> : Pour automatiser et optimiser le déploiement (DevOps).</li>
              <li><strong>Log Deep Analyzer</strong> : Pour le monitoring et la résolution d'incidents critiques (Debug).</li>
              <li><strong>README Architect</strong> : Pour garantir une documentation projet de qualité professionnelle.</li>
            </ul>

            <hr className="my-12" />

            <h2>2. Méthodologie de Prompt Engineering</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-12">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Is the website compliant?</h3>
                <p className="text-sm text-slate-600 mb-4">Technique : <strong>Persona + Structured Cross-Verification</strong></p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  L'IA adopte la posture d'un expert juridique. Le prompt utilise une structure d'audit multicritères pour croiser les informations extraites du site avec les données officielles, permettant de valider la cohérence entre l'activité réelle et déclarée.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Unit Test Generator</h3>
                <p className="text-sm text-slate-600 mb-4">Technique : <strong>Persona + Zero-shot</strong></p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  L'IA adopte le rôle d'un expert QA. Nous avons itéré pour forcer la couverture des "edge cases" (cas limites), souvent oubliés par les générateurs basiques.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Smart Dockerizer</h3>
                <p className="text-sm text-slate-600 mb-4">Technique : <strong>Few-shot / Optimization</strong></p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Nous avons ajouté des contraintes strictes sur le "multi-stage build" pour garantir des images de production légères et sécurisées.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Log Deep Analyzer</h3>
                <p className="text-sm text-slate-600 mb-4">Technique : <strong>Chain of Thought (CoT)</strong></p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Le prompt impose une analyse séquentielle : identification du service, cause racine, puis solution. Cela évite les conclusions hâtives sur des logs complexes.
                </p>
              </div>
            </div>

            <hr className="my-12" />

            <h2>3. Focus : Architecture du Prompt d'Audit</h2>
            <p>
              L'outil <strong>Is the website compliant?</strong> utilise une technique de <strong>Multi-Contextual Prompting</strong>. Le prompt est conçu pour traiter trois flux d'informations simultanés au sein d'un bloc unique :
            </p>
            
            <div className="not-prose bg-emerald-50 rounded-[2rem] border border-emerald-100 p-8 mb-12 shadow-inner">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">1</div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Ingestion de Contextes Multiples</h4>
                    <p className="text-sm text-emerald-800/80 leading-relaxed">Le prompt reçoit un bloc de données structuré contenant à la fois le contenu textuel de la page d'accueil et des pages légales. L'IA segmenter ces informations pour identifier les incohérences entre les différentes sections du site.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 border-t border-emerald-200/50 pt-8">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">2</div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Cross-Verification (Audit Croisé)</h4>
                    <p className="text-sm text-emerald-800/80 leading-relaxed">L'instruction impose à l'IA de confronter les données officielles (issues de l'API Gouv) avec le discours marketing du site via une technique de "Chain of Verification" systématique.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border-t border-emerald-200/50 pt-8">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">3</div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Raisonnement Conditionnel (Pro vs Perso)</h4>
                    <p className="text-sm text-emerald-800/80 leading-relaxed">Le prompt intègre des arbres de décision : détection du profil "portfolio" pour basculer sur un référentiel de conformité allégé et éviter les faux positifs.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3>Évolution du Prompt System</h3>
            <PromptShowing 
              prompts={[
                {
                  id: 'v0',
                  version: 'v0 - Basic',
                  title: 'Instruction Légale Simple',
                  type: 'basic',
                  content: '"Tu es un expert juridique. Analyse ce site web et indique s\'il respecte les obligations RGPD et LCEN."'
                },
                {
                  id: 'v1',
                  version: 'v1 - API Integrated',
                  title: 'Extraction SIRET & API Gouv',
                  type: 'integrated',
                  note: 'Ajout de l\'identification et de l\'extraction SIRET via API',
                  content: `"Tu es un expert juridique. Analyse ce site web. Ton premier rôle est d'extraire le SIRET ou SIREN présent. On te fournit également les données officielles de l'entreprise issues de l'API Gouv.
                  
Compare l'activité déclarée sur le site avec l'activité officielle enregistrée. Liste les documents obligatoires (Mentions Légales, CGU, CGV) et indique pour chacun s'il est conforme à la loi LCEN. Donne un verdict final basé sur la présence du SIRET et de l'hébergeur."`
                },
                {
                  id: 'vFinal',
                  version: 'vFinal - Agentic & Conditional',
                  title: 'Audit profond & Raisonnement nuancé',
                  type: 'final',
                  note: 'Prompt complet utilisé par le moteur d\'audit',
                  content: `Tu es un expert en droit numérique, RGPD et conformité web (expertises LCEN et RGPD). Ton rôle est d'analyser une entité à travers son site web.

On t'a fourni le contenu de la page d'accueil ET potentiellement des pages légales trouvées (Mentions Légales, CGU, CGV, Politique de Confidentialité).

Analyse l'ensemble et génère un RAPPORT DE CONFORMITÉ STRUCTURÉ :

1. 🔗 PAGES ANALYSÉES : Liste les URLs que tu as analysées.

2. 🚩 RAPPEL DES RISQUES : Un court paragraphe percutant sur les risques (amendes, sanctions pénales).

3. 📊 IDENTIFICATION DE L'ENTITÉ : Présente les informations suivantes UNIQUEMENT sous forme d'un tableau Markdown.
| Champ | Valeur |
| :--- | :--- |
| Nom de l'entreprise / Entité | ... |
| SIRET / Siren | (Liste tous les numéros trouvés ou 'Non requis (Portfolio personnel)') |
| Responsable de publication | ... |
| Hébergeur | ... |
| Localisation serveur | ... |
| Contact | ... |

4. 🏢 ANALYSE DE L'ACTIVITÉ :
   - Type de site : Détermine s'il s'agit d'un site professionnel ou non-professionnel.
   - Activité déduite du site : Décris brièvement l'activité identifiée.
   - Activité officielle (API GOUV) : Analyse CHAQUE SIRET/SIREN trouvé et indique son activité officielle.
   - Verdict de cohérence : Compare l'activité réelle et les objets sociaux trouvés.
     - Si c'est un portfolio personnel/étudiant : Précise que le SIRET n'est pas requis.
     - Si c'est un site commercial SANS SIRET : Signale le manquement comme non-conforme.
     - Si les activités sont totalement opposées : Indique '🚨 POSSIBLE FRAUDE OU ACTIVITÉ ILLÉGALE'.
   - Risques associés : Liste les risques spécifiques si nécessaire.
   - Note sur le SIRET : Rappelle la règle (Requis pour toute vente pro, Non requis pour usage personnel).

5. 🔍 AUDIT DES DOCUMENTS : Analyse les contenus extraits et indique 'PRÉSENT ✅' ou 'ABSENT ❌' :
   - Mentions Légales, CGU, CGV, Politique de Confidentialité, Gestion des Cookies.

6. ⚠️ CLAUSES & MANQUEMENTS : Liste les points de non-conformité.

7. ⚖️ VERDICT FINAL : 'CONFORME ✅', 'PARTIELLEMENT CONFORME ⚠️' ou 'NON CONFORME ❌'.

IMPORTANT : Ne sois pas agressif sur la fraude pour un simple portfolio de développeur. Si c'est un portfolio sans vente de service direct, le verdict peut être CONFORME même sans SIRET si l'hébergeur est mentionné.`
                }
              ]} 
            />

            <hr className="my-12" />

            <h2>4. Choix des Modèles</h2>
            <p>
              Le projet supporte dynamiquement deux fournisseurs pour optimiser les performances :
            </p>
            <ul>
              <li><strong>Mistral (Devstral 2 / Codestral)</strong> : Utilisé prioritairement pour les tâches de <strong>Code</strong> et <strong>Docker</strong> grâce à son entraînement spécifique sur la syntaxe de programmation.</li>
              <li><strong>OpenAI (GPT-5 Chat)</strong> : Privilégié pour l'<strong>Analyse Légale</strong> et les <strong>Logs</strong> complexes pour sa capacité de raisonnement contextuel supérieure.</li>
            </ul>

            <h2>5. Limites de l'approche</h2>
            <ul>
              <li><strong>Context Window</strong> : L'extraction HTML pour l'analyse légale est limitée à 15 000 caractères pour rester dans les limites des modèles gratuits.</li>
              <li><strong>Validation</strong> : L'IA suggère des tests et des Dockerfiles mais ne peut pas les exécuter pour validation finale.</li>
              <li><strong>Conseil Juridique</strong> : L'outil légal est un outil d'aide à la décision et ne remplace pas un audit par un avocat spécialisé.</li>
            </ul>

            {/* Print Footer */}
            <div className="print-only mt-12 pt-8 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex justify-between uppercase tracking-widest">
              <span>Certifié par l'équipe projet 5GPT</span>
              <span>Document Technique Officiel</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12">
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
                Le non-respect de la <strong>LCEN</strong> ou du <strong>RGPD</strong> peut entraîner des sanctions allant jusqu'à <strong>20 millions d'euros</strong>. Notre IA vérifie désormais la correspondance entre votre SIRET et votre activité réelle via l'API Recherche d'entreprises.
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


