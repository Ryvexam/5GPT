import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { provider, model, apiKey } = await request.json();

    if (!provider || !model || !apiKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let testPrompt = '';
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
            role: 'user',
            content: 'Hello, can you respond with just "OK" to confirm the API is working?'
          }
        ],
        max_tokens: 10,
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
            role: 'user',
            content: 'Hello, can you respond with just "OK" to confirm the API is working?'
          }
        ],
        max_tokens: 10,
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
      console.error('API test error:', errorData);
      return NextResponse.json(
        { error: 'Invalid API key or configuration' },
        { status: 400 }
      );
    }

    const data = await response.json();
    const hasResponse = data.choices && data.choices[0] && data.choices[0].message;

    if (!hasResponse) {
      return NextResponse.json(
        { error: 'Invalid API response' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: 'API key is valid' });

  } catch (error) {
    console.error('API test route error:', error);
    return NextResponse.json(
      { error: 'Failed to test API key' },
      { status: 500 }
    );
  }
}

