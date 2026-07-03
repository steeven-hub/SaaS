import { Link } from 'react-router-dom';
import { 
  Shield, Brain, Trophy, ArrowRight, Zap, Layers, 
  Database, Lock, CreditCard, Box, Server, GitBranch,
  Cpu, Check, Sparkles
} from 'lucide-react';

const FEATURE_CARDS = [
  {
    icon: <Database className="w-6 h-6" />,
    category: 'Data Prep',
    title: 'Ingestion & Nettoyage',
    description: 'Automatisez 60% du travail ingrat. Import intelligent, gestion des valeurs manquantes et normalisation automatique.',
    href: '/features/data-prep',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30 hover:border-blue-400/60',
    iconBg: 'bg-blue-500/10 text-blue-400',
    features: ['Nettoyage Auto', 'Imputation IA', 'Multi-formats', 'Détection Outliers'],
  },
  {
    icon: <Brain className="w-6 h-6" />,
    category: 'Auto-EDA',
    title: 'Exploration & IA',
    description: 'Insights instantanés sans code. Visualisations dynamiques, matrices de corrélation et rapports PDF exécutifs.',
    href: '/features/ai-engine',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30 hover:border-purple-400/60',
    iconBg: 'bg-purple-500/10 text-purple-400',
    features: ['Viz Dynamiques', 'Heatmaps Corrélation', 'Rapports PDF', 'Pattern Detection'],
  },
  {
    icon: <Zap className="w-6 h-6" />,
    category: 'Workflow',
    title: 'Export & Intégration',
    description: 'Passez du prototype à la production. Exportez vos pipelines en scripts Python ou Jupyter Notebooks.',
    href: '/features/export',
    gradient: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30 hover:border-amber-400/60',
    iconBg: 'bg-amber-500/10 text-amber-400',
    features: ['Export .py / .ipynb', 'API REST Complète', 'SQL Integration', 'Wave & Orange Money'],
  },
];

const TECH_STACK = [
  { name: 'Angular 17+', icon: <Layers className="w-5 h-5" />, desc: 'Frontend moderne avec Signals' },
  { name: 'Python FastAPI', icon: <Server className="w-5 h-5" />, desc: 'API async haute performance' },
  { name: 'PostgreSQL', icon: <Database className="w-5 h-5" />, desc: 'Base de données robuste' },
  { name: 'Docker', icon: <Box className="w-5 h-5" />, desc: 'Conteneurisation complète' },
  { name: 'Wave / Orange Money', icon: <CreditCard className="w-5 h-5" />, desc: 'Paiements locaux intégrés' },
  { name: 'JWT Auth', icon: <Lock className="w-5 h-5" />, desc: 'Authentification sécurisée' },
  { name: 'Redis', icon: <Zap className="w-5 h-5" />, desc: 'Cache & sessions' },
  { name: 'Scikit-learn', icon: <Cpu className="w-5 h-5" />, desc: 'Machine Learning' },
];

const STATS = [
  { value: '60%', label: 'Temps de prep économisé' },
  { value: 'FCFA', label: 'Tarification locale' },
  { value: '100%', label: 'Conçu au Sénégal' },
  { value: '24h', label: 'Support technique réactif' },
];

export default function FeaturesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Fonctionnalités Complètes
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Tout ce dont vous avez besoin,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                déjà construit.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Plus de 50 composants, 20+ services backend, et une architecture 
              production-ready. Concentrez-vous sur votre business, pas sur le boilerplate.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-teal-400">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Cards */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trois modules. <span className="text-teal-400">Infinies possibilités.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Chaque module est autonome et peut être utilisé séparément ou combiné 
              pour créer exactement le SaaS dont vous avez besoin.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURE_CARDS.map((card) => (
              <Link
                key={card.href}
                to={card.href}
                className={`group relative rounded-2xl border ${card.borderColor} bg-slate-900/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl ${card.iconBg} border border-slate-700/50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {card.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-800/60 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {card.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">{card.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {card.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-teal-400 font-semibold group-hover:gap-3 transition-all">
                    Explorer le module
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs font-medium text-slate-400 mb-4">
              <GitBranch className="w-3 h-3 text-teal-400" />
              STACK TECHNIQUE
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Technologies <span className="text-teal-400">modernes et éprouvées</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Un stack technique choisi pour la performance, la maintenabilité et l'adoption par la communauté.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="group p-5 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-teal-500/30 hover:bg-slate-800/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h4 className="font-semibold text-white mb-1">{tech.name}</h4>
                <p className="text-xs text-slate-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Features List */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Liste complète des <span className="text-teal-400">fonctionnalités</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Prep */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold mb-4">
                <Database className="w-5 h-5 text-blue-400" />
                Ingestion & Nettoyage
              </div>
              {[
                'Upload multi-fichiers CSV/Excel',
                'Détection automatique de types',
                'Nettoyage des doublons intelligent',
                'Imputation de valeurs manquantes',
                'Normalisation & Scaling',
                'Encodage des variables catégorielles',
                'Filtrage avancé par conditions',
                'Validation de schéma de données',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-400">
                  <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* AI */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold mb-4">
                <Brain className="w-5 h-5 text-purple-400" />
                Exploration & IA
              </div>
              {[
                'Visualisations Auto-EDA interactives',
                'Analyses de corrélation de Pearson',
                'Distribution et densité univariée',
                'Génération de rapports PDF exécutifs',
                'Moteur de recommandation IA',
                'Détection d\'anomalies statistique',
                'Analyse de séries temporelles',
                'Interprétabilité des modèles (SHAP)',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-400">
                  <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Workflow */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                Export & Intégration
              </div>
              {[
                'Export vers Scripts Python (.py)',
                'Génération de Notebook Jupyter (.ipynb)',
                'API REST d\'intégration directe',
                'Intégration Wave & Orange Money',
                'Pipeline CI/CD Docker pré-configuré',
                'Export vers SQL (PostgreSQL, MySQL)',
                'Monitoring des versions de datasets',
                'Support technique local au Sénégal',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-400">
                  <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à lancer votre SaaS ?
          </h2>
          <p className="text-slate-400 mb-8">
            Rejoignez plus de 2,400 développeurs qui ont déjà gagné des centaines d'heures grâce à SaaS-Data Engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 hover:scale-105"
            >
              Voir les tarifs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-all"
            >
              Lire la documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
