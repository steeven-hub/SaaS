import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Brain, Trophy, Check, ArrowRight, Clock, Layers, Cpu, Zap, Target } from 'lucide-react';

interface Pillar {
  icon: React.ReactNode;
  accentIcon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  features: string[];
  highlight: string;
  gradient: string;
  borderColor: string;
  bgGlow: string;
  href: string;
}

const PILLARS: Pillar[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    accentIcon: <Layers className="w-4 h-4" />,
    tag: 'Data Prep',
    title: 'Ingestion & Nettoyage',
    description:
      'Automatisez les tâches ingrates de préparation. Importez vos CSV/Excel et laissez l\'IA gérer les doublons et valeurs manquantes.',
    features: [
      'Nettoyage automatique des doublons',
      'Imputation intelligente (Moyenne, Médiane, IA)',
      'Détection automatique de types',
      'Normalisation et Standardisation',
      'Gestion des valeurs aberrantes (Outliers)',
      'Support multi-formats (CSV, Excel, JSON)',
    ],
    highlight: 'Gagnez 60% de temps sur la prep',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30 hover:border-blue-400/50',
    bgGlow: 'bg-blue-500/5',
    href: '/features/data-prep',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    accentIcon: <Cpu className="w-4 h-4" />,
    tag: 'Auto-EDA',
    title: 'Exploration & IA',
    description:
      "Générez instantanément des visualisations et des insights statistiques. Comprenez vos données sans écrire une ligne de code.",
    features: [
      'Visualisations interactives automatiques',
      'Matrices de corrélation & Heatmaps',
      'Statistiques descriptives complètes',
      'Détection automatique de patterns',
      'Génération de rapports PDF exécutifs',
      'Moteur de recommandation IA',
    ],
    highlight: 'Insights instantanés sans code',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30 hover:border-purple-400/50',
    bgGlow: 'bg-purple-500/5',
    href: '/features/ai-engine',
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    accentIcon: <Target className="w-4 h-4" />,
    tag: 'Workflow',
    title: 'Export & Intégration',
    description:
      'Passez du prototype à la production. Exportez vos pipelines en scripts Python ou Jupyter Notebooks.',
    features: [
      'Export vers Script Python (.py)',
      'Génération de Notebook Jupyter (.ipynb)',
      'API d\'intégration REST complète',
      'Export vers bases de données (SQL)',
      'Compatibilité Scikit-Learn / Pandas',
      'Tracking de versions de datasets',
    ],
    highlight: 'Exportation vers code métier',
    gradient: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30 hover:border-amber-400/50',
    bgGlow: 'bg-amber-500/5',
    href: '/features/export',
  },
];

export default function PillarsSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="pillars" className="relative py-24">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-500/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs font-medium text-slate-400 mb-4">
            <Zap className="w-3 h-3 text-teal-400" />
            PROPOSITION DE VALEUR
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trois piliers. <span className="text-teal-400">Une plateforme unique.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            De la donnée brute à l'insight métier. SaaS-Data Engine vous accompagne à chaque étape
            de votre cycle de développement data.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <Link
              key={i}
              to={pillar.href}
              className={`group relative rounded-2xl border ${pillar.borderColor} bg-slate-900/50 backdrop-blur-sm overflow-hidden transition-all duration-500 cursor-pointer ${
                activeCard === i ? 'scale-[1.02] shadow-2xl' : 'hover:scale-[1.01]'
              }`}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative p-7">
                {/* Icon & tag */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${pillar.bgGlow} border border-slate-700/50 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform`}>
                    {pillar.icon}
                  </div>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {pillar.accentIcon}
                    {pillar.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {pillar.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Highlight */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-800/60">
                  <div className="flex items-center gap-2 text-sm font-semibold text-teal-400">
                    <Clock className="w-4 h-4" />
                    {pillar.highlight}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

