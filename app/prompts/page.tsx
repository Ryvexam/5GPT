"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';
import { PromptShowing } from '@/app/components/PromptShowing';

export default function PromptsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-20">
      
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-emerald-600" size={32} />
          L'Art du Prompt Engineering
        </h2>
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

                    content: `==============================

      "Tu es un expert juridique. Analyse ce site web et indique s'il respecte les obligations RGPD et LCEN."

      ==============================` 

                  },

                  {

                    id: 'v1',

                    version: 'v1 - API Integrated',

                    title: 'Extraction SIRET & API Gouv',

                    type: 'integrated',

                    note: 'Ajout de l\'identification et de l\'extraction SIRET via API',

                    content: `==============================

      Tu es un expert juridique. Analyse ce site web. Ton premier rôle est d'extraire le SIRET ou SIREN présent. On te fournit également les données officielles de l'entreprise issues de l'API Gouv. 

                    

      Compare l'activité déclarée sur le site avec l'activité officielle enregistrée. Liste les documents obligatoires (Mentions Légales, CGU, CGV) et indique pour chacun s'il est conforme à la loi LCEN. Donne un verdict final basé sur la présence du SIRET et de l'hébergeur.

      ==============================` 

                  },

                  {

                    id: 'vFinal',

                    version: 'vFinal - Agentic & Conditional',

                    title: 'Audit profond & Raisonnement nuancé',

                    type: 'final',

                    note: 'Prompt complet utilisé par le moteur d\'audit',

                    content: `==============================

      Tu es un expert en droit numérique, RGPD et conformité web (expertises LCEN et RGPD). Ton rôle est d'analyser une entité à travers son site web.

      

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

         - Activity officielle (API GOUV) : Analyse CHAQUE SIRET/SIREN trouvé et indique son activité officielle.

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

      

      IMPORTANT : Ne sois pas agressif sur la fraude pour un simple portfolio de développeur. Si c'est un portfolio sans vente de service direct, le verdict peut être CONFORME même sans SIRET si l'hébergeur est mentionné.

      ==============================`

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

                      content: `==============================

      "Tu es un chef de projet. Rédige une spécification pour cette fonctionnalité : {userContent}"

      ==============================`

                    },

                    {

                      id: 'v1',

                      version: 'v1 - Technical Focus',

                      title: 'Ajout du prisme technique',

                      type: 'integrated',

                      note: 'Introduction des impacts base de données et API',

                      content: `==============================

      Tu es un Lead Tech. Pour la fonctionnalité suivante, liste les besoins fonctionnels et indique les impacts sur la base de données et les endpoints API à créer. 

                      

      Fonctionnalité : {userContent}

      ==============================`

                    },

                    {

                      id: 'vFinal',

                      version: 'vFinal - PM/Tech Hybrid',

                      title: 'Specification Generator',

                      type: 'final',

                      content: `==============================

      Tu es un Lead Tech Senior et Product Manager expérimenté. 

                      

      Analyse la demande de fonctionnalité suivante : "{userContent}" 

      

      Génère une SPÉCIFICATION TECHNIQUE & FONCTIONNELLE structurée :

      

      1. 📝 USER STORIES (Format Gherkin) :

         - Scénarios nominaux (Happy Path)

         - Cas d'erreurs et Edge cases (très important)

      

      2. 🏗 IMPACT TECHNIQUE (Le "Hidden Work") :

         - Modifications DB (Nouveaux champs/tables ?)

         - API Endpoints (À créer/modifier)

         - Front-end (Composants impactés)

         - Sécurité/Perf (Points de vigilance)

      

      3. ⏱ ESTIMATION & COMPLEXITÉ :

         - Découpage en sous-tâches

         - T-Shirt Sizing global (S/M/L/XL)

         - Points de complexité estimés

      ==============================`

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

                    content: `==============================

      "Tu es un expert en tech. Analyse ce code et dis-moi quelles technos sont vieilles et par quoi les remplacer."

      ==============================` 

                  },

                  {

                    id: 'v1',

                    version: 'v1 - Few-shot',

                    title: 'Apprentissage par l\'exemple',

                    type: 'integrated',

                    note: 'Ajout d\'exemples concrets de migration Legacy vers Modern',

                    content: `==============================

      Tu es un expert en architecture. Voici des exemples de modernisation : 

      - jQuery -> React

      - PHP -> Next.js

      - CSS Inline -> Tailwind

      

      Analyse le contenu suivant et propose une stack cible moderne pour chaque élément identifié.

      ==============================` 

                  },

                  {

                    id: 'vFinal',

                    version: 'vFinal - CoT & Structured',

                    title: 'Plan de Migration Complet',

                    type: 'final',

                    note: 'Technique Chain of Thought pour un plan d\'action détaillé',

                    content: `==============================

      Tu es un expert en architecture logicielle et modernisation de stack (Legacy to Modern). Ton rôle est d'analyser une stack technique et de proposer une stratégie de modernisation.

      

      Voici des exemples de modernisation (Few-shot) : 

      - Legacy : jQuery + PHP direct -> Modern : Next.js + API Routes + Tailwind

      - Legacy : CSS local/inline -> Modern : Tailwind CSS ou CSS Modules

      - Legacy : REST API simple -> Modern : GraphQL ou tRPC avec validation Zod

      

      Pour chaque technologie identifiée dans le contenu fourni (code, package.json ou URL) :

      1. 🛠 STACK ACTUELLE : Identifie les technos legacy.

      2. 🚀 CIBLE MODERNE : Propose la techno de remplacement standard en 2026.

      3. 📋 PLAN DE MIGRATION : Utilise la méthode 'Chain of Thought' pour détailler les étapes de migration.

      4. 💡 GAINS ATTENDUS : Performance, DX (Developer Experience), et SEO.

      

      Sois très précis techniquement.

      ==============================`

                  }

                ]}

              />

            </section>

      

            {/* README Architect */}

            <section id="readme-architect">

              <div className="mb-6">

                <h3 className="text-2xl font-bold text-slate-800">4. README Architect</h3>

                <p className="text-slate-500">Technique : <span className="font-semibold text-emerald-600">Task Decomposition + Contextual Grounding</span></p>

              </div>

              <PromptShowing 

                prompts={[ 

                  {

                    id: 'v0',

                    version: 'v0 - Basic',

                    title: 'Rédaction simple',

                    type: 'basic',

                    content: `==============================

      "Tu es un Technical Writer. Rédige un fichier README.md professionnel à partir de ce code ou de cette description. Inclus : Titre, Badges, Installation, Usage, et Contribution. Sois clair et concis."

      ==============================` 

                  },

                  {

                    id: 'v1',

                    version: 'v1 - Structured Template',

                    title: 'Imposition de Structure',

                    type: 'integrated',

                    note: 'Définition stricte des sections requises et du ton "DevRel" pour maximiser l\'attractivité.',

                    content: `==============================

      "Agis comme un Lead Dev Rel. Je vais te donner du code. Tu dois générer un README.md structuré ainsi :

      - H1: Nom du projet + Slogan

      - Badges (Tech stack)

      - 🚀 Quick Start (Code blocks)

      - 🛠 Tech Stack (Tableau)

      - 🤝 Contributing

      

      Sois concis et utilise des emojis. Le but est de convertir les visiteurs en utilisateurs."

      ==============================`

                  },

                  {

                    id: 'vFinal',

                    version: 'vFinal - Advanced Analysis',

                    title: 'Analyse de Repo & Structuration Profonde',

                    type: 'final',

                    note: 'Décomposition de la tâche pour une analyse précise de la structure de fichiers et des contenus clés.',

                    content: `==============================

      Tu es un expert Technical Writer et Developer Advocate. Ton objectif est de créer un 			exttt{README.md} complet, professionnel et visuellement attrayant pour un projet logiciel.

      

      Tu recevras un résumé de la structure des fichiers et le contenu des fichiers clés (comme package.json, README existant, fichiers de config et code source).

      

      Analyse ces informations pour comprendre :

      1. **Ce que fait le projet** (Proposition de valeur).

      2. **La Stack Technique** (Frameworks, librairies, outils).

      3. **Comment l'installer et le lancer**.

      4. **Les fonctionnalités clés**.

      

      Génère un 			exttt{README.md} au format Markdown (en Anglais par défaut, sauf si le code est clairement francophone) qui inclut :

      - **Titre du Projet** & **Description** (Clair et accrocheur).

      - **Badges** (Tech stack, licence, statut).

      - **Fonctionnalités** (Liste à puces).

      - **Tech Stack** (Icônes/Badges préférés).

      - **Getting Started / Installation** (Commandes étape par étape).

      - **Usage** (Comment utiliser l'app).

      - **Structure du Projet** (Optionnel, si utile).

      - **Contributing** (Guidelines).

      - **Licence**.

      

      Utilise des emojis pour rendre le tout engageant. Formate correctement les blocs de code.

      ==============================`

                  }

                ]}

              />

            </section>

            {/* Docker Compose Generator */}
            <section id="docker-compose">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-800">5. Docker Compose Generator</h3>
                <p className="text-slate-500">Technique : <span className="font-semibold text-cyan-600">Security-First Constraints + Structured Output</span></p>
              </div>
              <PromptShowing 
                prompts={[ 
                  {
                    id: 'v0',
                    version: 'v0 - Basic',
                    title: 'Génération Naïve',
                    type: 'basic',
                    content: `==============================
      "Tu es un expert Docker. Génère un fichier docker-compose.yml pour cette stack : {userContent}"
      ==============================` 
                  },
                  {
                    id: 'v1',
                    version: 'v1 - Best Practices',
                    title: 'Ajout des Bonnes Pratiques',
                    type: 'integrated',
                    note: 'Introduction des variables d\'environnement et des réseaux',
                    content: `==============================
      Tu es un expert DevOps. Génère un docker-compose.yml pour {userContent}.
      
      Assure-toi de :
      - Utiliser un réseau dédié pour l'application.
      - Ne pas exposer les bases de données sur Internet (ports).
      - Utiliser des variables d'environnement pour les mots de passe.
      ==============================`
                  },
                  {
                    id: 'vFinal',
                    version: 'vFinal - Security & Production Ready',
                    title: 'Infrastructure Sécurisée',
                    type: 'final',
                    note: 'Contraintes de sécurité strictes (isolation réseau, exposition minimale) et formatage précis.',
                    content: `==============================
      Tu es un expert DevOps et Docker. Ton rôle est de générer un fichier docker-compose.yml sécurisé et production-ready.

      RÈGLES DE SÉCURITÉ OBLIGATOIRES :
      1. **Réseau interne isolé** : Crée un réseau Docker dédié (ex: app-network) pour la communication inter-services
      2. **Exposition minimale** : SEUL le service web/frontend expose un port vers l'extérieur (ex: ports: "3000:3000")
      3. **Backend protégé** : Les services backend (API, workers) ne doivent PAS avoir de section "ports:" - ils communiquent uniquement via le réseau interne
      4. **Base de données protégée** : Les DB (PostgreSQL, MySQL, MongoDB, Redis) ne doivent JAMAIS exposer de ports. Utilise "expose:" au lieu de "ports:" pour la communication interne uniquement
      5. **Variables d'environnement** : Utilise des variables d'environnement pour les secrets (avec \${VARIABLE} et un fichier .env exemple)

      FORMAT DE RÉPONSE :
      1. **Analyse du besoin** : 1-2 phrases résumant ce que l'utilisateur veut
      2. **docker-compose.yml** : Le fichier complet en un seul bloc de code YAML
      3. **Fichier .env.example** : Template des variables d'environnement (un bloc de code)
      4. **Démarrage** : Les commandes pour lancer (docker compose up -d, etc.)
      ==============================`
                  }
                ]}
              />
            </section>

    </div>
  );
}