import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Conditions Générales de Vente</h1>
              <p className="text-slate-500 text-sm">Dernière mise à jour : Juin 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="space-y-8 text-slate-300">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">1. Objet</h2>
                <p className="leading-relaxed">
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles 
                  entre SaaS-Data Engine (ci-après "le Vendeur") et toute personne physique ou morale 
                  effectuant un achat sur le site saas-data-engine.com (ci-après "l'Acheteur").
                </p>
                <p className="leading-relaxed mt-4">
                  Toute commande implique l'acceptation sans réserve des présentes CGV.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">2. Produits</h2>
                <p className="leading-relaxed">
                  SaaS-Data Engine commercialise des licences d'utilisation de code source (Starter Kit) 
                  permettant de développer des applications SaaS. Les produits sont décrits sur le site 
                  avec la plus grande exactitude possible.
                </p>
                <p className="leading-relaxed mt-4">
                  Les produits proposés sont :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Plan Starter (79$ USD) : Licence pour 1 projet, code source complet</li>
                  <li>Plan Pro (149$ USD) : Licence illimitée, modules IA inclus, mises à jour à vie</li>
                  <li>Plan Compétiteur (199$ USD) : Licence illimitée, tous les modules, accès communauté</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">3. Prix</h2>
                <p className="leading-relaxed">
                  Les prix sont indiqués en dollars américains (USD), hors taxes applicables. 
                  Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant entendu 
                  que le prix figurant sur le site le jour de la commande sera le seul applicable.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">4. Paiement</h2>
                <p className="leading-relaxed">
                  Le paiement s'effectue par carte bancaire via la plateforme sécurisée Stripe. 
                  Le débit est effectué au moment de la validation de la commande. Les données de 
                  paiement sont chiffrées et ne sont jamais stockées sur nos serveurs.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">5. Livraison</h2>
                <p className="leading-relaxed">
                  Les produits numériques sont livrés immédiatement après confirmation du paiement. 
                  L'Acheteur reçoit un email contenant un lien de téléchargement et un accès au 
                  repository GitHub privé.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">6. Licence d'utilisation</h2>
                <p className="leading-relaxed">
                  L'achat confère à l'Acheteur une licence non exclusive d'utilisation du code source 
                  pour ses propres projets. Cette licence autorise :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>L'utilisation du code dans des projets commerciaux personnels</li>
                  <li>La modification et l'adaptation du code</li>
                  <li>La création de produits dérivés pour ses propres clients</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Cette licence interdit :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>La revente ou redistribution du code source</li>
                  <li>La création d'un produit concurrent basé sur ce code</li>
                  <li>Le partage de l'accès au repository avec des tiers</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">7. Droit de rétractation</h2>
                <p className="leading-relaxed">
                  Conformément à notre politique de satisfaction, l'Acheteur dispose d'un délai de 
                  30 jours à compter de la date d'achat pour demander un remboursement intégral, 
                  sans avoir à justifier de motifs ni à payer de pénalités.
                </p>
                <p className="leading-relaxed mt-4">
                  Pour exercer ce droit, l'Acheteur doit contacter le service client à l'adresse 
                  contact@saas-data-engine.com. Le remboursement sera effectué sous 14 jours via le 
                  même moyen de paiement que celui utilisé pour l'achat initial.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">8. Support</h2>
                <p className="leading-relaxed">
                  Le support technique est fourni par email. Les délais de réponse varient selon 
                  le plan souscrit : 48h pour le plan Starter, 24h pour les plans Pro et Compétiteur.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">9. Responsabilité</h2>
                <p className="leading-relaxed">
                  Le Vendeur ne saurait être tenu responsable des dommages indirects, pertes de 
                  données ou de profits résultant de l'utilisation du code source. Le code est 
                  fourni "en l'état" et l'Acheteur est responsable de son adaptation à ses besoins.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">10. Droit applicable</h2>
                <p className="leading-relaxed">
                  Les présentes CGV sont soumises au droit français. En cas de litige, et après 
                  échec de toute tentative de résolution amiable, les tribunaux français seront 
                  seuls compétents.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">11. Contact</h2>
                <p className="leading-relaxed">
                  Pour toute question relative aux présentes CGV, vous pouvez nous contacter :
                </p>
                <ul className="list-none mt-4 space-y-2">
                  <li>Email : contact@saas-data-engine.com</li>
                  <li>Formulaire de contact : <Link to="/contact" className="text-teal-400 hover:underline">saas-data-engine.com/contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
