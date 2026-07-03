import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight, Building2, Calendar, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Marie Dubois',
    role: 'CTO',
    company: 'FinTech Solutions',
    avatar: 'MD',
    avatarColor: 'from-purple-500 to-pink-500',
    rating: 5,
    content: 'SaaS-Data Engine nous a fait gagner 3 semaines de développement. L\'architecture est propre, le code est bien documenté, et le support est réactif. On a pu se concentrer sur notre cœur de métier dès le premier jour.',
    metrics: { timeSaved: '3 semaines', revenue: '+40%' },
    date: 'Février 2025',
  },
  {
    name: 'Thomas Martin',
    role: 'Développeur Freelance',
    company: 'Indépendant',
    avatar: 'TM',
    avatarColor: 'from-blue-500 to-cyan-500',
    rating: 5,
    content: 'En tant que freelance, chaque heure compte. Avec SaaS-Data Engine, je livre des MVPs en 2 semaines au lieu de 6. Mes clients sont impressionnés et je peux prendre plus de projets. ROI immédiat.',
    metrics: { timeSaved: '4 semaines', projects: '+3/mois' },
    date: 'Mars 2025',
  },
  {
    name: 'Sophie Laurent',
    role: 'Data Scientist',
    company: 'AI Startup',
    avatar: 'SL',
    avatarColor: 'from-amber-500 to-orange-500',
    rating: 5,
    content: 'Le module Hackathon est une tuerie. J\'ai atteint le top 5% sur Kaggle grâce à l\'auto Feature Engineering et au validateur de soumissions. Un must-have pour tout compétiteur sérieux.',
    metrics: { kaggleRank: 'Top 5%', competitions: '12 médailles' },
    date: 'Janvier 2025',
  },
  {
    name: 'Alexandre Petit',
    role: 'Fondateur',
    company: 'SaaS Analytics',
    avatar: 'AP',
    avatarColor: 'from-green-500 to-emerald-500',
    rating: 5,
    content: 'J\'ai lancé mon SaaS B2B en 10 jours avec SaaS-Data Engine. Stripe, auth, dashboard analytics — tout était déjà là. 6 mois plus tard, on a 200 clients payants. Meilleur investissement de ma carrière.',
    metrics: { launchTime: '10 jours', clients: '200+' },
    date: 'Décembre 2024',
  },
  {
    name: 'Camille Roux',
    role: 'Lead Developer',
    company: 'E-commerce Scale',
    avatar: 'CR',
    avatarColor: 'from-red-500 to-rose-500',
    rating: 5,
    content: 'La qualité du code m\'a bluffé. C\'est exactement comme ça que j\'aurais structuré le projet moi-même, mais en mieux. Les conventions sont respectées, les tests sont là, la doc est complète.',
    metrics: { codeQuality: 'A+', testCoverage: '85%' },
    date: 'Avril 2025',
  },
  {
    name: 'Nicolas Bernard',
    role: 'Tech Lead',
    company: 'Consulting Digital',
    avatar: 'NB',
    avatarColor: 'from-indigo-500 to-violet-500',
    rating: 4,
    content: 'On utilise SaaS-Data Engine comme base pour tous nos projets clients. Le module IA pour les rapports PDF a été un game-changer pour nos dashboards exécutifs. Les clients adorent.',
    metrics: { clientSatisfaction: '98%', projectsDelivered: '15+' },
    date: 'Mai 2025',
  },
];

const CASE_STUDIES = [
  {
    company: 'FinTech Solutions',
    logo: 'FT',
    industry: 'Finance',
    challenge: 'Lancer une plateforme d\'analyse financière en 1 mois',
    solution: 'Utilisation de SaaS-Data Engine avec le module IA pour l\'analyse prédictive',
    results: [
      { label: 'Time to market', value: '3 semaines', change: '-70%' },
      { label: 'Coût de développement', value: '15K€', change: '-60%' },
      { label: 'Clients acquis (6 mois)', value: '150+', change: '' },
    ],
    quote: 'Sans SaaS-Data Engine, on aurait mis 3 mois et dépensé 40K€.',
  },
  {
    company: 'AI Startup',
    logo: 'AI',
    industry: 'Intelligence Artificielle',
    challenge: 'Créer un MVP pour une levée de fonds Seed',
    solution: 'SaaS-Data Engine Pro avec intégration complète du module analytics',
    results: [
      { label: 'MVP livré en', value: '2 semaines', change: '' },
      { label: 'Levée de fonds', value: '500K€', change: '' },
      { label: 'Valorisation', value: '2.5M€', change: '' },
    ],
    quote: 'Les investisseurs ont été impressionnés par la qualité du produit.',
  },
];

export default function TestimonialsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Témoignages
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Ils ont lancé leur SaaS avec{' '}
            <span className="text-teal-400">SaaS-Data Engine</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Découvrez comment nos clients ont gagné du temps, de l'argent et 
            lancé des produits qui cartonnent.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12">
            {[
              { value: '2,400+', label: 'Développeurs' },
              { value: '98%', label: 'Satisfaction' },
              { value: '40h', label: 'Économisées/projet' },
              { value: '4.9/5', label: 'Note moyenne' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-teal-400">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-slate-700 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold`}>
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{t.name}</h4>
                      <p className="text-xs text-slate-500">{t.role} • {t.company}</p>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-teal-500/20" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  "{t.content}"
                </p>

                {/* Metrics */}
                <div className="flex gap-4 pt-4 border-t border-slate-800/50">
                  {Object.entries(t.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-teal-400">{value}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Date */}
                <div className="flex items-center gap-1 mt-4 text-xs text-slate-600">
                  <Calendar className="w-3 h-3" />
                  {t.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Études de cas <span className="text-teal-400">détaillées</span>
            </h2>
            <p className="text-slate-400">
              Comment nos clients ont transformé leur business avec SaaS-Data Engine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {CASE_STUDIES.map((cs, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-slate-900/80 border border-slate-700/50"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xl">
                    {cs.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{cs.company}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Building2 className="w-3 h-3" />
                      {cs.industry}
                    </div>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Challenge</h4>
                    <p className="text-slate-300">{cs.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Solution</h4>
                    <p className="text-slate-300">{cs.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-800/50 mb-6">
                  {cs.results.map((r, j) => (
                    <div key={j} className="text-center">
                      <div className="text-xl font-bold text-white">{r.value}</div>
                      {r.change && <div className="text-xs text-teal-400">{r.change}</div>}
                      <div className="text-[10px] text-slate-500 mt-1">{r.label}</div>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="italic text-slate-400 border-l-2 border-teal-500 pl-4">
                  "{cs.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Rejoignez-les et lancez votre SaaS
          </h2>
          <p className="text-slate-400 mb-8">
            Plus de 2,400 développeurs font confiance à SaaS-Data Engine. Et vous ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all"
            >
              Voir les tarifs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl border border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-all"
            >
              Explorer les fonctionnalités
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
