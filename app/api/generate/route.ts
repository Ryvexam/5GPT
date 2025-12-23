import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPTS = {
  'unit-test-generator': "Tu es un expert QA. Analyse le code fourni et génère des tests unitaires complets (Jest/Pytest selon le langage détecté). Couvre les cas limites (edge cases). Réponds uniquement avec le code des tests.",
  'smart-dockerizer': "Tu es un expert DevOps. Génère un Dockerfile optimisé 'Production-Ready' pour ce projet. Utilise le multi-stage build pour réduire la taille de l'image. Ajoute des commentaires expliquant chaque étape.",
  'log-deep-analyzer': "Tu es un ingénieur SRE Senior. Analyse ce log d'erreur. Utilise la méthode 'Chain of Thought' : 1. Identifie le service fautif. 2. Explique la cause racine. 3. Propose le fix immédiat. Formatte la réponse en Markdown structuré.",
  'readme-architect': "Tu es un Technical Writer. Rédige un fichier README.md professionnel à partir de ce code ou de cette description. Inclus : Titre, Badges, Installation, Usage, et Contribution. Sois clair et concis.",
  'legal-analyzer': "Tu es un expert en droit numérique, RGPD et conformité web (expertises LCEN et RGPD). Ton rôle est CRITIQUE : une non-conformité peut entraîner des amendes allant jusqu'à 4% du chiffre d'affaires mondial (RGPD) et nuire gravement à la réputation d'une entreprise.\n\nAnalyse ce document ou ce lien et génère un RAPPORT DE CONFORMITÉ STRUCTURÉ en distinguant bien les différents documents obligatoires :\n\n1. 🚩 RAPPEL DES RISQUES : Un court paragraphe percutant sur les risques (amendes, sanctions pénales) liés au non-respect de la LCEN et du RGPD.\n\n2. 📊 IDENTIFICATION DE L'ENTITÉ : Présente les informations suivantes UNIQUEMENT sous forme d'un tableau Markdown (laisse une ligne vide avant et après le tableau).\n\n| Champ | Valeur |\n| :--- | :--- |\n| Nom de l'entreprise | ... |\n| SIRET / Siren | ... |\n| Responsable de publication | ... |\n| Hébergeur | ... |\n| Localisation serveur | ... |\n| Contact | ... |\n\nSi une donnée est manquante, indique impérativement 'NON TROUVÉ ❌'.\n\n3. 🔍 AUDIT DES DOCUMENTS OBLIGATOIRES : Pour chaque point, indique 'PRÉSENT ✅' ou 'ABSENT ❌' et donne un avis rapide :\n   - **Mentions Légales** (Obligatoires pour tous : identification, hébergeur).\n   - **CGU** (Conditions Générales d'Utilisation : règles d'usage du site).\n   - **CGV** (Conditions Générales de Vente : indispensables si vente en ligne).\n   - **Politique de Confidentialité / RGPD** (Collecte et traitement des données).\n   - **Gestion des Cookies** (Bandeau et consentement).\n\n4. ⚠️ ANALYSE DES CLAUSES : Liste les clauses abusives, floues ou non conformes (ex: absence de droit de rétractation dans les CGV, collecte illégale de données).\n\n5. ⚖️ VERDICT FINAL : 'CONFORME ✅', 'PARTIELLEMENT CONFORME ⚠️' ou 'NON CONFORME ❌'.\n\nIMPORTANT : L'absence de Mentions Légales ou de SIRET/Hébergeur entraîne un verdict NON CONFORME d'office. Si le site est marchand sans CGV, il est aussi NON CONFORME."
};

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

    // Special handling for legal-analyzer to support URLs
    if (toolId === 'legal-analyzer' && (userContent.startsWith('http://') || userContent.startsWith('https://'))) {
      try {
        const urlResponse = await fetch(userContent);
        if (urlResponse.ok) {
          const html = await urlResponse.text();
          // Basic text extraction from HTML (removing tags)
          const textContent = html
            .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/g, "")
            .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/g, "")
            .replace(/<header\b[^>]*>([\s\S]*?)<\/header>/g, "") // Remove header to focus on content
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          
          finalUserContent = `URL ANALYSÉE: ${userContent}\n\nCONTENU DU SITE (EXTRAIT):\n${textContent.slice(0, 15000)}`; // Increased limit slightly
        }
      } catch (error) {
        console.error('Failed to fetch URL:', error);
        // Fallback to original content if fetch fails
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
      // Map to actual Mistral free tier model names
      const modelMapping: { [key: string]: string } = {
        'mistral-large-2411': 'mistral-large-2411',
        'codestral': 'codestral',
        'pixtral-large': 'pixtral-large'
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

