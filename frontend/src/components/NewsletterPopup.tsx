import { useState, useEffect } from 'react';
import { X, Mail, Sparkles, Check } from 'lucide-react';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('newsletter-dismissed');
    const subscribed = localStorage.getItem('newsletter-subscribed');
    
    if (!dismissed && !subscribed) {
      // Show popup after 30 seconds or 50% scroll
      const timer = setTimeout(() => setVisible(true), 30000);
      
      const onScroll = () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 50) {
          setVisible(true);
          window.removeEventListener('scroll', onScroll);
        }
      };
      
      window.addEventListener('scroll', onScroll);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      localStorage.setItem('newsletter-subscribed', 'true');
    }, 1500);
  };

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('newsletter-dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gradient top */}
        <div className="h-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-400" />

        <div className="p-8">
          {!submitted ? (
            <>
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-teal-400" />
              </div>

              <h3 className="text-2xl font-bold text-white text-center mb-2">
                Restez informé
              </h3>
              <p className="text-slate-400 text-center mb-6">
                Recevez les dernières mises à jour, tutoriels et offres exclusives directement dans votre inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'S\'inscrire gratuitement'
                  )}
                </button>
              </form>

              <p className="text-xs text-slate-600 text-center mt-4">
                Pas de spam. Désabonnement en un clic.
              </p>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-2">
                {[
                  'Tutoriels et guides exclusifs',
                  'Accès anticipé aux nouvelles features',
                  'Réductions et offres spéciales',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-sm text-slate-400">
                    <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Merci ! 🎉</h3>
              <p className="text-slate-400 mb-6">
                Vous êtes maintenant inscrit à notre newsletter. Surveillez votre inbox !
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-600 transition-colors"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
