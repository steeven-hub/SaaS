import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, MessageSquare, Send, MapPin, Clock,
  CheckCircle, HelpCircle, FileText, Zap
} from 'lucide-react';

const CONTACT_REASONS = [
  { value: 'sales', label: 'Question commerciale' },
  { value: 'support', label: 'Support technique' },
  { value: 'partnership', label: 'Partenariat' },
  { value: 'feedback', label: 'Feedback produit' },
  { value: 'other', label: 'Autre' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Contact
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Comment pouvons-nous{' '}
              <span className="text-teal-400">vous aider ?</span>
            </h1>
            
            <p className="text-lg text-slate-400">
              Notre équipe répond généralement sous 24 heures. 
              Pour le support technique, consultez d'abord la documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Informations</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Email</h3>
                      <a href="mailto:contact@saas-data-engine.com" className="text-slate-400 hover:text-teal-400 transition-colors">
                        contact@saas-data-engine.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Temps de réponse</h3>
                      <p className="text-slate-400">Sous 24 heures (jours ouvrés)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Localisation</h3>
                      <p className="text-slate-400">Paris, France (100% remote)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <h3 className="font-semibold text-white mb-4">Ressources utiles</h3>
                <div className="space-y-3">
                  <Link to="/docs" className="flex items-center gap-3 text-slate-400 hover:text-teal-400 transition-colors">
                    <FileText className="w-4 h-4" />
                    Documentation
                  </Link>
                  <Link to="/faq" className="flex items-center gap-3 text-slate-400 hover:text-teal-400 transition-colors">
                    <HelpCircle className="w-4 h-4" />
                    Questions fréquentes
                  </Link>
                  <Link to="/#pricing" className="flex items-center gap-3 text-slate-400 hover:text-teal-400 transition-colors">
                    <Zap className="w-4 h-4" />
                    Tarifs
                  </Link>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Message envoyé !</h3>
                    <p className="text-slate-400 mb-8">
                      Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', reason: '', subject: '', message: '' });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl border border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-all"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-white mb-6">Envoyez-nous un message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Jean Dupont"
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="vous@exemple.com"
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Reason */}
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Raison du contact *
                          </label>
                          <select
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50"
                            required
                          >
                            <option value="">Sélectionnez...</option>
                            {CONTACT_REASONS.map((r) => (
                              <option key={r.value} value={r.value}>{r.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Sujet *
                          </label>
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Votre sujet"
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50"
                            required
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Message *
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Décrivez votre demande en détail..."
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 resize-none"
                          required
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Envoyer le message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
