import { Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, ArrowLeft, Check, Code, FileCode, Terminal, 
  Settings, Share2, Rocket, Cloud, Shield, Database, Layout, Cpu
} from 'lucide-react';

const INTEGRATION_FEATURES = [
  {
    title: 'Exportation de Code',
    icon: <Code className="w-5 h-5" />,
    color: 'text-amber-400',
    items: [
      'Génération de scripts Python (.py)',
      'Export Notebook Jupyter (.ipynb)',
      'Pipelines Scikit-Learn complets',
      'Fonctions de preprocessing isolées',
      'Documentation du code auto-générée',
      'Compatibilité avec Pandas & Polars',
    ],
  },
  {
    title: 'API d\'Intégration',
    icon: <Terminal className="w-5 h-5" />,
    color: 'text-blue-400',
    items: [
      'Points d\'accès RESTful complets',
      'Webhook de notification de fin de tâche',
      'Authentification par clé API (Bearer)',
      'SDK Python pour intégration facile',
      'Support des formats JSON & Protobuf',
      'Rate limiting personnalisable',
    ],
  },
  {
    title: 'Paiements Locaux',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-teal-400',
    items: [
      'Intégration native Wave Sénégal',
      'Support Orange Money & Free Money',
      'Facturation conforme aux taxes locales',
      'Paiements mobiles en un clic',
      'Tableau de bord des transactions',
      'Sécurité SSL & chiffrement 256 bits',
    ],
  },
  {
    title: 'Déploiement & Ops',
    icon: <Rocket className="w-5 h-5" />,
    color: 'text-purple-400',
    items: [
      'Images Docker optimisées',
      'Pipeline CI/CD GitHub Actions',
      'Monitoring des ressources CPU/RAM',
      'Logs centralisés et persistants',
      'Auto-scaling des travailleurs de tâche',
      'Déploiement Cloud (AWS, Azure, GCP)',
    ],
  },
];

export default function ExportIntegrationPage() {
  return (
    <div className="pt-16">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            to="/features" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux fonctionnalités
          </Link>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Export & <span className="text-amber-400">Intégration</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Passez du prototype à la production en quelques secondes. 
            Exportez vos pipelines de données et intégrez-les directement 
            dans votre infrastructure existante.
          </p>
        </div>
      </section>

      {/* Grid of Features */}
      <section className="relative py-20 bg-slate-900/30">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTEGRATION_FEATURES.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-4">{feature.title}</h3>
                <ul className="space-y-3">
                  {feature.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                      <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Export Preview */}
      <section className="relative py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-xs text-slate-500 font-mono">
                pipeline_export.py
              </div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <pre className="text-slate-300">
                <code className="language-python">
{`import pandas as pd
from saas_data_engine import DataPrep

# 📥 Chargement automatique
prep = DataPrep(dataset_id="user_789_data")

# 🛠️ Application du pipeline de nettoyage généré par l'IA
df_cleaned = prep.apply_pipeline(
    handle_missing="impute_mean",
    remove_duplicates=True,
    normalize=["amount", "score"]
)

# 🚀 Prêt pour l'entraînement
print(f"Dataset nettoyé : {df_cleaned.shape}")`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Déployez vos modèles plus vite
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            SaaS-Data Engine est conçu pour les professionnels exigeants qui 
            veulent une intégration transparente et une scalabilité totale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:shadow-2xl transition-all"
            >
              Voir les plans Entreprise
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
