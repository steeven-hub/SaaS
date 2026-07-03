import { Link } from 'react-router-dom';
import { Zap, Shield, Lock, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800/50">
      <div className="absolute inset-0 bg-slate-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-lg font-bold text-white">
                SaaS-Data <span className="text-teal-400">Engine</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              La plateforme SaaS d'Auto-EDA et de préparation de données optimisée pour le marché sénégalais.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-400 hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-400 hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="mailto:contact@saas-data-engine.com"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-400 hover:bg-slate-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Produit
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/features" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Fonctionnalités</Link></li>
              <li><Link to="/#pricing" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Tarifs</Link></li>
              <li><Link to="/compare" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Comparaison</Link></li>
              <li><Link to="/roadmap" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Roadmap</Link></li>
              <li><Link to="/dashboard-preview" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Démo Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Ressources
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/docs" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Documentation</Link></li>
              <li><Link to="/testimonials" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Témoignages</Link></li>
              <li><Link to="/faq" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">FAQ</Link></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">API Reference</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Entreprise
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">À propos</a></li>
              <li><Link to="/contact" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Contact</Link></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Partenariats</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Carrières</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Légal
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/terms" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">CGV</Link></li>
              <li><Link to="/privacy" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Confidentialité</Link></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Licence</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">Remboursement</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2025 SaaS-Data Engine. Tous droits réservés. Paiements sécurisés par Stripe.
          </p>

          {/* Security badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Lock className="w-3 h-3" />
              SSL Sécurisé
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Shield className="w-3 h-3" />
              Stripe Verified
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[10px] text-slate-500 font-medium ml-1">4.9/5</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
