import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPTS = {
  'unit-test-generator': "Tu es un expert QA. Analyse le code fourni et génère des tests unitaires complets (Jest/Pytest selon le langage détecté). Couvre les cas limites (edge cases). Réponds uniquement avec le code des tests.",
  'smart-dockerizer': "Tu es un expert DevOps. Génère un Dockerfile optimisé 'Production-Ready' pour ce projet. Utilise le multi-stage build pour réduire la taille de l'image. Ajoute des commentaires expliquant chaque étape.",
  'log-deep-analyzer': "Tu es un ingénieur SRE Senior. Analyse ce log d'erreur. Utilise la méthode 'Chain of Thought' : 1. Identifie le service fautif. 2. Explique la cause racine. 3. Propose le fix immédiat. Formatte la réponse en Markdown structuré.",
  'readme-architect': "Tu es un Technical Writer. Rédige un fichier README.md professionnel à partir de ce code ou de cette description. Inclus : Titre, Badges, Installation, Usage, et Contribution. Sois clair et concis.",
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

    // Special handling for legal-analyzer to support URLs with deep scraping
    if (toolId === 'legal-analyzer' && (userContent.startsWith('http://') || userContent.startsWith('https://'))) {
      try {
        const homePage = await scrapePage(userContent);
        if (homePage) {
          const baseUrl = homePage.finalUrl || userContent;
          let scrapedUrls = [baseUrl];
          let combinedText = `URL PAGE D'ACCUEIL: ${baseUrl}\n\nCONTENU ACCUEIL:\n${homePage.text.slice(0, 8000)}`;
          
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
          finalUserContent = combinedText;

          // Try to find all SIRETs and fetch company data for each
          const foundSirets = extractSirets(combinedText);
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

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


