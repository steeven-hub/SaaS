import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
              <Shield className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Politique de Confidentialité</h1>
              <p className="text-slate-500 text-sm">Dernière mise à jour : Juin 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-slate-300">
            <div className="p-6 rounded-xl bg-teal-500/5 border border-teal-500/20">
              <p className="text-teal-400 font-medium">
                Chez SaaS-Data Engine, nous prenons la protection de vos données personnelles très au sérieux. 
                Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">1. Responsable du traitement</h2>
              <p className="leading-relaxed">
                Le responsable du traitement des données personnelles est SaaS-Data Engine, 
                société représentée par son directeur, joignable à l'adresse contact@saas-data-engine.com.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">2. Données collectées</h2>
              <p className="leading-relaxed mb-4">
                Nous collectons les données suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Données d'identification</strong> : nom, prénom, adresse email</li>
                <li><strong className="text-white">Données de paiement</strong> : traitées par Stripe, nous ne stockons pas vos numéros de carte</li>
                <li><strong className="text-white">Données de navigation</strong> : adresse IP, type de navigateur, pages visitées (via cookies)</li>
                <li><strong className="text-white">Données de communication</strong> : messages envoyés via le formulaire de contact</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">3. Finalités du traitement</h2>
              <p className="leading-relaxed mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Traiter vos commandes et vous donner accès aux produits achetés</li>
                <li>Vous envoyer des emails transactionnels (confirmation d'achat, factures)</li>
                <li>Vous envoyer notre newsletter (si vous y êtes inscrit)</li>
                <li>Répondre à vos demandes de support</li>
                <li>Améliorer notre site et nos services</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">4. Base légale</h2>
              <p className="leading-relaxed">
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong className="text-white">L'exécution du contrat</strong> : pour traiter vos commandes</li>
                <li><strong className="text-white">Votre consentement</strong> : pour l'envoi de newsletters</li>
                <li><strong className="text-white">Notre intérêt légitime</strong> : pour améliorer nos services</li>
                <li><strong className="text-white">Nos obligations légales</strong> : pour la conservation des factures</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">5. Destinataires des données</h2>
              <p className="leading-relaxed mb-4">
                Vos données peuvent être partagées avec :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Stripe</strong> : pour le traitement des paiements</li>
                <li><strong className="text-white">Resend/SendGrid</strong> : pour l'envoi d'emails</li>
                <li><strong className="text-white">Vercel</strong> : pour l'hébergement du site</li>
                <li><strong className="text-white">Google Analytics</strong> : pour les statistiques de visite (anonymisées)</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Ces prestataires sont tous conformes au RGPD et situés dans l'UE ou couverts par des clauses contractuelles types.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">6. Durée de conservation</h2>
              <p className="leading-relaxed">
                Nous conservons vos données :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Données clients : pendant la durée de la relation commerciale + 3 ans</li>
                <li>Factures : 10 ans (obligation légale)</li>
                <li>Cookies : 13 mois maximum</li>
                <li>Données de newsletter : jusqu'à désinscription</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">7. Vos droits</h2>
              <p className="leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Droit d'accès</strong> : obtenir une copie de vos données</li>
                <li><strong className="text-white">Droit de rectification</strong> : corriger vos données</li>
                <li><strong className="text-white">Droit à l'effacement</strong> : demander la suppression de vos données</li>
                <li><strong className="text-white">Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                <li><strong className="text-white">Droit d'opposition</strong> : vous opposer au traitement à des fins marketing</li>
                <li><strong className="text-white">Droit de retrait du consentement</strong> : à tout moment pour la newsletter</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à contact@saas-data-engine.com.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">8. Cookies</h2>
              <p className="leading-relaxed">
                Notre site utilise des cookies pour :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong className="text-white">Cookies essentiels</strong> : fonctionnement du site, session utilisateur</li>
                <li><strong className="text-white">Cookies analytiques</strong> : mesure d'audience (Google Analytics)</li>
                <li><strong className="text-white">Cookies marketing</strong> : personnalisation des publicités (désactivables)</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Vous pouvez gérer vos préférences via notre bandeau cookies ou les paramètres de votre navigateur.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">9. Sécurité</h2>
              <p className="leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Chiffrement SSL/TLS de toutes les communications</li>
                <li>Authentification à deux facteurs pour l'accès aux systèmes</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Sauvegardes régulières et chiffrées</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">10. Modifications</h2>
              <p className="leading-relaxed">
                Nous pouvons modifier cette politique à tout moment. Les modifications seront publiées 
                sur cette page avec une nouvelle date de mise à jour. Nous vous informerons par email 
                en cas de changements significatifs.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">11. Contact et réclamations</h2>
              <p className="leading-relaxed">
                Pour toute question concernant cette politique ou pour exercer vos droits :
              </p>
              <ul className="list-none mt-4 space-y-2">
                <li>Email : contact@saas-data-engine.com</li>
                <li>Formulaire : <Link to="/contact" className="text-teal-400 hover:underline">saas-data-engine.com/contact</Link></li>
              </ul>
              <p className="leading-relaxed mt-4">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une 
                réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
