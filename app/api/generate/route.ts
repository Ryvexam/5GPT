import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPTS = {
  'docker-compose-generator': `Tu es un expert DevOps et Docker. Ton rôle est de générer un fichier docker-compose.yml sécurisé et production-ready.

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

RÈGLES DE FORMATAGE :
- Utilise des blocs de code UNIQUEMENT pour le docker-compose.yml, le .env.example et les commandes shell
- N'utilise PAS de backticks pour les noms d'images, ports, ou mots techniques dans le texte
- Écris le texte explicatif en prose normale sans formatage code
- Sois concis et direct

RAPPEL SÉCURITÉ : 
- Jamais de "ports:" sur les DB ou backends
- Utilise "expose:" pour les ports internes
- Un seul réseau bridge pour isoler les services
- Volumes persistants pour les données
- Images officielles avec versions précises (pas de :latest)`,
  'tech-stack-modernizer': "Tu es un expert en architecture logicielle et modernisation de stack (Legacy to Modern). Ton rôle est d'analyser une stack technique et de proposer une stratégie de modernisation.\n\nVoici des exemples de modernisation (Few-shot) :\n- Legacy : jQuery + PHP direct -> Modern : Next.js + API Routes + Tailwind\n- Legacy : CSS local/inline -> Modern : Tailwind CSS ou CSS Modules\n- Legacy : REST API simple -> Modern : GraphQL ou tRPC avec validation Zod\n\nATTENTION : Si on te fournit des INDICATEURS TECHNIQUES DÉTECTÉS (issus de l'analyse du HTML), utilise-les en PRIORITÉ pour identifier la stack actuelle. Ces indicateurs sont plus fiables que le contenu texte seul.\n\nGÉNÈRE UN RAPPORT STRUCTURÉ EN MARKDOWN avec les sections suivantes (formatage adapté pour PDF) :\n\n# RAPPORT D'ANALYSE TECH STACK\n\n## 1. 🔗 PAGES CONSULTÉES\n\nSi des pages ont été analysées (URL fournie), liste-les ici :\n- [URL de la page analysée]\n\n## 2. 📊 STACK ACTUELLE DÉTECTÉE\n\nPrésente la stack sous forme de tableau Markdown :\n\n| Composant | Technologie Détectée | Version/Note |\n| :--- | :--- | :--- |\n| Framework Frontend | ... | ... |\n| Langage | ... | ... |\n| CSS Framework | ... | ... |\n| Build Tool | ... | ... |\n| Autres | ... | ... |\n\n## 3. ⚖️ VERDICT\n\n**IMPORTANT - CAS D'UNE STACK MODERNE :**\nSi la stack détectée est déjà moderne (Next.js, React moderne, Vue 3, Angular moderne, Tailwind CSS, TypeScript, etc.), alors :\n- ✅ **VERDICT : STACK MODERNE - VALIDÉE ✅**\n- Indique clairement que la stack est à jour et moderne\n\n**CAS D'UNE STACK LEGACY :**\nSi la stack détectée est legacy (jQuery, PHP direct, CSS inline, etc.), alors :\n- ⚠️ **VERDICT : STACK LEGACY - MIGRATION RECOMMANDÉE**\n- Indique clairement que la stack nécessite une modernisation\n\n## 4. 🎯 CIBLE MODERNE (UNIQUEMENT SI STACK LEGACY)\n\nSi stack legacy, présente le tableau de migration :\n\n| Composant Actuel | Technologie Recommandée (2026) | Raison |\n| :--- | :--- | :--- |\n| ... | ... | ... |\n\n**N'UTILISE PAS CETTE SECTION SI LA STACK EST MODERNE.**\n\n## 5. 📋 PLAN DE MIGRATION (UNIQUEMENT SI STACK LEGACY)\n\nSi stack legacy, utilise la méthode 'Chain of Thought' pour détailler les étapes :\n\n### Phase 1 : Préparation\n- ...\n\n### Phase 2 : Migration Progressive\n- ...\n\n### Phase 3 : Tests & Validation\n- ...\n\n**N'UTILISE PAS CETTE SECTION SI LA STACK EST MODERNE.**\n\n## 6. 💡 RECOMMANDATIONS\n\n**SI STACK MODERNE :**\n- Liste des optimisations mineures possibles (performance, DX, SEO, etc.)\n- Ou indique 'Stack optimale, aucune action requise'\n\n**SI STACK LEGACY :**\n- Gains attendus : Performance, DX (Developer Experience), SEO, Sécurité\n- Priorités et risques à considérer\n\n## 7. 📈 RÉSUMÉ EXÉCUTIF\n\nUn paragraphe concis résumant l'analyse et les recommandations.\n\n---\n\n**FORMATAGE :** Utilise des emojis, des tableaux Markdown, des listes à puces, et des sections bien structurées. Le rapport doit être lisible et professionnel pour une impression PDF.",
  'feature-architect': "Tu es un Lead Tech Senior et Product Manager expérimenté. Ton objectif est de sécuriser le développement en pensant à tout ce que le développeur a pu oublier.\n\nAnalyse la demande et produis un document de spécification technique complet en Markdown :\n\n# 🏗 SPÉCIFICATION : [Nom de la feature]\n\n## 1. 📝 USER STORIES & SCÉNARIOS\nUtilise le format Gherkin (Given/When/Then) pour :\n- Le Happy Path (cas nominal)\n- Les Edge Cases (erreurs, réseau coupé, droits manquants...)\n\n## 2. ⚙️ ANALYSE D'IMPACT (HIDDEN WORK)\nListe exhaustive des impacts techniques :\n- **Base de données** : Schéma, migrations nécessaires ?\n- **API / Backend** : Nouveaux endpoints, validation, sécurité ?\n- **Frontend** : Nouveaux états, composants, gestion d'erreurs ?\n- **Tiers** : Emails transactionnels, webhooks, jobs asynchrones ?\n\n## 3. 🛡 SÉCURITÉ & PERFORMANCE\nPoints de vigilance spécifiques (ex: Rate limiting, Injection, N+1 queries).\n\n## 4. ⏱ ESTIMATION & DÉCOUPAGE\nDécoupe en tâches techniques atomiques (< 4h) et estime la complexité globale (T-Shirt Sizing : XS/S/M/L/XL) avec une justification.",
  'readme-architect': "Tu es un Technical Writer expert. Génère un README.md professionnel et visuellement attractif.\n\nAnalyse le projet fourni et génère UNIQUEMENT le contenu Markdown brut du README.\n\nSTRUCTURE REQUISE :\n\n1. **Header** : Titre avec emoji + description courte et percutante\n\n2. **Badges** (utilise shields.io) :\n   - Badge de la techno principale (ex: ![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs))\n   - Badge du langage (ex: ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white))\n   - Badge du framework CSS si applicable\n   - Badge de licence\n\n3. **Features** : Liste avec emojis (✨ 🚀 🔒 etc.)\n\n4. **Tech Stack** : Tableau ou badges visuels, PAS une simple liste\n\n5. **Quick Start** :\n   ```bash\n   # Clone\n   # Install\n   # Run\n   ```\n\n6. **Usage** : Comment utiliser l'app\n\n7. **Project Structure** (optionnel si utile)\n\n8. **Contributing** : Guidelines courtes\n\n9. **License**\n\nRÈGLES :\n- N'entoure PAS ta réponse de ```markdown\n- Écris directement le Markdown brut, copiable tel quel\n- Utilise des badges shields.io avec style=for-the-badge\n- Privilégie les tableaux et badges aux listes simples\n- Sois concis mais professionnel\n- Le README doit donner envie de star le repo",
  'legal-analyzer': "Tu es un expert en droit numérique, RGPD et conformité web (expertises LCEN et RGPD). Ton rôle est d'analyser une entité à travers son site web.\n\nOn t'a fourni le contenu de la page d'accueil ET potentiellement des pages légales trouvées (Mentions Légales, CGU, CGV, Politique de Confidentialité).\n\nAnalyse l'ensemble et génère un RAPPORT DE CONFORMITÉ STRUCTURÉ :\n\n1. 🔗 PAGES ANALYSÉES : Liste les URLs que tu as analysées (elles sont fournies au début du contexte sous 'PAGES ANALYSÉES').\n\n2. 🚩 RAPPEL DES RISQUES : Un court paragraphe percutant sur les risques (amendes, sanctions pénales) liés au non-respect de la LCEN et du RGPD.\n\n3. 📊 IDENTIFICATION DE L'ENTITÉ : Présente les informations suivantes UNIQUEMENT sous forme d'un tableau Markdown.\n\n| Champ | Valeur |\n| :--- | :--- |\n| Nom de l'entreprise / Entité | ... |\n| SIRET / Siren | (Liste tous les numéros trouvés ou 'Non requis (Portfolio personnel)') |\n| Responsable de publication | ... |\n| Hébergeur | ... |\n| Localisation serveur | ... |\n| Contact | ... |\n\n4. 🏢 ANALYSE DE L'ACTIVITÉ :\n   - **Type de site** : Détermine s'il s'agit d'un site professionnel (commercial, agence, service payant) ou d'un site non-professionnel (portfolio étudiant, blog personnel, projet open-source sans but lucratif).\n   - **Activité déduite du site** : Décris brièvement l'activité identifiée.\n   - **Activité officielle (API GOUV)** : Analyse CHAQUE SIRET/SIREN trouvé et indique son activité officielle. Si aucun n'est trouvé, indique-le.\n   - **Verdict de cohérence** : Compare l'activité réelle et les objets sociaux trouvés.\n     - Si c'est un portfolio personnel/étudiant : Précise que le SIRET n'est pas requis.\n     - Si c'est un site commercial SANS SIRET : Signale le manquement comme non-conforme.\n     - Si les activités sont totalement opposées (ex: vente de thé vs informatique) : Indique '🚨 POSSIBLE FRAUDE OU ACTIVITÉ ILLÉGALE'.\n   - **Risques associés** : Liste les risques spécifiques si nécessaire.\n   - **Note sur le SIRET** : Rappelle la règle (Requis pour toute vente/service pro, Non requis pour usage personnel).\n\n5. 🔍 AUDIT DES DOCUMENTS : Analyse les contenus extraits et indique 'PRÉSENT ✅' ou 'ABSENT ❌' :\n   - **Mentions Légales**\n   - **CGU**\n   - **CGV** (indispensable si site marchand)\n   - **Politique de Confidentialité / RGPD**\n   - **Gestion des Cookies**\n\n6. ⚠️ CLAUSES & MANQUEMENTS : Liste les points de non-conformité.\n\n7. ⚖️ VERDICT FINAL : 'CONFORME ✅', 'PARTIELLEMENT CONFORME ⚠️' ou 'NON CONFORME ❌'.\n\nIMPORTANT : Ne sois pas agressif sur la fraude pour un simple portfolio. Si c'est un portfolio sans vente de service direct, le verdict peut être CONFORME même sans SIRET si l'hébergeur est mentionné."
};

async function getCompanyData(siret: string) {
  try {
    const response = await fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${siret}&page=1&per_page=1`);
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const company = data.results[0];
        return {
          nom: company.nom_complet || company.nom_raison_sociale,
          activite: company.activite_principale,
          libelle_activite: company.libelle_activite_principale,
          etat: company.etat_administratif === 'A' ? 'Actif' : 'Cessé',
          categorie: company.categorie_entreprise,
          adresse: company.adresse
        };
      }
    }
  } catch (error) {
    console.error('Error fetching company data:', error);
  }
  return null;
}

function extractSirets(text: string): string[] {
  const sirets = new Set<string>();
  
  // Regex pour SIRET (14 chiffres)
  const siretRegex = /\b(\d{3}[\s.]?\d{3}[\s.]?\d{3}[\s.]?\d{5})\b/g;
  let match;
  while ((match = siretRegex.exec(text)) !== null) {
    sirets.add(match[0].replace(/[\s.]/g, ''));
  }
  
  // Regex pour SIREN (9 chiffres) - seulement si pas déjà dans un SIRET
  const sirenRegex = /\b(\d{3}[\s.]?\d{3}[\s.]?\d{3})\b/g;
  while ((match = sirenRegex.exec(text)) !== null) {
    const siren = match[0].replace(/[\s.]/g, '');
    // On ne l'ajoute que si ce n'est pas le début d'un SIRET déjà trouvé
    if (!Array.from(sirets).some(s => s.startsWith(siren))) {
      sirets.add(siren);
    }
  }
  
  return Array.from(sirets);
}

function findLegalLinks(html: string, baseUrl: string): string[] {
  // Regex plus robuste pour capturer les liens même sur plusieurs lignes et avec divers attributs
  const linkRegex = /<a\s+[^>]*?href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const legalLinks: {url: string, score: number}[] = [];
  
  // Liste noire pour éviter de scraper des produits ou des pages inutiles
  const blacklist = [
    '/products/', '/collections/', '/cart', '/account', '/login', 
    '/search', '/checkout', '/category/', '/tag/', '/p/', '/product/'
  ];

  const keywords = [
    { word: 'mention', score: 10 },
    { word: 'légal', score: 10 },
    { word: 'legal', score: 10 },
    { word: 'notice', score: 10 },
    { word: 'policy', score: 10 },
    { word: 'confidentialité', score: 10 },
    { word: 'privacy', score: 10 },
    { word: 'cgu', score: 10 },
    { word: 'cgv', score: 10 },
    { word: 'vente', score: 5 }, // Score réduit pour éviter les faux positifs produits
    { word: 'sale', score: 5 },  // Score réduit
    { word: 'utilisation', score: 5 },
    { word: 'condition', score: 5 },
    { word: 'termes', score: 5 },
    { word: 'terms', score: 5 },
    { word: 'service', score: 5 },
    { word: 'protection', score: 10 },
    { word: 'donnée', score: 5 },
    { word: 'rgpd', score: 10 },
    { word: 'gdpr', score: 10 },
    { word: 'compliance', score: 10 },
    { word: 'cookie', score: 5 }
  ];

  const getMainDomain = (hostname: string) => {
    const parts = hostname.split('.');
    if (parts.length >= 2) return parts.slice(-2).join('.');
    return hostname;
  };

  const baseDomain = new URL(baseUrl).hostname;
  const baseMainDomain = getMainDomain(baseDomain);

  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    const text = match[2].replace(/<[^>]+>/g, ' ').toLowerCase();
    const hrefLower = href.toLowerCase();
    
    // On ignore si l'URL contient un motif de la liste noire
    if (blacklist.some(pattern => hrefLower.includes(pattern))) continue;

    let score = 0;
    keywords.forEach(k => {
      if (hrefLower.includes(k.word) || text.includes(k.word)) {
        score += k.score;
      }
    });

    if (hrefLower.includes('/legal') || hrefLower.includes('/policy') || hrefLower.includes('/policies')) {
      score += 15; // Bonus plus important pour les dossiers légaux
    }

    // Un lien vers une boutique a besoin de plus qu'un simple mot "vente" pour être considéré légal
    if (score > 0) {
      try {
        const absoluteUrl = new URL(href, baseUrl).toString();
        let targetDomain = '';
        try {
          targetDomain = new URL(absoluteUrl).hostname;
        } catch (e) {}

        const targetMainDomain = targetDomain ? getMainDomain(targetDomain) : baseMainDomain;
        
        if (baseMainDomain === targetMainDomain && 
            absoluteUrl !== baseUrl && 
            absoluteUrl !== baseUrl + '/' && 
            baseUrl !== absoluteUrl + '/' &&
            !legalLinks.find(l => l.url === absoluteUrl)) {
          legalLinks.push({ url: absoluteUrl, score });
        }
      } catch (e) { /* ignore */ }
    }
  }

  return legalLinks
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(l => l.url);
}

async function fetchGithubRepo(url: string) {
  try {
    // Extract owner/repo
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return null;
    const owner = match[1];
    const repo = match[2];

    // Get default branch
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!repoRes.ok) return null;
    const repoData = await repoRes.json();
    const branch = repoData.default_branch;

    // Get file tree
    const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`);
    if (!treeRes.ok) return null;
    const treeData = await treeRes.json();

    // Priority files to fetch
    const priorityFiles = [
      'package.json', 'composer.json', 'requirements.txt', 'Gemfile', 'Cargo.toml', 'go.mod', // Deps
      'README.md', 'README.txt', // Docs
      'next.config.js', 'next.config.ts', 'tsconfig.json', 'vite.config.ts', 'webpack.config.js', // Config
      'Dockerfile', 'docker-compose.yml' // Infra
    ];

    // Select files to fetch
    let filesToFetch: any[] = [];
    
    // 1. Priority files
    if (treeData.tree) {
      filesToFetch = treeData.tree
        .filter((f: any) => priorityFiles.includes(f.path.split('/').pop() || ''))
        .slice(0, 5); // Limit priority files

      // 2. Some source files (heuristic: src/ or app/ folder, .ts/.js/.py/.go, not too deep)
      const sourceFiles = treeData.tree
        .filter((f: any) => 
          (f.path.endsWith('.ts') || f.path.endsWith('.tsx') || f.path.endsWith('.js') || f.path.endsWith('.jsx') || f.path.endsWith('.py') || f.path.endsWith('.go') || f.path.endsWith('.rb') || f.path.endsWith('.php')) &&
          !f.path.includes('node_modules') && 
          !f.path.includes('test') &&
          !f.path.includes('.d.ts') &&
          f.type === 'blob' &&
          f.size < 20000 // Skip large files
        )
        .slice(0, 5); // Take 5 random source files

      filesToFetch = [...filesToFetch, ...sourceFiles];
    }

    // Fetch content
    let combinedContent = `GITHUB REPOSITORY: ${owner}/${repo}\n\nFILE STRUCTURE (Top 50):\n`;
    
    // List structure
    if (treeData.tree) {
        combinedContent += treeData.tree
        .filter((f: any) => f.type === 'blob')
        .slice(0, 50)
        .map((f: any) => `- ${f.path}`)
        .join('\n');
    }
    
    combinedContent += '\n\nFILE CONTENTS:\n';

    await Promise.all(filesToFetch.map(async (file: any) => {
      try {
        const contentRes = await fetch(file.url); // GitHub API Blob URL
        if (contentRes.ok) {
          const contentData = await contentRes.json();
          // Content is base64 encoded
          if (contentData.content) {
             // atob might not be available in all edge runtimes, but Node environment usually has Buffer
             // However, next.js edge might rely on atob. 
             // Safest is Buffer for Node, atob for browser/edge. 
             // Let's try Buffer first as this runs on server.
             const content = Buffer.from(contentData.content, 'base64').toString('utf-8');
             combinedContent += `\n--- FILE: ${file.path} ---\n${content.slice(0, 5000)}\n`; 
          }
        }
      } catch (e) {
        console.error(`Error fetching ${file.path}`, e);
      }
    }));

    return combinedContent;

  } catch (e) {
    console.error('Error fetching GitHub repo:', e);
    return null;
  }
}

function detectTechStack(html: string): string {
  const indicators: string[] = [];
  
  // Déclarer hasNextJsStatic au début pour usage global
  const hasNextJsStatic = html.includes('/_next/static/');
  
  // CMS Detection (priorité haute - détecter avant les frameworks)
  
  // Shopify detection
  const hasShopifyContent = html.includes('cdn.shopify.com') || html.includes('shopify.com/s/files/') || 
                            html.includes('Shopify.theme') || html.includes('shopify-section') ||
                            /\/apps\/shopify/.test(html) || html.includes('var Shopify =') ||
                            /shopify.*?\.js/.test(html) || html.includes('myshopify.com');
  
  // WordPress detection
  const hasWordPress = html.includes('/wp-content/') || html.includes('/wp-includes/') || 
                       html.includes('/wp-json/') || html.includes('wp-emoji-release') ||
                       html.includes('WordPress') || /wp-content\/themes\//.test(html) ||
                       html.includes('wp-block-') || html.includes('wp-element-');
  
  // Drupal detection
  const hasDrupal = html.includes('/sites/default/') || html.includes('Drupal.settings') ||
                    html.includes('drupal.js') || html.includes('drupal-base-path') ||
                    html.includes('drupal-static');
  
  // Magento detection
  const hasMagento = html.includes('Mage.Cookies') || html.includes('/static/version') ||
                     html.includes('Magento_') || html.includes('/media/') ||
                     /magento.*?\.js/.test(html);
  
  // PrestaShop detection
  const hasPrestaShop = html.includes('prestashop') || html.includes('PrestaShop') ||
                        html.includes('/themes/') && html.includes('/modules/');
  
  // Wix detection
  const hasWix = html.includes('wix.com') || html.includes('wixstatic.com') ||
                 html.includes('static.wixstatic.com') || html.includes('wix-code-sdk');
  
  // Squarespace detection
  const hasSquarespace = html.includes('squarespace.com') || html.includes('sqs-') ||
                         html.includes('Squarespace') || html.includes('squarespace-static');
  
  // Webflow detection
  const hasWebflow = html.includes('webflow.com') || html.includes('webflow.css') || 
                     html.includes('data-wf-page') || html.includes('data-wf-site');
  
  // Framer detection
  const hasFramer = html.includes('framer.com') || html.includes('framerusercontent.com') ||
                    html.includes('data-framer-component-type');
  
  const hasCMS = hasShopifyContent || hasWordPress || hasDrupal || hasMagento || hasPrestaShop || hasWix || hasSquarespace || hasWebflow || hasFramer;
  
  if (hasShopifyContent) {
    indicators.push('✅ Shopify détecté (CMS e-commerce)');
  } else if (hasWordPress) {
    indicators.push('✅ WordPress détecté (CMS)');
  } else if (hasDrupal) {
    indicators.push('✅ Drupal détecté (CMS)');
  } else if (hasMagento) {
    indicators.push('✅ Magento détecté (CMS e-commerce)');
  } else if (hasPrestaShop) {
    indicators.push('✅ PrestaShop détecté (CMS e-commerce)');
  } else if (hasWix) {
    indicators.push('✅ Wix détecté (CMS No-code)');
  } else if (hasSquarespace) {
    indicators.push('✅ Squarespace détecté (CMS No-code)');
  } else if (hasWebflow) {
    indicators.push('✅ Webflow détecté (CMS No-code)');
  } else if (hasFramer) {
    indicators.push('✅ Framer détecté (CMS No-code)');
  }
  
  // Framework detection (seulement si pas de CMS)
  if (!hasCMS) {
    // Next.js indicators (priorité haute - vérifier en premier si pas de CMS)
    const hasNextJsData = html.includes('__NEXT_DATA__');
    const hasNextJsManifest = /\/_next\/static\/[\w\-]+\/_buildManifest\.js/.test(html);
    const hasNextJsMeta = /<meta[^>]*name=["']next-head["']/.test(html);
    const hasNextJsDataAttr = /data-next-[^=]*=/.test(html);
    
    if (hasNextJsStatic || hasNextJsData || hasNextJsManifest) {
      indicators.push('✅ Next.js détecté (signatures: /_next/static/, __NEXT_DATA__)');
      // Next.js utilise React, donc on ne détecte pas React séparément
    } else {
      // React indicators (seulement si pas Next.js)
      const hasReactDevtools = html.includes('__REACT_DEVTOOLS__');
      const hasReactRoot = /data-reactroot/.test(html);
      const hasReactScript = /react[.\-]?(dom|dom-client)?[.\-]?\d+\.\d+\.\d+.*?\.js/.test(html) || /\/react[.\-]/.test(html);
      const hasReactInScript = /<script[^>]*>[\s\S]*?react[\s\S]*?<\/script>/.test(html.toLowerCase());
      
      if (hasReactDevtools || hasReactRoot || hasReactScript) {
        indicators.push('✅ React détecté');
      } else if (hasReactInScript && html.match(/react-dom|ReactDOM|createElement/i)) {
        indicators.push('✅ React détecté (dans le code)');
      }
    }
  }
  
  // Vue.js indicators (plus précis) - seulement si pas de CMS
  if (!hasCMS) {
    const hasVueDirective = /v-(if|for|bind|model|show|hide)/.test(html);
    const hasVueGlobal = html.includes('__VUE__');
    const hasVueScript = /vue[.\-]?\d+\.\d+\.\d+.*?\.js/.test(html) || /\/vue\.js/.test(html);
    
    if (hasVueDirective || hasVueGlobal || hasVueScript) {
      indicators.push('✅ Vue.js détecté');
    }
  }
  
  // Angular indicators (plus précis - éviter les faux positifs avec "ng-" dans les URLs)
  // Ne pas détecter Angular si on a un CMS ou Next.js
  if (!hasCMS && !hasNextJsStatic) {
    const hasNgApp = /ng-app=["']/.test(html);
    const hasNgController = /ng-controller=["']/.test(html);
    const hasNgDirective = /ng-(if|for|repeat|switch|include)/.test(html);
    const hasAngularScript = /angular[.\-]?\d+\.\d+\.\d+.*?\.js/.test(html) || /\/angular\.js/.test(html);
    const hasAngularModule = /angular\.module\(/.test(html);
    const hasVueDirective = /v-(if|for|bind|model|show|hide)/.test(html);
    
    if (hasNgApp || hasNgController || hasNgDirective || hasAngularModule) {
      indicators.push('✅ Angular détecté');
    } else if (hasAngularScript && !hasVueDirective) {
      indicators.push('✅ Angular détecté (script)');
    }
  }
  
  // Tailwind CSS indicators (classes utilitaires typiques)
  const tailwindClasses = /class=["'][^"']*\b(flex|grid|text-(xs|sm|lg|xl)|bg-(slate|gray|blue|red|green|yellow|purple|pink|indigo|emerald)-\d+|p-[0-9]|m-[0-9]|w-(full|screen|auto)|h-(full|screen|auto)|border-|rounded-(sm|md|lg|xl|full)|shadow-)/.test(html);
  if (tailwindClasses || html.includes('tailwindcss') || html.includes('@tailwind')) {
    indicators.push('✅ Tailwind CSS détecté');
  }
  
  // jQuery indicators (plus précis)
  const hasJQuery = /jquery[.\-]?\d+\.\d+\.\d+.*?\.js/i.test(html) || /\/jquery\.(min\.)?js/i.test(html);
  const hasJQueryInScript = /<script[^>]*>[\s\S]*?\$\s*\(/.test(html) || /jQuery\(/.test(html);
  
  if (hasJQuery || (hasJQueryInScript && !hasNextJsStatic)) {
    indicators.push('✅ jQuery détecté');
  }
  
  // TypeScript indicators (dans les scripts sources)
  const scriptMatches = html.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi) || [];
  const scriptSources = scriptMatches.map(m => {
    const srcMatch = m.match(/src=["']([^"']+)["']/);
    return srcMatch ? srcMatch[1] : '';
  });
  if (scriptSources.some(src => /\.tsx?(\?|$)/.test(src) || src.includes('typescript'))) {
    indicators.push('✅ TypeScript détecté');
  }
  
  // Build tools
  if (/webpack[.\-]?\d+\.\d+.*?\.js/.test(html) || html.includes('webpackChunkName')) {
    indicators.push('✅ Webpack détecté');
  }
  
  // Framework CSS
  if (/bootstrap[.\-]?\d+\.\d+.*?\.css/.test(html) || html.includes('bootstrap.min.css')) {
    indicators.push('✅ Bootstrap détecté');
  }
  if (html.includes('material-ui') || html.includes('mui-') || html.includes('@mui/')) {
    indicators.push('✅ Material-UI détecté');
  }
  
  return indicators.length > 0 
    ? `\n\n🔍 INDICATEURS TECHNIQUES DÉTECTÉS DANS LE HTML :\n${indicators.join('\n')}`
    : '';
}

async function scrapePage(url: string) {
  try {
    const response = await fetch(url, { 
      signal: AbortSignal.timeout(5000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    if (response.ok) {
      const html = await response.text();
      const textContent = html
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/g, "")
        .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/g, "")
        .replace(/<header\b[^>]*>([\s\S]*?)<\/header>/g, "")
        .replace(/<footer\b[^>]*>([\s\S]*?)<\/footer>/g, "") // remove footer in subpages to get core text
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      return { html, text: textContent, finalUrl: response.url };
    }
  } catch (e) {
    console.error(`Failed to scrape ${url}:`, e);
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { toolId, userContent, provider, model, apiKey } = await request.json();

    if (!toolId || !userContent) {
      return NextResponse.json(
        { error: 'Missing toolId or userContent' },
        { status: 400 }
      );
    }

    if (!provider || !model || !apiKey) {
      return NextResponse.json(
        { error: 'Missing AI provider configuration' },
        { status: 400 }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[toolId as keyof typeof SYSTEM_PROMPTS];

    if (!systemPrompt) {
      return NextResponse.json(
        { error: 'Invalid toolId' },
        { status: 400 }
      );
    }

    let finalUserContent = userContent;

    // Special handling for tools that support URLs
    if (toolId === 'readme-architect' && userContent.includes('github.com') && (userContent.startsWith('http://') || userContent.startsWith('https://'))) {
      const repoContent = await fetchGithubRepo(userContent);
      if (repoContent) {
        finalUserContent = repoContent;
      }
    } else if ((toolId === 'legal-analyzer' || toolId === 'tech-stack-modernizer') && 
        (userContent.startsWith('http://') || userContent.startsWith('https://'))) {
      try {
        const homePage = await scrapePage(userContent);
        if (homePage) {
          const baseUrl = homePage.finalUrl || userContent;
          let scrapedUrls = [baseUrl];
          let combinedText = `URL PAGE D'ACCUEIL: ${baseUrl}\n\nCONTENU ACCUEIL:\n${homePage.text.slice(0, 8000)}`;
          
          if (toolId === 'legal-analyzer') {
            // Find and scrape legal pages
            const legalLinks = findLegalLinks(homePage.html, baseUrl);
            for (const link of legalLinks) {
              const page = await scrapePage(link);
              if (page) {
                scrapedUrls.push(link);
                combinedText += `\n\n---\nPAGE LÉGALE TROUVÉE (${link}):\n${page.text.slice(0, 5000)}`;
              }
            }
            combinedText = `PAGES ANALYSÉES:\n${scrapedUrls.map(url => `- ${url}`).join('\n')}\n\n${combinedText}`;
          }
          
          if (toolId === 'tech-stack-modernizer') {
            // Add tech stack detection for modernizer
            const techIndicators = detectTechStack(homePage.html);
            combinedText = `PAGES CONSULTÉES:\n${scrapedUrls.map(url => `- ${url}`).join('\n')}\n\n${combinedText}`;
            combinedText += techIndicators;
          }

          finalUserContent = combinedText;

          if (toolId === 'legal-analyzer') {
            // Try to find all SIRETs and fetch company data for each
            const foundSirets = extractSirets(combinedText);
            
            // Liste des hébergeurs et tiers à ignorer
            const IGNORED_HOSTS = ['OVH', 'IONOS', 'AMAZON', 'HETZNER', 'O2SWITCH', 'SHOPIFY', 'GANDI', 'PLANETHOSTER', 'VERCEL', 'NETLIFY', 'GOOGLE', 'MICROSOFT', 'HOSTINGER', 'CLOUDFLARE'];
            
            let keptSirets = 0;
            // On scanne jusqu'à 6 candidats pour en trouver 3 pertinents (non-hébergeurs)
            const candidates = foundSirets.slice(0, 6);

            if (candidates.length > 0) {
              finalUserContent += `\n\nDONNÉES OFFICIELLES (API GOUV) - FILTRÉES (Max 3 pertinents) :`;
              
              for (const s of candidates) {
                if (keptSirets >= 3) break;

                const companyData = await getCompanyData(s);
                if (companyData) {
                  const nameUpper = (companyData.nom || '').toUpperCase();
                  // Vérifier si c'est un hébergeur connu
                  const isHost = IGNORED_HOSTS.some(host => nameUpper.includes(host));

                  if (!isHost) {
                    finalUserContent += `\n\n- NUMÉRO ${s}:\n${JSON.stringify(companyData, null, 2)}`;
                    keptSirets++;
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to deep scrape:', error);
      }
    } else if (toolId === 'legal-analyzer') {
      // Also try for raw text input
      const foundSirets = extractSirets(userContent);
      if (foundSirets.length > 0) {
        finalUserContent += `\n\nDONNÉES OFFICIELLES (API GOUV) POUR ${foundSirets.length} NUMÉRO(S) TROUVÉ(S):`;
        for (const s of foundSirets) {
          const companyData = await getCompanyData(s);
          if (companyData) {
            finalUserContent += `\n\n- NUMÉRO ${s}:\n${JSON.stringify(companyData, null, 2)}`;
          } else {
            finalUserContent += `\n\n- NUMÉRO ${s}: NON TROUVÉ DANS L'API GOUV`;
          }
        }
      }
    }

    let apiUrl = '';
    let headers: Record<string, string> = {};
    let body: any = {};

    if (provider === 'openai') {
      // Map to actual OpenAI model names
      const modelMapping: { [key: string]: string } = {
        'gpt-5.2': 'gpt-5.2',
        'gpt-5-mini': 'gpt-5-mini',
        'gpt-4.1': 'gpt-4.1'
      };

      const actualModel = modelMapping[model] || model;

      apiUrl = 'https://api.openai.com/v1/chat/completions';
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      };
      body = {
        model: actualModel,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: finalUserContent
          }
        ],
        temperature: 0.1,
        max_tokens: 2000,
        stream: true, // Enable streaming
      };
    } else if (provider === 'mistral') {
      // Map to actual Mistral model names
      const modelMapping: { [key: string]: string } = {
        'mistral-large-latest': 'mistral-large-latest',
        'devstral-medium-latest': 'codestral-latest',
        'devstral-small-latestdev': 'mistral-small-latest'
      };

      const actualModel = modelMapping[model] || model;

      apiUrl = 'https://api.mistral.ai/v1/chat/completions';
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      };
      body = {
        model: actualModel,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: finalUserContent
          }
        ],
        temperature: 0.1,
        max_tokens: 2000,
        stream: true, // Enable streaming
      };
    } else {
      return NextResponse.json(
        { error: 'Invalid provider' },
        { status: 400 }
      );
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`${provider} API error:`, errorData);
      return NextResponse.json(
        { error: 'Failed to generate response from AI' },
        { status: response.status }
      );
    }

    // Create a new stream that decodes the OpenAI/Mistral stream format
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            
            // Keep the last partial line in the buffer
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine || trimmedLine === 'data: [DONE]') continue;
              
              if (trimmedLine.startsWith('data: ')) {
                try {
                  const data = JSON.parse(trimmedLine.slice(6));
                  const content = data.choices[0]?.delta?.content || '';
                  if (content) {
                    controller.enqueue(new TextEncoder().encode(content));
                  }
                } catch (e) {
                  console.error('Error parsing stream line:', trimmedLine, e);
                }
              }
            }
          }
        } catch (err) {
          console.error('Stream error:', err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


