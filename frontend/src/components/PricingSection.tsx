import { Check, Star, Zap, Crown, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import api from '../utils/api';

interface PricePlan {
  name: string;
  price: number;
  period: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  highlighted: boolean;
  badge?: string;
  ctaLabel: string;
  gradient: string;
}

const PLANS: PricePlan[] = [
  {
    name: 'Starter',
    price: 8000,
    period: 'par mois',
    description: 'Idéal pour les data scientists indépendants et étudiants.',
    icon: <Zap className="w-5 h-5" />,
    features: [
      'Nettoyage de données Auto-EDA',
      'Upload jusqu\'à 100 Mo',
      'Export vers CSV/Excel',
      'Support par email standard',
      'Intégration Wave & Orange Money',
      'Accès aux tutoriels de base',
      '1 utilisateur unique',
    ],
    highlighted: false,
    ctaLabel: 'Commencer Starter',
    gradient: 'from-slate-700 to-slate-600',
  },
  {
    name: 'Pro',
    price: 18000,
    period: 'par mois',
    description: 'Le choix des experts pour automatiser les pipelines complexes.',
    icon: <Star className="w-5 h-5" />,
    features: [
      'Tout le Plan Starter inclus',
      'Module IA Décisionnel complet',
      'Export de scripts Python/Jupyter',
      'Upload jusqu\'à 1 Go',
      'Support prioritaire 24/7',
      'Auto Feature Engineering',
      'Validateur de modèles intégré',
    ],
    highlighted: true,
    badge: 'Plus Populaire',
    ctaLabel: 'Obtenir le Plan Pro',
    gradient: 'from-teal-500 to-teal-400',
  },
  {
    name: 'Entreprise',
    price: 45000,
    period: 'par mois',
    description: 'La puissance totale pour les équipes et agences data.',
    icon: <Crown className="w-5 h-5" />,
    features: [
      'Tout le Plan Pro inclus',
      'Multi-utilisateurs (jusqu\'à 5)',
      'API d\'intégration directe',
      'Déploiement sur site possible',
      'Accompagnement stratégique',
      'SLA Garanti à 99.9%',
      'Formation personnalisée équipe',
    ],
    highlighted: false,
    ctaLabel: 'Contacter l\'Équipe',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export default function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (planName: string) => {
    setLoading(planName);
    try {
      const response = await api.post('/billing/create-checkout-session', {
        plan: planName.toLowerCase(),
      });
      
      const { checkout_url } = response.data;
      if (checkout_url) {
        window.location.href = checkout_url;
      }
    } catch (err: any) {
      console.error('Purchase error:', err);
      if (err.response?.status === 401) {
        alert('Veuillez vous connecter pour effectuer un achat.');
        window.location.href = '/login';
      } else {
        alert('Erreur lors de la création de la session de paiement.');
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-500/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs font-medium text-slate-400 mb-4">
            💰 TARIFICATION LOCALE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Gagnez du temps, <span className="text-teal-400">multipliez votre impact.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tarifs adaptés au marché sénégalais. Payez en FCFA via Wave, Orange Money ou Carte Bancaire.
            Le ROI se mesure en semaines de travail économisées.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-teal-500/10 to-slate-900/90 border-2 border-teal-500/40 shadow-2xl shadow-teal-500/10'
                  : 'bg-slate-900/60 border border-slate-700/50 hover:border-slate-600'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-bl-lg">
                    <span>{plan.badge}</span>
                  </div>
                </div>
              )}

              <div className="p-7">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plan.highlighted
                        ? 'bg-teal-500/20 text-teal-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{plan.price.toLocaleString()}</span>
                    <span className="text-sm text-slate-500">FCFA</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1"><span>{plan.period}</span></p>
                </div>

                <p className="text-sm text-slate-400 mb-6 leading-relaxed"><span>{plan.description}</span></p>

                {/* CTA */}
                <button
                  onClick={() => handlePurchase(plan.name)}
                  disabled={!!loading}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-teal-500/50 hover:text-teal-400'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.name ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      {plan.ctaLabel}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? 'text-teal-400' : 'text-slate-600'
                        }`}
                      />
                      <span className="text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Garantie satisfait ou remboursé 30 jours</p>
              <p className="text-xs text-slate-500">Aucune question posée. Paiement sécurisé par Stripe.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
