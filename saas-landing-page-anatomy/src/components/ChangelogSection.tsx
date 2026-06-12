import { GitBranch, CheckCircle, Zap, Shield, Bug, Sparkles } from 'lucide-react';

interface ChangeEntry {
  date: string;
  relative: string;
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'fix' | 'security';
  icon: React.ReactNode;
}

const CHANGES: ChangeEntry[] = [
  {
    date: '2025-06-18',
    relative: 'Il y a 2 jours',
    title: 'Module IA Décisionnel v2.0',
    description: 'Nouveau moteur de prédiction avec Random Forest optimisé. Score moyen +8%.',
    type: 'feature',
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
  {
    date: '2025-06-15',
    relative: 'Il y a 5 jours',
    title: 'Optimisation openpyxl (+20% rapidité)',
    description: 'Réécriture du parser Excel pour gérer des fichiers de 500K+ lignes sans lag.',
    type: 'improvement',
    icon: <Zap className="w-3.5 h-3.5" />,
  },
  {
    date: '2025-06-12',
    relative: 'Il y a 8 jours',
    title: 'Fix bug export PDF sur Safari',
    description: 'Correction du rendering des graphiques dans les rapports PDF générés sur Safari/WebKit.',
    type: 'fix',
    icon: <Bug className="w-3.5 h-3.5" />,
  },
  {
    date: '2025-06-10',
    relative: 'Il y a 10 jours',
    title: 'Mise à jour sécurité JWT',
    description: 'Migration vers python-jose 3.3 avec algorithme RS256 par défaut.',
    type: 'security',
    icon: <Shield className="w-3.5 h-3.5" />,
  },
  {
    date: '2025-06-07',
    relative: 'Il y a 13 jours',
    title: 'Validateur Kaggle/Zindi v1.5',
    description: 'Support des formats de soumission multi-colonnes et validation automatique des types.',
    type: 'feature',
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
];

const TYPE_COLORS = {
  feature: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
  improvement: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  fix: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  security: 'text-red-400 bg-red-500/10 border-red-500/30',
};

const TYPE_LABELS = {
  feature: 'Nouveauté',
  improvement: 'Amélioration',
  fix: 'Correction',
  security: 'Sécurité',
};

export default function ChangelogSection() {
  return (
    <section id="changelog" className="relative py-24">
      <div className="absolute inset-0 bg-slate-950" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs font-medium text-slate-400 mb-4">
            <GitBranch className="w-3 h-3 text-teal-400" />
            CHANGELOG
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Un projet <span className="text-teal-400">activement maintenu</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Des mises à jour régulières, des corrections rapides et des nouvelles
            fonctionnalités chaque semaine.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/50 via-slate-700/50 to-transparent" />

          <div className="space-y-6">
            {CHANGES.map((entry, i) => (
              <div key={i} className="relative flex gap-6 group">
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${TYPE_COLORS[entry.type]} transition-transform group-hover:scale-110`}
                  >
                    {entry.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="bg-slate-900/50 rounded-xl border border-slate-800/50 p-5 group-hover:border-slate-700/60 transition-colors">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${TYPE_COLORS[entry.type]}`}
                      >
                        {TYPE_LABELS[entry.type]}
                      </span>
                      <span className="text-xs text-slate-600 font-mono">{entry.relative}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      {entry.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{entry.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load more hint */}
        <div className="text-center mt-8">
          <button className="px-6 py-2.5 rounded-lg border border-slate-700 text-sm text-slate-500 hover:text-teal-400 hover:border-teal-500/50 transition-colors">
            Voir tout le changelog →
          </button>
        </div>
      </div>
    </section>
  );
}
