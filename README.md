# 5GPT - AI-Powered Developer Toolkit

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)]()

> **5GPT** est une suite d'outils de développement augmentés par l'IA, conçue pour automatiser et accélérer les tâches courantes des développeurs et administrateurs système.

## 🎯 Vue d'ensemble

**5GPT** propose 7 outils intelligents qui utilisent les meilleurs modèles IA (OpenAI GPT-5, Mistral Large) pour transformer vos workflows:

| Outil | Catégorie | Description |
|-------|-----------|-------------|
| **Is the website compliant?** | Légal | Audit RGPD/LCEN + vérification SIRET |
| **Tech Stack Modernizer** | Code | Plan de migration vers technologies modernes |
| **Smart Dockerizer** | DevOps | Dockerfiles optimisés production-ready |
| **JSON to Zod** | Productivité | JSON → schémas Zod + interfaces TypeScript |
| **Feature Smith & Estimator** | Conception | Idées floues → spécifications techniques |
| **README Architect** | Documentation | Documentations professionnelles |
| **Documentation Technique** | Admin | Audit projet & processus d'ingénierie des prompts |

---

## 🚀 Démarrage rapide

### Prérequis
- **Node.js** 18+ ou **Bun**
- Clé API **OpenAI** OU **Mistral AI**

### Installation

```bash
git clone https://github.com/yourusername/5gpt.git
cd 5gpt
npm install
npm run dev
```

Ouvrez http://localhost:3000 et configurez votre provider IA.

---

## 📚 Documentation

- **[Analyse Complète de Sécurité](docs/SECURITY.md)** - Risques de prompt injection + tests
- **[Architecture & API](docs/API.md)** - Endpoints et intégrations

---

## 🔐 Sécurité

✅ Validation inputs  
✅ XSS prevention (HTML stripping)  
✅ LLM robustness (GPT-5, Mistral)  
⚠️ Rate limiting recommandé en production  

**[Voir rapport de sécurité complet](docs/SECURITY.md)**

---

## 📦 Déploiement

### Vercel (Recommandé)
```bash
vercel
```

### Self-hosted
```bash
npm run build
npm start
```

---

## 🎓 Techniques de Prompt Engineering

| Outil | Technique |
|-------|-----------|
| Legal Analyzer | Persona + Multi-contextual Prompting |
| Tech Stack | Few-shot + Chain of Thought |
| Dockerizer | Few-shot + Optimization |
| JSON to Zod | Zero-shot Strict |
| Feature Smith | Structured Prompting + Role Playing |

---

## 🤝 Contribution

```bash
git checkout -b feature/AmazingFeature
git commit -m 'Add AmazingFeature'
git push origin feature/AmazingFeature
```

---

## 📄 Licence

MIT License

---

**Made with ❤️ by 5GPT Team | Version 0.1.0 | Updated 31 Dec 2025**
