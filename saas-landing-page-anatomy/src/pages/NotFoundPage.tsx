import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Zap } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="relative text-center px-4">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] sm:text-[16rem] font-black text-slate-800/50 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center shadow-2xl shadow-teal-500/30 animate-bounce">
              <Zap className="w-12 h-12 text-slate-950" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Page introuvable
        </h2>
        
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée. 
          Pas de panique, retournez à l'accueil !
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl border border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Page précédente
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-slate-800/50">
          <p className="text-sm text-slate-500 mb-4">Liens utiles</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Fonctionnalités', href: '/features' },
              { label: 'Tarifs', href: '/#pricing' },
              { label: 'Documentation', href: '/docs' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
