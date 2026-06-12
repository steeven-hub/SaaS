import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight, User, Check, AlertCircle } from 'lucide-react';
import api from '../utils/api';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    referrer_code: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = () => {
    const { password } = formData;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }
    
    try {
      await api.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        referrer_code: formData.referrer_code,
      });
      
      // Redirect to login after successful registration
      navigate('/login');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(
        err.response?.data?.email?.[0] || 
        err.response?.data?.detail || 
        'Erreur lors de l\'inscription. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  const strength = passwordStrength();
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['Faible', 'Moyen', 'Bon', 'Fort'];

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-3xl" />
      
      <div className="relative w-full max-w-md px-4 py-12">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-shadow">
              <Zap className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-xl font-bold text-white">
              Data<span className="text-teal-400">Forge</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Créer un compte</h1>
            <p className="text-slate-400 text-sm">
              Rejoignez 2,400+ développeurs qui utilisent SaaS-Data Engine
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jean Dupont"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="vous@exemple.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < strength ? strengthColors[strength - 1] : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    Force : <span className={strength > 0 ? strengthColors[strength - 1].replace('bg-', 'text-') : 'text-slate-500'}>
                      {strength > 0 ? strengthLabels[strength - 1] : 'Très faible'}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-colors"
                  required
                />
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-teal-500 focus:ring-teal-500/50"
                required
              />
              <label htmlFor="terms" className="text-sm text-slate-400">
                J'accepte les{' '}
                <Link to="/terms" className="text-teal-400 hover:underline">conditions générales</Link>
                {' '}et la{' '}
                <Link to="/privacy" className="text-teal-400 hover:underline">politique de confidentialité</Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !formData.acceptTerms}
              className="w-full py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Créer mon compte
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-slate-400 mt-8">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-teal-400 hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
