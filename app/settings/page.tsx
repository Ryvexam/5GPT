'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Settings as SettingsIcon,
  Key,
  Cpu,
  Save,
  AlertCircle,
  Check,
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

export default function SettingsPage() {
  const router = useRouter();
  const [config, setConfig] = useState<any>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Load current configuration
    const storedConfig = localStorage.getItem('ai-toolkit-config');
    if (storedConfig) {
      try {
        const parsedConfig = JSON.parse(storedConfig);
        setConfig(parsedConfig);
        setSelectedProvider(parsedConfig.provider);
        setSelectedModel(parsedConfig.model);
        setApiKey(parsedConfig.apiKey);
      } catch (error) {
        console.error('Error parsing config:', error);
        router.push('/config');
      }
    } else {
      router.push('/config');
    }
  }, [router]);

  const handleTestConnection = async () => {
    if (!selectedProvider || !selectedModel || !apiKey.trim()) return;

    setIsTesting(true);
    setTestStatus('idle');

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
        setTestStatus('success');
      } else {
        setTestStatus('error');
      }
    } catch (error) {
      console.error('Test error:', error);
      setTestStatus('error');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!selectedProvider || !selectedModel || !apiKey.trim()) return;

    setIsLoading(true);

    try {
      // Test the connection first
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
        alert('Invalid API key. Please check and try again.');
        return;
      }

      // Save new configuration
      const newConfig = {
        provider: selectedProvider,
        model: selectedModel,
        apiKey: apiKey.trim(),
        configured: true,
        configuredAt: new Date().toISOString()
      };

      localStorage.setItem('ai-toolkit-config', JSON.stringify(newConfig));
      setConfig(newConfig);

      alert('Settings saved successfully!');
      router.push('/');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentProvider = selectedProvider ? AI_PROVIDERS[selectedProvider as keyof typeof AI_PROVIDERS] : null;

  if (!config) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 rounded-lg bg-emerald-600/10">
          <SettingsIcon size={24} className="text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500">Configure your AI provider and preferences</p>
        </div>
      </div>

      <div className="space-y-8">

          {/* Current Configuration */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Current Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Cpu size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-600">Provider</span>
                </div>
                <p className="text-lg font-semibold text-slate-800">
                  {config.provider === 'openai' ? 'OpenAI' : 'Mistral AI'}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <SettingsIcon size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-600">Model</span>
                </div>
                <p className="text-lg font-semibold text-slate-800">{config.model}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Key size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-600">API Key</span>
                </div>
                <p className="text-lg font-semibold text-slate-800">
                  {config.apiKey ? '••••••••' + config.apiKey.slice(-4) : 'Not set'}
                </p>
              </div>
            </div>
          </div>

          {/* Provider Selection */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">AI Provider</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedProvider(key);
                    if (key !== selectedProvider) {
                      setSelectedModel(AI_PROVIDERS[key as keyof typeof AI_PROVIDERS].defaultModel);
                    }
                  }}
                  className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                    selectedProvider === key
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${provider.color} rounded-lg flex items-center justify-center`}>
                      <Cpu className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{provider.name}</h3>
                      <p className="text-sm text-slate-600">Professional AI models</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          {selectedProvider && currentProvider && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Model Selection - {currentProvider.name}
              </h2>
              <div className="space-y-3">
                {currentProvider.models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 ${
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
            </div>
          )}

          {/* API Key */}
          {selectedProvider && selectedModel && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">API Key</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {currentProvider?.name} API Key
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={`Enter your ${currentProvider?.name} API key`}
                      className="w-full p-4 pr-12 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                    <Key className="absolute right-4 top-4 text-slate-400" size={20} />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Your API key is stored locally and never sent to our servers.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleTestConnection}
                    disabled={!apiKey.trim() || isTesting}
                    className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isTesting ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Check size={16} />
                    )}
                    <span>Test Connection</span>
                  </button>

                  {testStatus === 'success' && (
                    <span className="text-emerald-600 text-sm font-medium flex items-center space-x-1">
                      <Check size={14} />
                      <span>Connection OK</span>
                    </span>
                  )}
                  {testStatus === 'error' && (
                    <span className="text-rose-600 text-sm font-medium flex items-center space-x-1">
                      <AlertCircle size={14} />
                      <span>Connection failed</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={!selectedProvider || !selectedModel || !apiKey.trim() || isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </div>
      </div>
    </div>
  );
}