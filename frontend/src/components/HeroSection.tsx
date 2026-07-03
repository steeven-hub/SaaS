import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Play, ArrowRight, CheckCircle, FileSpreadsheet, BarChart3, Sparkles } from 'lucide-react';

const DEMO_DATA = [
  { id: 1, name: 'revenue_q1.csv', rows: 12450, cols: 18, status: 'Analysé' },
  { id: 2, name: 'users_activity.csv', rows: 89320, cols: 24, status: 'Prêt' },
  { id: 3, name: 'product_metrics.csv', rows: 5670, cols: 12, status: 'En cours' },
];

const MINI_CHART_BARS = [35, 52, 78, 63, 91, 45, 67, 82, 55, 73, 88, 60];

export default function HeroSection() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setUploaded(true);
    }, 2000);
  }, []);

  const simulateUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setUploaded(true);
    }, 2000);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(45,212,191,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — Text */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Nouveau — Module IA Décisionnel v2.0
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="text-white">Accélérez vos projets </span>
              <span className="shimmer-text">Data & IA</span>
              <span className="text-white"> au Sénégal.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed">
              <span className="text-teal-400 font-bold">SaaS-Data Engine</span> : Automatisez 60% du nettoyage et de l'exploration de vos données. Conçu pour les data scientists et développeurs, avec intégration <span className="text-slate-300">Wave & Orange Money</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#pricing"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 hover:scale-105 animate-pulse-glow"
              >
                Commencer Gratuitement
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/features/ai-engine"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-400 hover:bg-teal-500/5 transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                Découvrir l'Auto-EDA
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {[
                  'bg-gradient-to-br from-blue-400 to-blue-600',
                  'bg-gradient-to-br from-purple-400 to-purple-600',
                  'bg-gradient-to-br from-teal-400 to-teal-600',
                  'bg-gradient-to-br from-orange-400 to-orange-600',
                  'bg-gradient-to-br from-pink-400 to-pink-600',
                ].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-slate-950 flex items-center justify-center text-xs font-bold text-white`}>
                    {['S', 'D', 'E', 'A', 'I'][i]}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-500">
                Propulsé par le <span className="text-teal-400 font-semibold">Sénégal Numérique 2025</span>
              </div>
            </div>
          </div>

          {/* Right Column — Live Demo Widget */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center text-xs text-slate-500 font-mono">
                  saas-data-engine — Auto-EDA Module
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Drop zone */}
                {!uploaded && !analyzing && (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={simulateUpload}
                    className={`cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      isDragOver
                        ? 'border-teal-400 bg-teal-500/10'
                        : 'border-slate-700 hover:border-teal-500/50 hover:bg-slate-800/50'
                    }`}
                  >
                    <Upload className={`w-10 h-10 mx-auto mb-3 transition-colors ${isDragOver ? 'text-teal-400' : 'text-slate-600'}`} />
                    <p className="text-sm text-slate-400 mb-1">Glissez un fichier CSV ici</p>
                    <p className="text-xs text-slate-600">ou cliquez pour simuler un upload</p>
                  </div>
                )}

                {/* Analyzing state */}
                {analyzing && (
                  <div className="border border-teal-500/30 bg-teal-500/5 rounded-xl p-8 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-teal-400 font-medium">Analyse en cours...</p>
                    <p className="text-xs text-slate-500 mt-1">Auto-EDA & Feature Detection</p>
                  </div>
                )}

                {/* Results */}
                {uploaded && (
                  <div className="space-y-4 animate-[fadeIn_0.5s_ease]">
                    <div className="flex items-center gap-2 text-teal-400 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      3 fichiers analysés avec succès
                    </div>

                    {/* Mini table */}
                    <div className="overflow-hidden rounded-lg border border-slate-700/50">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-slate-800/50 text-slate-500">
                            <th className="px-3 py-2 text-left font-medium">Fichier</th>
                            <th className="px-3 py-2 text-right font-medium">Lignes</th>
                            <th className="px-3 py-2 text-right font-medium">Cols</th>
                            <th className="px-3 py-2 text-right font-medium">Statut</th>
                          </tr>
                        </thead>
                        <tbody>
                          {DEMO_DATA.map((d) => (
                            <tr key={d.id} className="border-t border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                              <td className="px-3 py-2 text-slate-300 flex items-center gap-1.5">
                                <FileSpreadsheet className="w-3 h-3 text-teal-400" />
                                {d.name}
                              </td>
                              <td className="px-3 py-2 text-right text-slate-400 font-mono">{d.rows.toLocaleString()}</td>
                              <td className="px-3 py-2 text-right text-slate-400 font-mono">{d.cols}</td>
                              <td className="px-3 py-2 text-right">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                  d.status === 'Analysé' ? 'bg-teal-500/20 text-teal-400' :
                                  d.status === 'Prêt' ? 'bg-blue-500/20 text-blue-400' :
                                  'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {d.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mini chart */}
                    <div className="bg-slate-800/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          Distribution automatique
                        </span>
                        <span className="text-xs text-teal-400 font-mono">Score: 94.2%</span>
                      </div>
                      <div className="flex items-end gap-1 h-16">
                        {MINI_CHART_BARS.map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm bg-gradient-to-t from-teal-500/60 to-teal-400/80 transition-all duration-500"
                            style={{
                              height: `${h}%`,
                              animationDelay: `${i * 0.05}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
