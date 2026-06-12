import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, Search, ArrowRight, MessageSquare } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  // Général
  {
    category: 'Général',
    question: 'Qu\'est-ce que SaaS-Data Engine exactement ?',
    answer: 'SaaS-Data Engine est un Starter Kit complet pour développeurs qui veulent lancer un SaaS Data & IA rapidement. Il inclut un frontend Angular, un backend Python FastAPI, l\'intégration Stripe, Docker, et des modules IA/Analytics prêts à l\'emploi. Vous économisez 40+ heures de développement répétitif.',
  },
  {
    category: 'Général',
    question: 'À qui s\'adresse ce produit ?',
    answer: 'SaaS-Data Engine est conçu pour les développeurs freelance, les startups early-stage, et les équipes techniques qui veulent accélérer leur time-to-market. Si vous savez coder mais détestez reconfigurer l\'auth, Stripe et Docker à chaque projet, ce kit est fait pour vous.',
  },
  {
    category: 'Général',
    question: 'Quelles technologies sont utilisées ?',
    answer: 'Le stack inclut : Angular 17+ (frontend), Python FastAPI (backend), PostgreSQL (base de données), Redis (cache), Docker Compose (orchestration), Stripe (paiements), et scikit-learn (IA). Tout est versionné et documenté.',
  },
  // Licence
  {
    category: 'Licence',
    question: 'Puis-je utiliser le kit pour plusieurs projets ?',
    answer: 'Le plan Starter inclut une licence pour 1 projet. Les plans Pro et Compétiteur incluent une licence illimitée — vous pouvez utiliser le code sur autant de projets que vous voulez.',
  },
  {
    category: 'Licence',
    question: 'Puis-je revendre le code ou créer un produit concurrent ?',
    answer: 'Non. La licence vous autorise à utiliser le code dans vos propres projets SaaS, mais pas à revendre le kit lui-même ou à créer un produit similaire. Consultez les CGV pour les détails.',
  },
  {
    category: 'Licence',
    question: 'Les mises à jour sont-elles incluses ?',
    answer: 'Les plans Pro et Compétiteur incluent les mises à jour à vie. Le plan Starter inclut les mises à jour pendant 1 an. Vous conservez toujours l\'accès au code que vous avez téléchargé.',
  },
  // Paiement
  {
    category: 'Paiement',
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer: 'Nous acceptons toutes les cartes bancaires (Visa, Mastercard, Amex) via Stripe. Les paiements sont sécurisés et chiffrés. Nous ne stockons pas vos informations de carte.',
  },
  {
    category: 'Paiement',
    question: 'Y a-t-il une garantie satisfait ou remboursé ?',
    answer: 'Oui ! Nous offrons une garantie de 30 jours satisfait ou remboursé, sans questions posées. Si le kit ne répond pas à vos attentes, contactez-nous pour un remboursement complet.',
  },
  {
    category: 'Paiement',
    question: 'Recevrai-je une facture ?',
    answer: 'Oui, une facture conforme est générée automatiquement par Stripe et envoyée par email après chaque achat. Vous pouvez également la télécharger depuis votre espace client.',
  },
  // Technique
  {
    category: 'Technique',
    question: 'Comment recevoir le code après l\'achat ?',
    answer: 'Après le paiement, vous recevez immédiatement un email avec un lien de téléchargement et un accès au repository privé GitHub. Vous pouvez cloner le projet en quelques secondes.',
  },
  {
    category: 'Technique',
    question: 'Le code est-il documenté ?',
    answer: 'Absolument. Chaque fichier est commenté, et nous fournissons une documentation complète avec des guides de démarrage, des références API, et des exemples d\'utilisation.',
  },
  {
    category: 'Technique',
    question: 'Puis-je modifier le code librement ?',
    answer: 'Oui, vous avez un accès complet au code source. Vous pouvez le modifier, l\'adapter et le personnaliser selon vos besoins. C\'est votre code.',
  },
  // Support
  {
    category: 'Support',
    question: 'Quel support est inclus ?',
    answer: 'Le plan Starter inclut un support par email (réponse sous 48h). Les plans Pro et Compétiteur incluent un support prioritaire (réponse sous 24h) et l\'accès à notre communauté Slack privée.',
  },
  {
    category: 'Support',
    question: 'Proposez-vous de l\'accompagnement personnalisé ?',
    answer: 'Oui, nous proposons des sessions de consulting pour vous aider à démarrer ou à personnaliser le kit. Contactez-nous pour discuter de vos besoins spécifiques.',
  },
];

const CATEGORIES = ['Tous', 'Général', 'Licence', 'Paiement', 'Technique', 'Support'];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredFaq = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'Tous' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Questions <span className="text-teal-400">Fréquentes</span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-8">
              Trouvez rapidement les réponses à vos questions. 
              Vous ne trouvez pas ce que vous cherchez ? Contactez-nous.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-teal-500 text-slate-950'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFaq.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">Aucun résultat trouvé pour "{searchQuery}"</p>
              </div>
            ) : (
              filteredFaq.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 border border-slate-800/50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-500">
                        {item.category}
                      </span>
                      <span className="font-semibold text-white">{item.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ml-4 ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-6 pt-0">
                      <div className="pl-16 text-slate-400 leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/50 border border-slate-700/50">
            <MessageSquare className="w-12 h-12 text-teal-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-slate-400 mb-6">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
