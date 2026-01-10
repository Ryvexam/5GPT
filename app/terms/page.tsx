"use client";

import { ChevronLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsOfService() {
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
                    <FileText className="w-6 h-6 text-emerald-600" />
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
                    Conditions Générales d'Utilisation
                </h1>
                <div className="h-1.5 w-24 bg-emerald-500 rounded-full"></div>
            </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="prose prose-slate prose-lg max-w-none">
            <p className="lead text-xl text-slate-500 mb-12">
                Bienvenue sur ToolsWithAI. L'utilisation de cette plateforme implique l'acceptation pleine et entière des conditions ci-dessous.
            </p>

            {/* Mentions Légales */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Mentions Légales</h3>
                <div className="bg-slate-100 p-6 rounded-xl text-base">
                    <p className="mb-2"><strong>Éditeur du site :</strong> Projet ToolsWithAI</p>
                    <p className="mb-2"><strong>Hébergeur :</strong> Serveur Personnel, Pérignat-lès-Sarliève (63170), France</p>
                    <p className="mb-0"><strong>Contact :</strong> maximevery@ryveweb.fr</p>
                </div>
            </section>

            {/* Responsabilité Utilisateur */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Responsabilité de l'Utilisateur</h3>
                <p>
                    En utilisant nos outils, vous reconnaissez être seul responsable :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li><strong>Des données transmises :</strong> Vous vous engagez à ne pas transmettre de données confidentielles, de secrets industriels ou de données personnelles sensibles (santé, etc.) dans les prompts.</li>
                    <li><strong>De l'usage des résultats :</strong> Le code, les audits juridiques ou les documents générés par l'IA doivent être vérifiés par un professionnel compétent (développeur senior, juriste) avant toute utilisation en production ou commerciale.</li>
                    <li><strong>De vos clés API :</strong> Vous êtes responsable de la sécurité de votre clé API. Ne la partagez jamais.</li>
                </ul>
            </section>

            {/* Limitation Responsabilité IA */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">3. Fiabilité de l'Intelligence Artificielle</h3>
                <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg mb-6">
                    <p className="font-bold text-rose-800 m-0 flex items-center gap-2">
                        ⚠️ Avertissement Important
                    </p>
                    <p className="text-rose-700 mt-2 m-0 text-base">
                        Nous ne pouvons garantir un résultat fiable à 100%. C'est le principe même des modèles de langage (LLM) qui sont probabilistes.
                    </p>
                </div>
                <p>
                    ToolsWithAI décline toute responsabilité concernant :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li>Les erreurs de code, bugs de sécurité ou failles générées par l'IA.</li>
                    <li>Les "hallucinations" (informations fausses inventées par l'IA), notamment dans les audits juridiques.</li>
                    <li>Les pertes financières ou de données résultant de l'utilisation directe des sorties de l'outil sans vérification humaine.</li>
                </ul>
            </section>

            {/* Propriété Intellectuelle */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">4. Propriété Intellectuelle</h3>
                <p>
                    Les contenus générés par l'IA via votre clé API vous appartiennent (selon les conditions de OpenAI ou Mistral AI). L'interface de l'application ToolsWithAI est protégée par le droit d'auteur.
                </p>
            </section>

            {/* Modification */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">5. Modifications</h3>
                <p>
                    Nous nous réservons le droit de modifier ces conditions à tout moment. L'utilisation continue du service vaut acceptation des nouvelles conditions.
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