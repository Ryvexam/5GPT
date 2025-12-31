'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PromptShowing } from '@/app/components/PromptShowing';

export default function PromptsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12 font-sans">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-600/10">
                <Sparkles size={24} className="text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Bibliothèque de Prompts</h1>
                <p className="text-sm text-slate-500">Historique d'évolution & Versions Finales</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-20">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4">L'Art du Prompt Engineering</h2>
          <p className="text-slate-600">
            Découvrez comment nous sommes passés de simples instructions à des agents spécialisés performants. 
            Chaque outil a subi plusieurs itérations pour atteindre son niveau de précision actuel.
          </p>
        </div>

        {/* Legal Analyzer */}
        <section id="legal-analyzer">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-800">1. Legal Analyzer</h3>
            <p className="text-slate-500">Technique : <span className="font-semibold text-emerald-600">Agentic + Conditional Logic</span></p>
          </div>
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
                content: '"Tu es un expert juridique. Analyse ce site web. Ton premier rôle est d\'extraire le SIRET ou SIREN présent. On te fournit également les données officielles de l\'entreprise issues de l\'API Gouv. 
                
Compare l\'activité déclarée sur le site avec l\'activité officielle enregistrée. Liste les documents obligatoires (Mentions Légales, CGU, CGV) et indique pour chacun s\'il est conforme à la loi LCEN. Donne un verdict final basé sur la présence du SIRET et de l\'hébergeur."' 
              },
              {
                id: 'vFinal',
                version: 'vFinal - Agentic & Conditional',
                title: 'Audit profond & Raisonnement nuancé',
                type: 'final',
                note: 'Prompt complet utilisé par le moteur d\'audit',
                content: 'Tu es un expert en droit numérique, RGPD et conformité web (expertises LCEN et RGPD). Ton rôle est d\'analyser une entité à travers son site web.

On t\'a fourni le contenu de la page d\'accueil ET potentiellement des pages légales trouvées (Mentions Légales, CGU, CGV, Politique de Confidentialité).

Analyse l\'ensemble et génère un RAPPORT DE CONFORMITÉ STRUCTURÉ :

1. 🔗 PAGES ANALYSÉES : Liste les URLs que tu as analysées.

2. 🚩 RAPPEL DES RISQUES : Un court paragraphe percutant sur les risques (amendes, sanctions pénales).

3. 📊 IDENTIFICATION DE L\'ENTITÉ : Présente les informations suivantes UNIQUEMENT sous forme d\'un tableau Markdown.
| Champ | Valeur |
| :--- | :--- |
| Nom de l\'entreprise / Entité | ... |
| SIRET / Siren | (Liste tous les numéros trouvés ou \'Non requis (Portfolio personnel)\') |
| Responsable de publication | ... |
| Hébergeur | ... |
| Localisation serveur | ... |
| Contact | ... |

4. 🏢 ANALYSE DE L\'ACTIVITÉ :
   - Type de site : Détermine s\'il s\'agit d\'un site professionnel ou non-professionnel.
   - Activité déduite du site : Décris brièvement l\'activité identifiée.
   - Activité officielle (API GOUV) : Analyse CHAQUE SIRET/SIREN trouvé et indique son activité officielle.
   - Verdict de cohérence : Compare l\'activité réelle et les objets sociaux trouvés.
     - Si c\'est un portfolio personnel/étudiant : Précise que le SIRET n\'est pas requis.
     - Si c\'est un site commercial SANS SIRET : Signale le manquement comme non-conforme.
     - Si les activités sont totalement opposées : Indique \'🚨 POSSIBLE FRAUDE OU ACTIVITÉ ILLÉGALE\'.
   - Risques associés : Liste les risques spécifiques si nécessaire.
   - Note sur le SIRET : Rappelle la règle (Requis pour toute vente pro, Non requis pour usage personnel).

5. 🔍 AUDIT DES DOCUMENTS : Analyse les contenus extraits et indique \'PRÉSENT ✅\' ou \'ABSENT ❌\':
   - Mentions Légales, CGU, CGV, Politique de Confidentialité, Gestion des Cookies.

6. ⚠️ CLAUSES & MANQUEMENTS : Liste les points de non-conformité.

7. ⚖️ VERDICT FINAL : \'CONFORME ✅\', \'PARTIELLEMENT CONFORME ⚠️\' ou \'NON CONFORME ❌\'.

IMPORTANT : Ne sois pas agressif sur la fraude pour un simple portfolio de développeur. Si c\'est un portfolio sans vente de service direct, le verdict peut être CONFORME même sans SIRET si l\'hébergeur est mentionné.'
              }
            ]}
          />
        </section>

        {/* Feature Smith */}
        <section id="feature-smith">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-800">2. Feature Smith & Estimator</h3>
            <p className="text-slate-500">Technique : <span className="font-semibold text-amber-600">Structured Prompting + Role Playing</span></p>
          </div>
          <PromptShowing 
              prompts={[ 
                {
                  id: 'v0',
                  version: 'v0 - Basic',
                  title: 'Demande simple',
                  type: 'basic',
                  content: '"Tu es un chef de projet. Rédige une spécification pour cette fonctionnalité : {userContent}"'
                },
                {
                  id: 'v1',
                  version: 'v1 - Technical Focus',
                  title: 'Ajout du prisme technique',
                  type: 'integrated',
                  note: 'Introduction des impacts base de données et API',
                  content: '"Tu es un Lead Tech. Pour la fonctionnalité suivante, liste les besoins fonctionnels et indique les impacts sur la base de données et les endpoints API à créer. 
                  
Fonctionnalité : {userContent}"'
                },
                {
                  id: 'vFinal',
                  version: 'vFinal - PM/Tech Hybrid',
                  title: 'Specification Generator',
                  type: 'final',
                  content: 'Tu es un Lead Tech Senior et Product Manager expérimenté. 
                  
Analyse la demande de fonctionnalité suivante : "{userContent}" 

Génère une SPÉCIFICATION TECHNIQUE & FONCTIONNELLE structurée :

1. 📝 USER STORIES (Format Gherkin) :
   - Scénarios nominaux (Happy Path)
   - Cas d\'erreurs et Edge cases (très important)

2. 🏗 IMPACT TECHNIQUE (Le "Hidden Work") :
   - Modifications DB (Nouveaux champs/tables ?)
   - API Endpoints (À créer/modifier)
   - Front-end (Composants impactés)
   - Sécurité/Perf (Points de vigilance)

3. ⏱ ESTIMATION & COMPLEXITÉ :
   - Découpage en sous-tâches
   - T-Shirt Sizing global (S/M/L/XL)
   - Points de complexité estimés'
                }
              ]}
            />
        </section>

        {/* Tech Stack Modernizer */}
        <section id="tech-stack">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-800">3. Tech Stack Modernizer</h3>
            <p className="text-slate-500">Technique : <span className="font-semibold text-indigo-600">Few-shot + Chain of Thought</span></p>
          </div>
          <PromptShowing 
            prompts={[ 
              {
                id: 'v0',
                version: 'v0 - Basic',
                title: 'Analyse simple',
                type: 'basic',
                content: '"Tu es un expert en tech. Analyse ce code et dis-moi quelles technos sont vieilles et par quoi les remplacer."' 
              },
              {
                id: 'v1',
                version: 'v1 - Few-shot',
                title: 'Apprentissage par l\'exemple',
                type: 'integrated',
                note: 'Ajout d\'exemples concrets de migration Legacy vers Modern',
                content: '"Tu es un expert en architecture. Voici des exemples de modernisation : 
- jQuery -> React
- PHP -> Next.js
- CSS Inline -> Tailwind

Analyse le contenu suivant et propose une stack cible moderne pour chaque élément identifié."' 
              },
              {
                id: 'vFinal',
                version: 'vFinal - CoT & Structured',
                title: 'Plan de Migration Complet',
                type: 'final',
                note: 'Technique Chain of Thought pour un plan d\'action détaillé',
                content: 'Tu es un expert en architecture logicielle et modernisation de stack (Legacy to Modern). Ton rôle est d\'analyser une stack technique et de proposer une stratégie de modernisation.

Voici des exemples de modernisation (Few-shot) : 
- Legacy : jQuery + PHP direct -> Modern : Next.js + API Routes + Tailwind
- Legacy : CSS local/inline -> Modern : Tailwind CSS ou CSS Modules
- Legacy : REST API simple -> Modern : GraphQL ou tRPC avec validation Zod

Pour chaque technologie identifiée dans le contenu fourni (code, package.json ou URL) :
1. 🛠 STACK ACTUELLE : Identifie les technos legacy.
2. 🚀 CIBLE MODERNE : Propose la techno de remplacement standard en 2026.
3. 📋 PLAN DE MIGRATION : Utilise la méthode \'Chain of Thought\' pour détailler les étapes de migration.
4. 💡 GAINS ATTENDUS : Performance, DX (Developer Experience), et SEO.

Sois très précis techniquement.'
              }
            ]}
          />
        </section>

      </div>
    </div>
  );
}
