import { Link } from 'react-router-dom';
import { 
  Rocket, CheckCircle, Clock, Sparkles, ArrowRight,
  Brain, Shield, Zap, Globe, Smartphone, Bot
} from 'lucide-react';

interface RoadmapItem {
  quarter: string;
  status: 'done' | 'in-progress' | 'planned';
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
    tags: string[];
  }[];
}

const ROADMAP: RoadmapItem[] = [
  {
    quarter: 'Q4 2024',
    status: 'done',
    items: [
      {
        title: 'Module IA Décisionnel v1.0',
        description: 'Auto-EDA, prédictions ML et rapports PDF automatiques.',
        icon: <Brain className="w-5 h-5" />,
        tags: ['IA', 'Analytics'],
      },
      {
        title: 'Intégration Stripe complète',
        description: 'Checkout, subscriptions, webhooks et customer portal.',
        icon: <Shield className="w-5 h-5" />,
        tags: ['Paiements', 'SaaS'],
      },
      {
        title: 'Mode Hackathon v1.0',
        description: 'Validateur Kaggle/Zindi et auto feature engineering.',
        icon: <Zap className="w-5 h-5" />,
        tags: ['Data Science', 'ML'],
      },
    ],
  },
  {
    quarter: 'Q1 2025',
    status: 'done',
    items: [
      {
        title: 'Angular 17+ avec Signals',
        description: 'Migration vers Angular 17 avec le nouveau système de réactivité.',
        icon: <Sparkles className="w-5 h-5" />,
        tags: ['Frontend', 'Performance'],
      },
      {
        title: 'Module IA v2.0',
        description: 'Nouveau moteur de prédiction optimisé (+8% accuracy).',
        icon: <Brain className="w-5 h-5" />,
        tags: ['IA', 'Performance'],
      },
      {
        title: 'Dashboard Analytics temps réel',
        description: 'WebSocket pour les mises à jour en direct.',
        icon: <Zap className="w-5 h-5" />,
        tags: ['Analytics', 'Realtime'],
      },
    ],
  },
  {
    quarter: 'Q2 2025',
    status: 'in-progress',
    items: [
      {
        title: 'Multi-tenancy',
        description: 'Support complet pour les applications SaaS multi-clients.',
        icon: <Globe className="w-5 h-5" />,
        tags: ['SaaS', 'Enterprise'],
      },
      {
        title: 'API GraphQL',
        description: 'Alternative GraphQL à l\'API REST existante.',
        icon: <Zap className="w-5 h-5" />,
        tags: ['API', 'Backend'],
      },
      {
        title: 'Templates d\'emails',
        description: 'Bibliothèque de templates emails responsive pré-designés.',
        icon: <Sparkles className="w-5 h-5" />,
        tags: ['Email', 'Design'],
      },
    ],
  },
  {
    quarter: 'Q3 2025',
    status: 'planned',
    items: [
      {
        title: 'App Mobile (React Native)',
        description: 'Template mobile companion pour votre SaaS.',
        icon: <Smartphone className="w-5 h-5" />,
        tags: ['Mobile', 'React Native'],
      },
      {
        title: 'Intégration LLM',
        description: 'Connecteurs OpenAI, Anthropic et modèles open-source.',
        icon: <Bot className="w-5 h-5" />,
        tags: ['IA', 'LLM'],
      },
      {
        title: 'Module Notifications',
        description: 'Push, email, SMS et in-app notifications centralisées.',
        icon: <Sparkles className="w-5 h-5" />,
        tags: ['Notifications', 'UX'],
      },
    ],
  },
  {
    quarter: 'Q4 2025',
    status: 'planned',
    items: [
      {
        title: 'Admin Dashboard',
        description: 'Interface d\'administration complète pour gérer vos utilisateurs.',
        icon: <Shield className="w-5 h-5" />,
        tags: ['Admin', 'Dashboard'],
      },
      {
        title: 'Analytics avancées',
        description: 'Cohort analysis, funnels et retention metrics.',
        icon: <Brain className="w-5 h-5" />,
        tags: ['Analytics', 'Business'],
      },
      {
        title: 'Marketplace de plugins',
        description: 'Écosystème de modules additionnels par la communauté.',
        icon: <Globe className="w-5 h-5" />,
        tags: ['Ecosystem', 'Community'],
      },
    ],
  },
];

const STATUS_CONFIG = {
  done: {
    label: 'Terminé',
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
  },
  'in-progress': {
    label: 'En cours',
    icon: <Clock className="w-4 h-4" />,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  planned: {
    label: 'Planifié',
    icon: <Rocket className="w-4 h-4" />,
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
  },
};

export default function RoadmapPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Roadmap
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            L'avenir de{' '}
            <span className="text-teal-400">SaaS-Data Engine</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Découvrez les fonctionnalités à venir. Notre roadmap est guidée par 
            les retours de notre communauté de développeurs.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <div
                key={key}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg} ${config.border} border`}
              >
                <span className={config.color}>{config.icon}</span>
                <span className={`text-sm ${config.color}`}>{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {ROADMAP.map((quarter, qi) => {
              const status = STATUS_CONFIG[quarter.status];
              
              return (
                <div key={qi} className="relative">
                  {/* Quarter header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${status.bg} ${status.border} border`}>
                      <span className={status.color}>{status.icon}</span>
                      <span className={`font-bold ${status.color}`}>{quarter.quarter}</span>
                    </div>
                    <span className={`text-sm ${status.color}`}>{status.label}</span>
                    <div className="flex-1 h-px bg-slate-800" />
                  </div>

                  {/* Items */}
                  <div className="grid md:grid-cols-3 gap-4 pl-4 border-l-2 border-slate-800 ml-2">
                    {quarter.items.map((item, ii) => (
                      <div
                        key={ii}
                        className={`p-5 rounded-xl bg-slate-900/50 border ${
                          quarter.status === 'done' ? 'border-green-500/20' :
                          quarter.status === 'in-progress' ? 'border-amber-500/20' :
                          'border-slate-800/50'
                        } hover:border-slate-700 transition-colors`}
                      >
                        <div className={`w-10 h-10 rounded-lg ${status.bg} flex items-center justify-center ${status.color} mb-4`}>
                          {item.icon}
                        </div>
                        <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-400 mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Request */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-700/50">
            <Sparkles className="w-12 h-12 text-teal-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Une idée de fonctionnalité ?
            </h2>
            <p className="text-slate-400 mb-6">
              Notre roadmap est façonnée par les besoins de notre communauté. 
              Partagez vos suggestions !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all"
              >
                Proposer une idée
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl border border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-all"
              >
                Voir sur GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            N'attendez pas pour commencer
          </h2>
          <p className="text-slate-400 mb-8">
            Toutes les fonctionnalités "Terminé" sont déjà disponibles. 
            Obtenez le kit maintenant et bénéficiez des mises à jour à vie.
          </p>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all"
          >
            Voir les tarifs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
