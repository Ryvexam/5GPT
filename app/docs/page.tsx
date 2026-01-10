"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ShieldCheck, Code2, FileText, ListTodo, Container } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <article className="prose prose-indigo max-w-none bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-sm border border-slate-200">
        
        <div className="flex items-center justify-between mb-8 not-prose">
          <span className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
            Architecture Overview
          </span>
          <Link href="/prompts" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 hover:underline transition-colors flex items-center gap-2">
            Voir la bibliothèque de Prompts <ArrowLeft className="rotate-180" size={14} />
          </Link>
        </div>

        <h1>ToolsWithAI</h1>
        <p className="lead text-xl text-slate-600">
          Ce projet n'est pas une simple collection d'outils, mais une démonstration d'architecture IA modulaire. 
          Chaque outil répond à un besoin critique du cycle de vie logiciel en utilisant une stratégie de prompting spécifique.
        </p>

        <hr className="my-12 border-slate-100" />

        <h2>1. Cartographie des Outils</h2>
        <p>
          Nous avons sélectionné 5 outils couvrant le cycle de vie complet d'un projet web moderne :
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl"><ShieldCheck size={20}/></div>
            <div>
              <h4 className="font-bold text-slate-900">Legal Analyzer</h4>
              <p className="text-xs text-slate-500 mt-1">Conformité RGPD/LCEN via API Gouv.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl"><Code2 size={20}/></div>
            <div>
              <h4 className="font-bold text-slate-900">Tech Stack Modernizer</h4>
              <p className="text-xs text-slate-500 mt-1">Migration Legacy vers Modern.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl"><ListTodo size={20}/></div>
            <div>
              <h4 className="font-bold text-slate-900">Feature Smith</h4>
              <p className="text-xs text-slate-500 mt-1">Spécifications techniques & chiffrage.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl"><FileText size={20}/></div>
            <div>
              <h4 className="font-bold text-slate-900">README Architect</h4>
              <p className="text-xs text-slate-500 mt-1">Documentation professionnelle.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-2 bg-cyan-100 text-cyan-600 rounded-xl"><Container size={20}/></div>
            <div>
              <h4 className="font-bold text-slate-900">Docker Compose Gen</h4>
              <p className="text-xs text-slate-500 mt-1">Infra as Code sécurisée par défaut.</p>
            </div>
          </div>
        </div>

        <h2>2. Stratégies de Prompt Engineering</h2>
        <p>
          Chaque outil implémente une technique spécifique adaptée à sa tâche :
        </p>

        <ul>
          <li>
            <strong>Structured Cross-Verification</strong> (Legal) : Croisement de données multi-sources (Contenu site vs API Gouv) pour détecter les incohérences.
          </li>
          <li>
            <strong>Few-shot + Chain of Thought</strong> (Tech Stack) : Utilisation d'exemples concrets (Legacy &rarr; Modern) pour guider le raisonnement architectural.
          </li>
          <li>
            <strong>Role Playing + Constraints</strong> (Feature Smith) : L'IA adopte un double rôle (PM + Lead Tech) pour couvrir à la fois le fonctionnel et le technique.
          </li>
          <li>
            <strong>Task Decomposition + Contextual Grounding</strong> (README Architect) : Séparation de l'analyse (fichiers, structure) et de la génération pour produire une documentation précise et ancrée dans le code réel.
          </li>
          <li>
            <strong>Security-First Constraints + Structured Output</strong> (Docker Compose Gen) : Injection forcée de règles de sécurité (réseaux isolés, ports limités) et formatage strict pour une utilisation directe en production.
          </li>
        </ul>

        <hr className="my-12 border-slate-100" />

        <h2>3. Orchestration des Modèles</h2>
        <p>
          Le projet utilise un routeur intelligent pour sélectionner le modèle le plus performant pour chaque tâche :
        </p>
        <ul>
          <li><strong>Mistral (Codestral / Large)</strong> : Privilégié pour les tâches de génération de code (React, README) grâce à sa fenêtre de contexte et sa spécialisation syntaxique.</li>
          <li><strong>OpenAI (GPT-4o / GPT-5)</strong> : Utilisé pour les tâches nécessitant un fort raisonnement logique ("Reasoning") comme l'analyse légale et la détection d'ambiguïtés dans les specs.</li>
        </ul>

        <h2>4. Limites Actuelles</h2>
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 not-prose">
          <h3 className="text-rose-800 font-bold mb-2 text-lg">Points de vigilance</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-rose-700">
            <li><strong>Context Window</strong> : L'analyse légale est tronquée à 15k tokens, ce qui peut exclure le footer de très longues pages.</li>
            <li><strong>Hallucinations Juridiques</strong> : L'outil légal est une aide à la décision, pas un avocat. Il peut manquer des jurisprudences récentes.</li>
            <li><strong>Validation de Code</strong> : Le code suggéré est syntaxiquement correct mais n'est pas testé dans un runtime réel par l'IA.</li>
          </ul>
        </div>

        <hr className="my-12 border-slate-100" />

        <h2>5. Rapports de Projet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Link href="/docs/security" className="group block p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-lg hover:border-rose-200 transition-all">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Analyse de Sécurité</h3>
            <p className="text-sm text-slate-500">Audit complet des vulnérabilités et risques d'injection.</p>
          </Link>

          <Link href="/docs/test-results" className="group block p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-lg hover:border-emerald-200 transition-all">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ListTodo size={20} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Résultats des Tests</h3>
            <p className="text-sm text-slate-500">Preuves d'exécution et validation des protections.</p>
          </Link>

          <Link href="/docs/implementation-guide" className="group block p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-lg hover:border-blue-200 transition-all">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen size={20} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Suggestions de correctifs</h3>
            <p className="text-sm text-slate-500">Timeline et détails techniques des correctifs de sécurité recommandés.</p>
          </Link>
        </div>

      </article>
    </div>
  );
}
