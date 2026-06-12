import { Link } from 'react-router-dom';
import { 
  Database, ArrowRight, ArrowLeft, Check, Layers, Server, 
  Table, Filter, Activity, Zap, FileSpreadsheet, Shield, Search, Sparkles
} from 'lucide-react';

const PREP_LAYERS = [
  {
    title: 'Ingestion de Données',
    icon: <Database className="w-5 h-5" />,
    color: 'text-blue-400',
    items: [
      'Support CSV, Excel, JSON, SQL',
      'Upload sécurisé multi-fichiers',
      'Détection automatique de l\'encodage',
      'Parsage intelligent des types',
      'Gestion des fichiers volumineux',
      'Aperçu instantané des données',
    ],
  },
  {
    title: 'Nettoyage Automatique',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'text-green-400',
    items: [
      'Suppression intelligente des doublons',
      'Imputation IA des valeurs manquantes',
      'Normalisation des formats de date',
      'Standardisation des textes (NLP)',
      'Détection et gestion des outliers',
      'Correction des erreurs de saisie',
    ],
  },
  {
    title: 'Transformation & Engineering',
    icon: <Filter className="w-5 h-5" />,
    color: 'text-purple-400',
    items: [
      'Encodage automatique (One-Hot, Label)',
      'Scaling & Normalisation (MinMax, Z-score)',
      'Création de nouvelles features',
      'Agrégations complexes simplifiées',
      'Pivotement et fusion de datasets',
      'Génération de schémas de validation',
    ],
  },
  {
    title: 'Qualité des Données',
    icon: <Shield className="w-5 h-5" />,
    color: 'text-orange-400',
    items: [
      'Score de santé du dataset',
      'Alertes sur la qualité des données',
      'Profilage statistique complet',
      'Vérification des contraintes métiers',
      'Masquage des données sensibles (RGPD)',
      'Historique des transformations',
    ],
  },
];

export default function DataPrepPage() {
  return (
    <div className="pt-16">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            to="/features" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux fonctionnalités
          </Link>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Ingestion & <span className="text-blue-400">Nettoyage</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Éliminez 60% des tâches répétitives de préparation de données. 
            Une plateforme robuste pour transformer vos données brutes en datasets 
            prêts pour l'analyse et le machine learning.
          </p>
        </div>
      </section>

      {/* Grid of Layers */}
      <section className="relative py-20 bg-slate-900/30">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PREP_LAYERS.map((layer) => (
              <div 
                key={layer.title}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 ${layer.color}`}>
                  {layer.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-4">{layer.title}</h3>
                <ul className="space-y-3">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-3xl border border-blue-500/20 p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Prêt à nettoyer vos données au Sénégal ?
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Inscrivez-vous dès aujourd'hui et profitez de la puissance de l'IA pour
              automatiser vos pipelines de données.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="http://localhost:8502"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-slate-950 hover:shadow-2xl transition-all"
              >
                Lancer le Module de Préparation
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/5 transition-all"
              >
                Voir les Tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
