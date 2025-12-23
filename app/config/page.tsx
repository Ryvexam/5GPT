'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Check,
  ArrowRight,
  AlertCircle,
  Key,
  Cpu,
  Settings,
  RefreshCw
} from 'lucide-react';

const AI_PROVIDERS = {
  openai: {
    name: 'OpenAI',
    models: [
      { id: 'gpt-5.2', name: 'GPT-5.2', description: 'Latest flagship model for advanced coding and agentic tasks' },
      { id: 'gpt-5-mini', name: 'GPT-5 Mini', description: 'Fast, cost-efficient variant for well-defined tasks' },
      { id: 'gpt-4.1', name: 'GPT-4.1', description: 'Powerful general-purpose model' }
    ],
    defaultModel: 'gpt-5.2',
    color: 'bg-blue-600',
    textColor: 'text-blue-600'
  },
  mistral: {
    name: 'Mistral AI',
    models: [
      { id: 'mistral-large-2411', name: 'Mistral Large 24.11', description: 'State-of-the-art multimodal model (Free)' },
      { id: 'codestral', name: 'Codestral', description: 'Specialized for coding assistance (Free)' },
      { id: 'pixtral-large', name: 'Pixtral Large', description: 'Multimodal model for text and images (Free)' }
    ],
    defaultModel: 'mistral-large-2411',
    color: 'bg-purple-600',
    textColor: 'text-purple-600'
  }
};

export default function ConfigPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<keyof typeof AI_PROVIDERS | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isConnectionValid, setIsConnectionValid] = useState(false);

  const handleProviderSelect = (provider: keyof typeof AI_PROVIDERS) => {
    setSelectedProvider(provider);
    setSelectedModel(AI_PROVIDERS[provider].defaultModel);
    setStep(2);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleTestConnection = async () => {
    if (!selectedProvider || !selectedModel || !apiKey.trim()) return;

    setIsTesting(true);
    setIsConnectionValid(false);

    try {
      const response = await fetch('/api/test-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: selectedProvider,
          model: selectedModel,
          apiKey: apiKey.trim(),
        }),
      });

      if (response.ok) {
        setIsConnectionValid(true);
        alert('Connection successful! Your API key is valid.');
      } else {
        const errorData = await response.json();
        alert(`Connection failed: ${errorData.error || 'Invalid API key'}`);
      }
    } catch (error) {
      console.error('Test connection error:', error);
      alert('An error occurred while testing the connection.');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveConfig = async () => {
    if (!selectedProvider || !selectedModel || !apiKey.trim()) return;

    setIsLoading(true);

    try {
      // If connection wasn't tested or failed, test it now
      if (!isConnectionValid) {
        const testResponse = await fetch('/api/test-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider: selectedProvider,
            model: selectedModel,
            apiKey: apiKey.trim(),
          }),
        });

        if (!testResponse.ok) {
          throw new Error('Invalid API key');
        }
      }

      // Save configuration to localStorage
      const config = {
        provider: selectedProvider,
        model: selectedModel,
        apiKey: apiKey.trim(),
        configured: true,
        configuredAt: new Date().toISOString()
      };

      localStorage.setItem('ai-toolkit-config', JSON.stringify(config));

      // Redirect to dashboard
      router.push('/');
    } catch (error) {
      console.error('Configuration error:', error);
      alert('Invalid API key. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentProvider = selectedProvider ? AI_PROVIDERS[selectedProvider] : null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to AI Toolkit</h1>
          <p className="text-slate-600">Configure your AI provider to get started</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              1
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-emerald-600' : 'bg-slate-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              2
            </div>
            <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-emerald-600' : 'bg-slate-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 4 ? 'bg-emerald-600 text-white' : step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              3
            </div>
            <div className={`w-8 h-0.5 ${step >= 4 ? 'bg-emerald-600' : 'bg-slate-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              4
            </div>
          </div>
        </div>

        {/* Step 1: Provider Selection */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Choose Your AI Provider</h2>
              <p className="text-slate-600">Select the AI service you want to use</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
                <button
                  key={key}
                  onClick={() => handleProviderSelect(key as keyof typeof AI_PROVIDERS)}
                  className="p-6 border-2 border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 text-left group"
                >
                  <div className={`w-12 h-12 ${provider.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Cpu className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{provider.name}</h3>
                  <p className="text-slate-600 text-sm">Professional AI models for developers</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Model Selection */}
        {step === 2 && currentProvider && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setStep(1)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors mr-4"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Choose Your Model</h2>
                <p className="text-slate-600">Select the AI model for {currentProvider.name}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {currentProvider.models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model.id)}
                  className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                    selectedModel === model.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">{model.name}</h3>
                      <p className="text-slate-600 text-sm">{model.description}</p>
                    </div>
                    {selectedModel === model.id && (
                      <Check size={20} className="text-emerald-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!selectedModel}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Step 3: API Key */}
        {step === 3 && currentProvider && selectedModel && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setStep(2)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors mr-4"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">API Configuration</h2>
                <p className="text-slate-600">Enter your {currentProvider.name} API key</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {currentProvider.name} API Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Enter your ${currentProvider.name} API key`}
                    className="w-full p-4 pr-12 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                  <Key className="absolute right-4 top-4 text-slate-400" size={20} />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Your API key is stored locally and never sent to our servers.
                </p>
              </div>

              {/* Configuration Summary */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-slate-800 mb-3 flex items-center">
                  <Settings size={16} className="mr-2" />
                  Configuration Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Provider:</span>
                    <span className="font-medium text-slate-800">{currentProvider.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Model:</span>
                    <span className="font-medium text-slate-800">
                      {currentProvider.models.find(m => m.id === selectedModel)?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {apiKey.trim() && (
              <button
                onClick={() => setStep(4)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        )}

        {/* Step 4: Connection Test */}
        {step === 4 && currentProvider && selectedModel && apiKey.trim() && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setStep(3)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors mr-4"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Test Connection</h2>
                <p className="text-slate-600">Verify your API key works before completing setup</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <p className="text-slate-600 mb-6">
                  Test your connection to ensure everything works properly.
                </p>

                <button
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="w-full max-w-xs mx-auto flex items-center justify-center space-x-2 px-6 py-4 border-2 border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400"
                >
                  {isTesting ? (
                    <RefreshCw size={20} className="animate-spin" />
                  ) : (
                    <Check size={20} />
                  )}
                  <span className="font-medium">Check Connection</span>
                </button>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <button
                  onClick={handleSaveConfig}
                  disabled={isLoading || !isConnectionValid}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      {isConnectionValid ? <Check size={20} /> : <ArrowRight size={20} />}
                      <span>Complete Setup</span>
                    </>
                  )}
                </button>
                {!isConnectionValid && (
                  <p className="text-center text-xs text-amber-600 mt-2">
                    Please check connection before completing setup
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
