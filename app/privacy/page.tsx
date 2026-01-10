"use client";

import { ChevronLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                    <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold text-sm tracking-wide text-slate-600">Retour à l'accueil</span>
                </Link>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    <span className="font-bold text-lg tracking-tight text-slate-800">ToolsWith<span className="text-emerald-600">AI</span></span>
                </div>
            </div>
        </div>
      </nav>

      {/* Header */}
      <div className="relative pt-32 pb-12 w-full overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                    Politique de Confidentialité
                </h1>
                <div className="h-1.5 w-24 bg-emerald-500 rounded-full"></div>
            </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="prose prose-slate prose-lg max-w-none">
            <p className="lead text-xl text-slate-500 mb-12">
                Chez ToolsWithAI, la transparence est notre priorité. Nous avons conçu nos outils pour fonctionner avec un minimum de données, en privilégiant le traitement local et direct.
            </p>

            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                    Gestion des Clés API
                </h3>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                    <p className="font-bold text-amber-800 m-0">Stockage Local Uniquement</p>
                    <p className="text-amber-700 mt-2 m-0 text-base">
                        Vos clés API (OpenAI ou Mistral) sont stockées <strong>exclusivement dans le LocalStorage de votre navigateur</strong>. Elles ne sont jamais sauvegardées sur nos serveurs ni dans aucune base de données persistante de notre côté.
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                    Traitement des Requêtes
                </h3>
                <p>
                    Lorsque vous utilisez un outil :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li>Votre contenu (texte, code, URL) et votre clé API sont envoyés à notre API Backend de manière sécurisée (HTTPS).</li>
                    <li>Notre Backend agit uniquement comme un "passe-plat" (proxy) : il transmet immédiatement votre requête aux serveurs de l'IA (OpenAI ou Mistral AI).</li>
                    <li><strong>Nous ne conservons aucun historique</strong> de vos prompts ou des réponses générées sur nos serveurs.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">3</span>
                    Sous-traitants (IA Providers)
                </h3>
                <p>
                    En utilisant ce service, vous acceptez que vos données soient traitées par les fournisseurs d'IA tiers que vous sélectionnez :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li><strong>OpenAI</strong> : Si vous choisissez un modèle GPT. (Voir leur <a href="https://openai.com/privacy" target="_blank" className="text-emerald-600 underline">politique de confidentialité</a>)</li>
                    <li><strong>Mistral AI</strong> : Si vous choisissez un modèle Mistral. (Voir leur <a href="https://mistral.ai/terms/" target="_blank" className="text-emerald-600 underline">politique de confidentialité</a>)</li>
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                    Note : Les fournisseurs d'IA peuvent conserver vos données pour l'entraînement de leurs modèles sauf si vous utilisez leurs API d'entreprise avec des clauses de non-entraînement (Zero Data Retention), ce qui dépend de votre propre contrat avec eux.
                </p>
            </section>

            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">5</span>
                    Contact
                </h3>
                <p>
                    Pour toute question concernant vos données, vous pouvez nous contacter à l'adresse suivante : <span className="text-emerald-600 font-semibold">maximevery@ryveweb.fr</span>.
                </p>
            </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} ToolsWithAI. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}