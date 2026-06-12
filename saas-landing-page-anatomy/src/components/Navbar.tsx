import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, ChevronDown, User } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setMobileOpen(false);
    setFeaturesOpen(false);
    setResourcesOpen(false);
  }, [location]);

  const featureLinks = [
    { label: 'Vue d\'ensemble', href: '/features' },
    { label: 'Ingestion & Nettoyage', href: '/features/data-prep' },
    { label: 'Exploration & IA', href: '/features/ai-engine' },
    { label: 'Export & Intégration', href: '/features/export' },
  ];

  const resourceLinks = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Témoignages', href: '/testimonials' },
    { label: 'Comparaison', href: '/compare' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Dashboard Preview', href: '/dashboard-preview' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-shadow">
              <Zap className="w-4 h-4 text-slate-950" />
            </div>
            <span className="text-lg font-bold text-white">
              SaaS-Data <span className="text-teal-400">Engine</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {/* Demo link */}
            {isHome && (
              <a
                href="#hero"
                className="px-3 py-2 text-sm text-slate-400 hover:text-teal-400 transition-colors rounded-lg hover:bg-slate-800/50"
              >
                Démo
              </a>
            )}

            {/* Features dropdown */}
            <div className="relative">
              <button
                onClick={() => { setFeaturesOpen(!featuresOpen); setResourcesOpen(false); }}
                className="flex items-center gap-1 px-3 py-2 text-sm text-slate-400 hover:text-teal-400 transition-colors rounded-lg hover:bg-slate-800/50"
              >
                Fonctionnalités
                <ChevronDown className={`w-3 h-3 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>
              {featuresOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-xl py-2">
                  {featureLinks.map((fl) => (
                    <Link
                      key={fl.href}
                      to={fl.href}
                      className="block px-4 py-2 text-sm text-slate-400 hover:text-teal-400 hover:bg-slate-800/50"
                    >
                      {fl.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources dropdown */}
            <div className="relative">
              <button
                onClick={() => { setResourcesOpen(!resourcesOpen); setFeaturesOpen(false); }}
                className="flex items-center gap-1 px-3 py-2 text-sm text-slate-400 hover:text-teal-400 transition-colors rounded-lg hover:bg-slate-800/50"
              >
                Ressources
                <ChevronDown className={`w-3 h-3 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-xl py-2">
                  {resourceLinks.map((rl) => (
                    <Link
                      key={rl.href}
                      to={rl.href}
                      className="block px-4 py-2 text-sm text-slate-400 hover:text-teal-400 hover:bg-slate-800/50"
                    >
                      {rl.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing */}
            <Link
              to={isHome ? '#pricing' : '/#pricing'}
              className="px-3 py-2 text-sm text-slate-400 hover:text-teal-400 transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Tarifs
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className="px-3 py-2 text-sm text-slate-400 hover:text-teal-400 transition-colors rounded-lg hover:bg-slate-800/50"
            >
              Contact
            </Link>
          </div>

          {/* CTA & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
              >
                <User className="w-4 h-4" />
                Déconnexion
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-400 hover:text-teal-400 transition-colors"
              >
                <User className="w-4 h-4" />
                Connexion
              </Link>
            )}
            <Link
              to="/#pricing"
              className="px-5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:scale-105"
            >
              Démarrer Gratuitement
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/50 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {/* Features */}
            <div>
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-400 hover:text-teal-400 rounded-lg hover:bg-slate-800/50"
              >
                Fonctionnalités
                <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>
              {featuresOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  {featureLinks.map((fl) => (
                    <Link
                      key={fl.href}
                      to={fl.href}
                      className="block px-3 py-2 text-sm text-slate-500 hover:text-teal-400 rounded-lg hover:bg-slate-800/50"
                    >
                      {fl.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources */}
            <div>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-400 hover:text-teal-400 rounded-lg hover:bg-slate-800/50"
              >
                Ressources
                <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  {resourceLinks.map((rl) => (
                    <Link
                      key={rl.href}
                      to={rl.href}
                      className="block px-3 py-2 text-sm text-slate-500 hover:text-teal-400 rounded-lg hover:bg-slate-800/50"
                    >
                      {rl.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/#pricing"
              className="block px-3 py-2 text-sm text-slate-400 hover:text-teal-400 rounded-lg hover:bg-slate-800/50"
            >
              Tarifs
            </Link>

            <Link
              to="/contact"
              className="block px-3 py-2 text-sm text-slate-400 hover:text-teal-400 rounded-lg hover:bg-slate-800/50"
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-slate-800/50 space-y-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 text-sm text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/50"
                >
                  Déconnexion
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 text-sm text-slate-400 hover:text-teal-400 rounded-lg hover:bg-slate-800/50"
                >
                  Connexion
                </Link>
              )}
              <Link
                to="/#pricing"
                className="block px-5 py-2.5 text-sm font-semibold text-center rounded-lg bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950"
              >
                Obtenir le Kit
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
