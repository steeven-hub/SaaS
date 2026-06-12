import { Link } from 'react-router-dom';
import { 
  Brain, ArrowRight, ArrowLeft, Cpu, BarChart3, FileText,
  TrendingUp, Sparkles, Database, Zap, PieChart, LineChart, 
  Activity, Download, Table, Filter
} from 'lucide-react';

const AI_CAPABILITIES = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Auto-EDA',
    description: 'Analyse exploratoire automatique de vos données en une ligne de code.',
    features: ['Détection des types', 'Distributions', 'Corrélations', 'Outliers'],
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Prédictions ML',
    description: 'Moteur de machine learning avec sélection automatique du meilleur modèle.',
    features: ['Classification', 'Régression', 'Cross-validation', 'Metrics auto'],
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Rapports PDF',
    description: 'Génération automatique de rapports PDF professionnels.',
    features: ['Graphiques intégrés', 'KPIs clés', 'Recommandations', 'Export auto'],
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Dashboard Analytics',
    description: 'Tableaux de bord interactifs avec mise à jour en temps réel.',
    features: ['Widgets drag & drop', 'Filtres avancés', 'Export données', 'Alertes'],
  },
];

const METRICS_DEMO = [
  { label: 'Accuracy', value: 94.2, color: 'from-teal-500 to-teal-400' },
  { label: 'Precision', value: 91.8, color: 'from-blue-500 to-blue-400' },
  { label: 'Recall', value: 89.5, color: 'from-purple-500 to-purple-400' },
  { label: 'F1 Score', value: 90.6, color: 'from-pink-500 to-pink-400' },
];

const CODE_SAMPLE = `<span class="token-keyword">from</span> <span class="token-type">saas_data_engine</span> <span class="token-keyword">import</span> <span class="token-type">AIEngine</span>, <span class="token-type">ReportBuilder</span>

<span class="token-comment"># 🧠 Initialisation du moteur IA</span>
<span class="token-variable">engine</span> = <span class="token-type">AIEngine</span>()

<span class="token-comment"># 📊 Auto-EDA complet en une ligne</span>
<span class="token-variable">analysis</span> = <span class="token-variable">engine</span>.<span class="token-function">auto_eda</span>(<span class="token-variable">df</span>)
<span class="token-keyword">print</span>(<span class="token-variable">analysis</span>.summary)

<span class="token-comment"># 🎯 Entraînement automatique du meilleur modèle</span>
<span class="token-variable">model</span> = <span class="token-variable">engine</span>.<span class="token-function">train</span>(
    <span class="token-variable">X</span>=<span class="token-variable">df</span>.<span class="token-function">drop</span>(<span class="token-string">'target'</span>, <span class="token-variable">axis</span>=<span class="token-number">1</span>),
    <span class="token-variable">y</span>=<span class="token-variable">df</span>[<span class="token-string">'target'</span>],
    <span class="token-variable">task</span>=<span class="token-string">'classification'</span>
)

<span class="token-comment"># 📈 Prédictions</span>
<span class="token-variable">predictions</span> = <span class="token-variable">model</span>.<span class="token-function">predict</span>(<span class="token-variable">X_test</span>)
<span class="token-keyword">print</span>(<span class="token-string">f"Accuracy: {model.score:.2%}"</span>)

<span class="token-comment"># 📄 Génération du rapport PDF</span>
<span class="token-variable">report</span> = <span class="token-type">ReportBuilder</span>()
<span class="token-variable">report</span>.<span class="token-function">add_eda</span>(<span class="token-variable">analysis</span>)
<span class="token-variable">report</span>.<span class="token-function">add_model_metrics</span>(<span class="token-variable">model</span>)
<span class="token-variable">report</span>.<span class="token-function">export</span>(<span class="token-string">"rapport_client.pdf"</span>)`;

const DASHBOARD_FEATURES = [
  { icon: <PieChart className="w-4 h-4" />, label: 'Charts interactifs' },
  { icon: <Table className="w-4 h-4" />, label: 'DataTables avancées' },
  { icon: <Filter className="w-4 h-4" />, label: 'Filtres dynamiques' },
  { icon: <Activity className="w-4 h-4" />, label: 'Temps réel' },
  { icon: <Download className="w-4 h-4" />, label: 'Export multi-format' },
  { icon: <LineChart className="w-4 h-4" />, label: 'Trends & forecasts' },
];

export default function AiEnginePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/features" 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux fonctionnalités
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
                <Brain className="w-4 h-4" />
                B2B Ready
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                Cerveau IA{' '}
                <span className="text-purple-400">Décisionnel</span>
              </h1>
              
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Un moteur d'intelligence artificielle complet pour analyser vos données, 
                prédire des résultats et générer des rapports PDF professionnels automatiquement.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="http://localhost:8502"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Lancer l'Analyse Auto-EDA
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl border border-slate-700 text-slate-300 hover:border-purple-500/50 hover:text-purple-400 transition-all"
                >
                  Voir les Tarifs
                </Link>
              </div>
            </div>

            {/* Metrics visualization */}
            <div className="space-y-4">
              <div className="bg-slate-900/80 rounded-xl border border-slate-700/50 p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  Model Performance
                </div>
                <div className="space-y-4">
                  {METRICS_DEMO.map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">{m.label}</span>
                        <span className="text-white font-mono">{m.value}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${m.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${m.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Modèles', value: '12+', icon: <Database className="w-4 h-4" /> },
                  { label: 'Temps moyen', value: '<2s', icon: <Zap className="w-4 h-4" /> },
                  { label: 'Précision', value: '94%+', icon: <TrendingUp className="w-4 h-4" /> },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                      {s.icon}
                    </div>
                    <div className="text-xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="relative py-20">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Capacités <span className="text-purple-400">IA intégrées</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              De l'analyse exploratoire aux prédictions ML, tout est automatisé.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {AI_CAPABILITIES.map((cap) => (
              <div key={cap.title} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-500/30 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    {cap.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{cap.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{cap.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {cap.features.map((f) => (
                        <span key={f} className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-400">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                API <span className="text-teal-400">simple et puissante</span>
              </h2>
              <p className="text-slate-400 mb-8">
                Quelques lignes de code suffisent pour analyser vos données, 
                entraîner un modèle et générer un rapport professionnel.
              </p>

              <div className="space-y-4">
                {[
                  { step: '1', title: 'Auto-EDA', desc: 'Analyse automatique de la structure et qualité des données' },
                  { step: '2', title: 'Training', desc: 'Sélection et entraînement du meilleur modèle ML' },
                  { step: '3', title: 'Prédictions', desc: 'Inférence sur nouvelles données avec métriques' },
                  { step: '4', title: 'Rapport PDF', desc: 'Génération du document client-ready' },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{s.title}</h4>
                      <p className="text-sm text-slate-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code */}
            <div className="bg-slate-900/80 rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-slate-500 font-mono">example.py</span>
              </div>
              <pre className="p-5 text-[12px] leading-5 font-mono overflow-x-auto">
                <code dangerouslySetInnerHTML={{ __html: CODE_SAMPLE }} />
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Dashboard <span className="text-purple-400">Analytics</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Visualisez vos données et résultats ML dans un tableau de bord moderne et interactif.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Mock Dashboard */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-800/60 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-white">Analytics Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  {DASHBOARD_FEATURES.map((f) => (
                    <div key={f.label} className="px-2 py-1 rounded-md bg-slate-700/50 text-xs text-slate-400 flex items-center gap-1">
                      {f.icon}
                      <span className="hidden sm:inline">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Records', value: '125,430', change: '+12%' },
                    { label: 'Predictions', value: '89,200', change: '+8%' },
                    { label: 'Accuracy', value: '94.2%', change: '+2%' },
                    { label: 'Reports', value: '234', change: '+15%' },
                  ].map((kpi) => (
                    <div key={kpi.label} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/30">
                      <div className="text-xs text-slate-500 mb-1">{kpi.label}</div>
                      <div className="text-xl font-bold text-white">{kpi.value}</div>
                      <div className="text-xs text-teal-400">{kpi.change}</div>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="h-48 bg-slate-800/30 rounded-lg border border-slate-700/30 flex items-end justify-around p-4">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50].map((h, i) => (
                    <div
                      key={i}
                      className="w-8 rounded-t-md bg-gradient-to-t from-purple-600/80 to-pink-500/80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Transformez vos données en décisions
          </h2>
          <p className="text-slate-400 mb-8">
            Le module IA est inclus dans les plans Pro et Compétiteur.
          </p>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 hover:scale-105"
          >
            Voir les tarifs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
