import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ ...preferences, analytics: true, marketing: true }));
    setVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ essential: true, analytics: false, marketing: false }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {!showSettings ? (
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-6 h-6 text-teal-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">🍪 Nous utilisons des cookies</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                  En continuant, vous acceptez notre{' '}
                  <Link to="/privacy" className="text-teal-400 hover:underline">politique de confidentialité</Link>.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-400 text-sm font-semibold text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all"
                  >
                    Tout accepter
                  </button>
                  <button
                    onClick={rejectAll}
                    className="px-4 py-2 rounded-lg border border-slate-700 text-sm font-medium text-slate-300 hover:border-slate-600 transition-colors"
                  >
                    Refuser
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1"
                  >
                    <Settings className="w-4 h-4" />
                    Personnaliser
                  </button>
                </div>
              </div>
              <button
                onClick={rejectAll}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Préférences cookies</h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              {[
                { key: 'essential', label: 'Cookies essentiels', desc: 'Nécessaires au fonctionnement du site', locked: true },
                { key: 'analytics', label: 'Cookies analytiques', desc: 'Nous aident à améliorer le site', locked: false },
                { key: 'marketing', label: 'Cookies marketing', desc: 'Personnalisation des publicités', locked: false },
              ].map((cookie) => (
                <div key={cookie.key} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                  <div>
                    <div className="font-medium text-white text-sm">{cookie.label}</div>
                    <div className="text-xs text-slate-500">{cookie.desc}</div>
                  </div>
                  <button
                    onClick={() => !cookie.locked && setPreferences({
                      ...preferences,
                      [cookie.key]: !preferences[cookie.key as keyof typeof preferences]
                    })}
                    disabled={cookie.locked}
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      preferences[cookie.key as keyof typeof preferences]
                        ? 'bg-teal-500'
                        : 'bg-slate-700'
                    } ${cookie.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        preferences[cookie.key as keyof typeof preferences] ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={acceptSelected}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-400 text-sm font-semibold text-slate-950"
              >
                Sauvegarder mes préférences
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-lg border border-slate-700 text-sm font-medium text-slate-300 hover:border-slate-600"
              >
                Tout accepter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
