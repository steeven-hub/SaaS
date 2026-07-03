import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Clock, DollarSign, Zap, AlertTriangle } from 'lucide-react';

const COMPARISON_DATA = [
  {
    category: 'Configuration initiale',
    items: [
      { feature: 'Project setup & config', scratch: '4-8h', saas_data_engine: '5 min' },
      { feature: 'Architecture fichiers', scratch: '2-4h', saas_data_engine: 'Inclus' },
      { feature: 'Linting & formatting', scratch: '1-2h', saas_data_engine: 'Inclus' },
      { feature: 'Git hooks & CI/CD', scratch: '2-4h', saas_data_engine: 'Inclus' },
    ],
  },
  {
    category: 'Authentification',
    items: [
      { feature: 'JWT + Refresh tokens', scratch: '8-16h', saas_data_engine: 'Inclus' },
      { feature: 'OAuth2 (Google, GitHub)', scratch: '4-8h', saas_data_engine: 'Inclus' },
      { feature: 'Email verification', scratch: '2-4h', saas_data_engine: 'Inclus' },
      { feature: 'Password reset flow', scratch: '2-4h', saas_data_engine: 'Inclus' },
      { feature: 'Roles & permissions', scratch: '4-8h', saas_data_engine: 'Inclus' },
      { feature: '2FA TOTP', scratch: '4-6h', saas_data_engine: 'Inclus' },
    ],
  },
  {
    category: 'Paiements Stripe',
    items: [
      { feature: 'Checkout Sessions', scratch: '4-8h', saas_data_engine: 'Inclus' },
      { feature: 'Subscriptions', scratch: '8-12h', saas_data_engine: 'Inclus' },
      { feature: 'Webhooks handlers', scratch: '4-6h', saas_data_engine: 'Inclus' },
      { feature: 'Customer portal', scratch: '2-4h', saas_data_engine: 'Inclus' },
      { feature: 'Invoices', scratch: '2-4h', saas_data_engine: 'Inclus' },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      { feature: 'Docker setup', scratch: '4-8h', saas_data_engine: 'Inclus' },
      { feature: 'Docker Compose multi-services', scratch: '2-4h', saas_data_engine: 'Inclus' },
      { feature: 'Env variables management', scratch: '1-2h', saas_data_engine: 'Inclus' },
      { feature: 'Database migrations', scratch: '2-4h', saas_data_engine: 'Inclus' },
      { feature: 'Redis caching', scratch: '2-4h', saas_data_engine: 'Inclus' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { feature: 'UI Components library', scratch: '16-24h', saas_data_engine: 'Inclus' },
      { feature: 'Responsive layouts', scratch: '8-12h', saas_data_engine: 'Inclus' },
      { feature: 'Dark mode', scratch: '2-4h', saas_data_engine: 'Inclus' },
      { feature: 'Form validation', scratch: '4-8h', saas_data_engine: 'Inclus' },
      { feature: 'Error handling', scratch: '2-4h', saas_data_engine: 'Inclus' },
    ],
  },
  {
    category: 'Module IA (Plan Pro+)',
    items: [
      { feature: 'Auto-EDA', scratch: '16-24h', saas_data_engine: 'Inclus' },
      { feature: 'ML Pipeline', scratch: '24-40h', saas_data_engine: 'Inclus' },
      { feature: 'PDF Reports', scratch: '8-16h', saas_data_engine: 'Inclus' },
      { feature: 'Analytics Dashboard', scratch: '16-24h', saas_data_engine: 'Inclus' },
    ],
  },
];

const TOTALS = {
  scratch: { min: 140, max: 240 },
  saas_data_engine: '5 min',
};

export default function ComparePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            <span className="text-red-400">From Scratch</span> vs{' '}
            <span className="text-teal-400">SaaS-Data Engine</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
            Combien de temps perdez-vous à reconfigurer les mêmes choses à chaque projet ? 
            Voici la comparaison honnête.
          </p>

          {/* Quick comparison */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* From Scratch */}
            <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <Clock className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">From Scratch</h3>
              <div className="text-4xl font-black text-red-400 mb-2">
                {TOTALS.scratch.min}-{TOTALS.scratch.max}h
              </div>
              <p className="text-slate-500">de développement répétitif</p>
              <div className="mt-6 space-y-2 text-left">
                {[
                  'Configurer auth à chaque fois',
                  'Réinventer Stripe integration',
                  'Réécrire Docker setup',
                  'Recoder les mêmes composants',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* SaaS-Data Engine */}
            <div className="p-8 rounded-2xl bg-teal-500/5 border border-teal-500/20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-500/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">SaaS-Data Engine</h3>
              <div className="text-4xl font-black text-teal-400 mb-2">
                5 minutes
              </div>
              <p className="text-slate-500">et vous êtes prêt à coder</p>
              <div className="mt-6 space-y-2 text-left">
                {[
                  'Auth complète pré-configurée',
                  'Stripe prêt à encaisser',
                  'Docker one-command deploy',
                  'Composants réutilisables',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Comparaison <span className="text-teal-400">détaillée</span>
          </h2>

          <div className="space-y-8">
            {COMPARISON_DATA.map((section) => (
              <div key={section.category}>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  {section.category}
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-800/50">
                  <table className="w-full">
                    <thead className="bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Fonctionnalité</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-red-400">From Scratch</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-teal-400">SaaS-Data Engine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {section.items.map((item) => (
                        <tr key={item.feature} className="hover:bg-slate-800/30">
                          <td className="px-4 py-3 text-sm text-slate-300">{item.feature}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="px-2 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-mono">
                              {item.scratch}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="px-2 py-1 rounded-md bg-teal-500/10 text-teal-400 text-xs font-semibold">
                              {item.saas_data_engine}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800/50 border border-slate-700/50">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="text-sm text-slate-500 mb-1">Temps Total (From Scratch)</div>
                <div className="text-3xl font-bold text-red-400">{TOTALS.scratch.min}-{TOTALS.scratch.max}h</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-500 mb-1">Vous économisez</div>
                <div className="text-3xl font-bold text-teal-400">140h+</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-500 mb-1">Temps avec SaaS-Data Engine</div>
                <div className="text-3xl font-bold text-teal-400">5 min</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Et en termes de <span className="text-teal-400">coût</span> ?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* DIY Cost */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-bold text-white">Développer vous-même</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Temps développeur (150h × 50$/h)</span>
                  <span className="font-mono text-white">$7,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recherche & debugging</span>
                  <span className="font-mono text-white">$2,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tests & corrections</span>
                  <span className="font-mono text-white">$1,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Documentation</span>
                  <span className="font-mono text-white">$1,000</span>
                </div>
                <div className="pt-4 border-t border-slate-700 flex justify-between">
                  <span className="font-semibold text-white">Total estimé</span>
                  <span className="font-mono font-bold text-red-400">$12,000+</span>
                </div>
              </div>
            </div>

            {/* SaaS-Data Engine Cost */}
            <div className="p-8 rounded-2xl bg-teal-500/5 border border-teal-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-teal-400" />
                <h3 className="text-xl font-bold text-white">Avec SaaS-Data Engine</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Plan Pro (recommandé)</span>
                  <span className="font-mono text-white">$149</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Personnalisation (10h × 50$/h)</span>
                  <span className="font-mono text-white">$500</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Recherche & debugging</span>
                  <span className="font-mono line-through">$0</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Documentation</span>
                  <span className="font-mono">Incluse</span>
                </div>
                <div className="pt-4 border-t border-teal-500/30 flex justify-between">
                  <span className="font-semibold text-white">Total estimé</span>
                  <span className="font-mono font-bold text-teal-400">$649</span>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-lg bg-teal-500/10 border border-teal-500/30">
                <div className="flex items-center gap-2 text-teal-400 font-semibold">
                  <Check className="w-5 h-5" />
                  Vous économisez $11,351
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-8 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-400 font-medium">Le vrai coût du "from scratch"</p>
              <p className="text-sm text-slate-400 mt-1">
                Sans compter le coût d'opportunité : pendant que vous configurez l'auth et Stripe, 
                vos concurrents lancent leur produit et acquièrent vos clients potentiels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Le choix est évident, non ?
          </h2>
          <p className="text-slate-400 mb-8">
            Arrêtez de réinventer la roue. Lancez votre SaaS aujourd'hui.
          </p>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all"
          >
            Obtenir SaaS-Data Engine
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
