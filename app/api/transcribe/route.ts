import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;
    const provider = formData.get('provider') as string;
    const apiKey = formData.get('apiKey') as string;

    if (!file || !provider || !apiKey) {
      return NextResponse.json(
        { error: 'Missing file, provider or apiKey' },
        { status: 400 }
      );
    }

    let apiUrl = '';
    let model = '';

    if (provider === 'openai') {
      apiUrl = 'https://api.openai.com/v1/audio/transcriptions';
      // Utilisation du modèle spécifié dans votre documentation
      model = 'whisper-1'; 
    } else if (provider === 'mistral') {
      // Endpoint compatible OpenAI pour Mistral
      apiUrl = 'https://api.mistral.ai/v1/audio/transcriptions';
      model = 'mistral-large-latest'; // Fallback safe si voxtral n'est pas dispo, mais on tente voxtral
      // Note: Si voxtral a un endpoint spécifique, il faudrait le changer ici. 
      // Pour l'instant on assume la compatibilité standard du endpoint transcription.
      model = 'voxtral-mini-latest';
    } else {
      return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
    }

    // Préparation du FormData pour l'API externe
    const upstreamFormData = new FormData();
    upstreamFormData.append('file', file);
    upstreamFormData.append('model', model);
    
    // Paramètres optionnels pour améliorer la qualité
    if (provider === 'openai') {
      upstreamFormData.append('response_format', 'json');
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: upstreamFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`${provider} Transcription Error:`, errorText);
      return NextResponse.json(
        { error: `Transcription failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ text: data.text });

  } catch (error) {
    console.error('Transcription API error:', error);
    return NextResponse.json(
      { error: 'Internal server error during transcription' },
      { status: 500 }
    );
  }
}
