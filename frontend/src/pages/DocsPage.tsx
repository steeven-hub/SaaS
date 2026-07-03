import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, Search, ArrowRight, Zap, Layers, Server, 
  Box, Brain, Trophy, FileCode, Terminal, Settings,
  ChevronRight, ExternalLink, Copy, Check
} from 'lucide-react';

const DOCS_SECTIONS = [
  {
    title: 'Démarrage Rapide',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-teal-400',
    items: [
      { title: 'Installation', href: '#installation' },
      { title: 'Configuration', href: '#configuration' },
      { title: 'Premier lancement', href: '#first-run' },
      { title: 'Structure du projet', href: '#structure' },
    ],
  },
  {
    title: 'Frontend Angular',
    icon: <Layers className="w-5 h-5" />,
    color: 'text-blue-400',
    items: [
      { title: 'Architecture', href: '#angular-arch' },
      { title: 'Composants UI', href: '#components' },
      { title: 'Services', href: '#services' },
      { title: 'Guards & Interceptors', href: '#guards' },
      { title: 'State Management', href: '#state' },
    ],
  },
  {
    title: 'Backend Python',
    icon: <Server className="w-5 h-5" />,
    color: 'text-green-400',
    items: [
      { title: 'API Reference', href: '#api-ref' },
      { title: 'Authentification', href: '#auth' },
      { title: 'Base de données', href: '#database' },
      { title: 'Background Tasks', href: '#tasks' },
      { title: 'WebSockets', href: '#websockets' },
    ],
  },
  {
    title: 'Module IA',
    icon: <Brain className="w-5 h-5" />,
    color: 'text-purple-400',
    items: [
      { title: 'Auto-EDA', href: '#auto-eda' },
      { title: 'Model Training', href: '#training' },
      { title: 'Prédictions', href: '#predictions' },
      { title: 'Rapports PDF', href: '#pdf-reports' },
    ],
  },
  {
    title: 'Mode Hackathon',
    icon: <Trophy className="w-5 h-5" />,
    color: 'text-amber-400',
    items: [
      { title: 'Feature Engineering', href: '#feature-eng' },
      { title: 'Hyperparameter Tuning', href: '#tuning' },
      { title: 'Ensemble Methods', href: '#ensembles' },
      { title: 'Validateur', href: '#validator' },
    ],
  },
  {
    title: 'Déploiement',
    icon: <Box className="w-5 h-5" />,
    color: 'text-orange-400',
    items: [
      { title: 'Docker Production', href: '#docker-prod' },
      { title: 'Variables d\'environnement', href: '#env-vars' },
      { title: 'CI/CD', href: '#cicd' },
      { title: 'Monitoring', href: '#monitoring' },
    ],
  },
];

const QUICK_START_CODE = `# 1. Cloner le repository
git clone https://github.com/saas_data_engine/kit.git
cd saas-data-engine

# 2. Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés Stripe, JWT secret, etc.

# 3. Lancer le stack complet avec Docker
docker compose up -d

# 4. Vérifier que tout fonctionne
curl http://localhost:8000/health
# {"status": "operational", "version": "2.0.0"}

# 5. Accéder à l'application
# Frontend: http://localhost:4200
# Backend API: http://localhost:8000/api/docs
# PostgreSQL: localhost:5432
# Redis: localhost:6379`;

const API_EXAMPLE = `# Exemple d'appel API avec authentification

import requests

# 1. Login pour obtenir un token
response = requests.post(
    "http://localhost:8000/api/v1/auth/login",
    json={"email": "user@example.com", "password": "secret"}
)
token = response.json()["access_token"]

# 2. Appel authentifié
headers = {"Authorization": f"Bearer {token}"}
data = requests.get(
    "http://localhost:8000/api/v1/data/analyze",
    headers=headers
)
print(data.json())`;

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-6">
              <Book className="w-4 h-4" />
              Documentation
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Guide Complet <span className="text-teal-400">SaaS-Data Engine</span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-8">
              Tout ce dont vous avez besoin pour maîtriser le kit et lancer votre SaaS rapidement.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Rechercher dans la documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {DOCS_SECTIONS.map((section) => (
                  <div key={section.title}>
                    <div className={`flex items-center gap-2 ${section.color} font-semibold mb-3`}>
                      {section.icon}
                      {section.title}
                    </div>
                    <ul className="space-y-1 pl-7">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className="flex items-center gap-1 text-sm text-slate-500 hover:text-teal-400 transition-colors py-1"
                          >
                            <ChevronRight className="w-3 h-3" />
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-16">
              {/* Installation */}
              <div id="installation">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-teal-400" />
                  Installation & Démarrage
                </h2>
                <p className="text-slate-400 mb-6">
                  Lancez le projet complet en moins de 5 minutes avec Docker Compose.
                </p>

                <div className="bg-slate-900/80 rounded-xl border border-slate-700/50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
                    <span className="text-xs text-slate-500 font-mono">terminal</span>
                    <button 
                      onClick={() => copyCode(QUICK_START_CODE, 'quickstart')}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal-400 transition-colors"
                    >
                      {copiedCode === 'quickstart' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedCode === 'quickstart' ? 'Copié!' : 'Copier'}
                    </button>
                  </div>
                  <pre className="p-5 text-[13px] leading-6 font-mono text-slate-300 overflow-x-auto">
                    {QUICK_START_CODE}
                  </pre>
                </div>
              </div>

              {/* Configuration */}
              <div id="configuration">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-teal-400" />
                  Configuration
                </h2>
                <p className="text-slate-400 mb-6">
                  Les variables d'environnement à configurer avant le premier lancement.
                </p>

                <div className="overflow-hidden rounded-xl border border-slate-700/50">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800/60">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-slate-400">Variable</th>
                        <th className="px-4 py-3 text-left font-medium text-slate-400">Description</th>
                        <th className="px-4 py-3 text-left font-medium text-slate-400">Exemple</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {[
                        { var: 'STRIPE_SECRET_KEY', desc: 'Clé secrète Stripe', example: 'sk_test_xxx' },
                        { var: 'JWT_SECRET', desc: 'Secret pour signer les tokens', example: 'votre-secret-32-chars' },
                        { var: 'DATABASE_URL', desc: 'URL de connexion PostgreSQL', example: 'postgresql://...' },
                        { var: 'REDIS_URL', desc: 'URL de connexion Redis', example: 'redis://localhost:6379' },
                        { var: 'CORS_ORIGINS', desc: 'Origines autorisées', example: 'http://localhost:4200' },
                      ].map((row) => (
                        <tr key={row.var} className="hover:bg-slate-800/30">
                          <td className="px-4 py-3 font-mono text-teal-400">{row.var}</td>
                          <td className="px-4 py-3 text-slate-300">{row.desc}</td>
                          <td className="px-4 py-3 font-mono text-slate-500 text-xs">{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* API Reference */}
              <div id="api-ref">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-6 h-6 text-green-400" />
                  API Reference
                </h2>
                <p className="text-slate-400 mb-6">
                  L'API REST est documentée automatiquement via Swagger/OpenAPI.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    { method: 'POST', path: '/api/v1/auth/login', desc: 'Authentification' },
                    { method: 'POST', path: '/api/v1/auth/register', desc: 'Inscription' },
                    { method: 'GET', path: '/api/v1/data/analyze', desc: 'Analyse de données' },
                    { method: 'POST', path: '/api/v1/ai/predict', desc: 'Prédictions ML' },
                    { method: 'POST', path: '/api/v1/billing/checkout', desc: 'Checkout Stripe' },
                    { method: 'GET', path: '/api/v1/reports', desc: 'Liste des rapports' },
                  ].map((endpoint) => (
                    <div key={endpoint.path} className="flex items-center gap-3 p-4 rounded-lg bg-slate-900/50 border border-slate-800/50">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-sm text-slate-300">{endpoint.path}</span>
                      <span className="text-xs text-slate-500 ml-auto">{endpoint.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900/80 rounded-xl border border-slate-700/50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
                    <span className="text-xs text-slate-500 font-mono">example.py</span>
                    <button 
                      onClick={() => copyCode(API_EXAMPLE, 'api')}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal-400 transition-colors"
                    >
                      {copiedCode === 'api' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedCode === 'api' ? 'Copié!' : 'Copier'}
                    </button>
                  </div>
                  <pre className="p-5 text-[13px] leading-6 font-mono text-slate-300 overflow-x-auto">
                    {API_EXAMPLE}
                  </pre>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm mb-1">
                    <ExternalLink className="w-4 h-4" />
                    Documentation interactive
                  </div>
                  <p className="text-xs text-slate-400">
                    Accédez à la documentation Swagger complète sur{' '}
                    <span className="text-blue-400 font-mono">http://localhost:8000/api/docs</span>
                  </p>
                </div>
              </div>

              {/* More sections... */}
              <div id="structure">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileCode className="w-6 h-6 text-teal-400" />
                  Structure du Projet
                </h2>
                <p className="text-slate-400 mb-6">
                  Organisation des fichiers et dossiers dans le repository.
                </p>

                <div className="bg-slate-900/80 rounded-xl border border-slate-700/50 p-5 font-mono text-sm">
                  <div className="text-slate-300 space-y-1">
                    <div className="text-teal-400">saas-data-engine/</div>
                    <div className="pl-4">├── <span className="text-blue-400">frontend-angular/</span></div>
                    <div className="pl-8">├── src/app/</div>
                    <div className="pl-8">├── src/services/</div>
                    <div className="pl-8">└── angular.json</div>
                    <div className="pl-4">├── <span className="text-green-400">backend-python/</span></div>
                    <div className="pl-8">├── app/routers/</div>
                    <div className="pl-8">├── app/services/</div>
                    <div className="pl-8">├── app/models/</div>
                    <div className="pl-8">└── requirements.txt</div>
                    <div className="pl-4">├── <span className="text-purple-400">ai-engine/</span></div>
                    <div className="pl-8">├── eda/</div>
                    <div className="pl-8">├── models/</div>
                    <div className="pl-8">└── reports/</div>
                    <div className="pl-4">├── <span className="text-orange-400">docker/</span></div>
                    <div className="pl-8">├── Dockerfile.frontend</div>
                    <div className="pl-8">└── Dockerfile.backend</div>
                    <div className="pl-4">├── docker-compose.yml</div>
                    <div className="pl-4">├── .env.example</div>
                    <div className="pl-4">└── README.md</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/50 border border-slate-700/50 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Prêt à démarrer ?
                </h3>
                <p className="text-slate-400 mb-6">
                  Obtenez le kit complet et commencez à construire votre SaaS dès aujourd'hui.
                </p>
                <Link
                  to="/#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all"
                >
                  Voir les tarifs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
