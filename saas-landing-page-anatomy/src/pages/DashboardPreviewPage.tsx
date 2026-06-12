import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, DollarSign, TrendingUp, ArrowRight,
  BarChart3, PieChart, Activity, Bell, Settings, Search,
  ChevronDown, Download, Filter, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const MOCK_KPIS = [
  { label: 'Revenue', value: '$124,520', change: +12.5, icon: <DollarSign className="w-5 h-5" /> },
  { label: 'Users', value: '8,932', change: +8.2, icon: <Users className="w-5 h-5" /> },
  { label: 'Conversion', value: '3.42%', change: +1.1, icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Active Now', value: '284', change: -2.3, icon: <Activity className="w-5 h-5" /> },
];

const MOCK_CHART_DATA = [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50, 70, 88, 62, 78];

const MOCK_TABLE_DATA = [
  { id: 1, name: 'Alice Martin', email: 'alice@example.com', plan: 'Pro', status: 'Active', mrr: '$149' },
  { id: 2, name: 'Bob Dupont', email: 'bob@example.com', plan: 'Starter', status: 'Active', mrr: '$79' },
  { id: 3, name: 'Claire Roux', email: 'claire@example.com', plan: 'Pro', status: 'Trial', mrr: '$0' },
  { id: 4, name: 'David Bernard', email: 'david@example.com', plan: 'Compétiteur', status: 'Active', mrr: '$199' },
  { id: 5, name: 'Emma Petit', email: 'emma@example.com', plan: 'Pro', status: 'Churned', mrr: '$0' },
];

export default function DashboardPreviewPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-6">
            <LayoutDashboard className="w-4 h-4" />
            Preview
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Votre futur <span className="text-teal-400">Dashboard</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Voici à quoi ressemble le dashboard que vous obtenez avec SaaS-Data Engine. 
            Entièrement personnalisable et prêt à l'emploi.
          </p>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative py-8 pb-20">
        <div className="absolute inset-0 bg-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800/60 border-b border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-sm">
                  DF
                </div>
                <div className="hidden md:flex items-center gap-1">
                  {['Overview', 'Analytics', 'Customers', 'Reports'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        activeTab === tab.toLowerCase()
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-9 pr-4 py-2 w-64 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
                  />
                </div>
                <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-teal-400 rounded-full" />
                </button>
                <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  JD
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Dashboard Overview</h2>
                  <p className="text-sm text-slate-500">Bienvenue, Jean. Voici un aperçu de votre activité.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:border-slate-600">
                    <Calendar className="w-4 h-4" />
                    Last 30 days
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:border-slate-600">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-500 text-sm font-semibold text-slate-950 hover:bg-teal-400">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {MOCK_KPIS.map((kpi) => (
                  <div key={kpi.label} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-teal-400">
                        {kpi.icon}
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${
                        kpi.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {kpi.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {Math.abs(kpi.change)}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{kpi.value}</div>
                    <div className="text-xs text-slate-500">{kpi.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-3 gap-6 mb-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-teal-400" />
                      <h3 className="font-semibold text-white">Revenue Overview</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-teal-400" />
                        This period
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-slate-600" />
                        Previous
                      </span>
                    </div>
                  </div>
                  <div className="h-48 flex items-end gap-2">
                    {MOCK_CHART_DATA.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-1">
                        <div
                          className="w-full rounded-t bg-gradient-to-t from-teal-600/80 to-teal-400/80 transition-all hover:from-teal-500 hover:to-teal-300"
                          style={{ height: `${h}%` }}
                        />
                        <div
                          className="w-full rounded-t bg-slate-700/50"
                          style={{ height: `${h * 0.7}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-4">
                    <PieChart className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">Plans Distribution</h3>
                  </div>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#334155" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#14b8a6" strokeWidth="3" strokeDasharray="45 100" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="30 100" strokeDashoffset="-45" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="25 100" strokeDashoffset="-75" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: 'Pro', value: '45%', color: 'bg-teal-400' },
                      { label: 'Starter', value: '30%', color: 'bg-purple-400' },
                      { label: 'Compétiteur', value: '25%', color: 'bg-amber-400' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-400">
                          <span className={`w-2 h-2 rounded-full ${item.color}`} />
                          {item.label}
                        </span>
                        <span className="text-white font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-white">Recent Customers</h3>
                  </div>
                  <button className="text-sm text-teal-400 hover:underline">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-slate-400">Customer</th>
                        <th className="px-4 py-3 text-left font-medium text-slate-400">Plan</th>
                        <th className="px-4 py-3 text-left font-medium text-slate-400">Status</th>
                        <th className="px-4 py-3 text-right font-medium text-slate-400">MRR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {MOCK_TABLE_DATA.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/30">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                {row.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-medium text-white">{row.name}</div>
                                <div className="text-xs text-slate-500">{row.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              row.plan === 'Pro' ? 'bg-teal-500/20 text-teal-400' :
                              row.plan === 'Compétiteur' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-slate-700 text-slate-400'
                            }`}>
                              {row.plan}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              row.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                              row.status === 'Trial' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-white">{row.mrr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Features callout */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              { title: 'Personnalisable', desc: 'Modifiez couleurs, composants et layouts selon vos besoins.' },
              { title: 'Données temps réel', desc: 'WebSocket intégré pour les mises à jour instantanées.' },
              { title: 'Export complet', desc: 'PDF, Excel, CSV — exportez vos données en un clic.' },
            ].map((f) => (
              <div key={f.title} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <h4 className="font-semibold text-white mb-1">{f.title}</h4>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ce dashboard peut être le vôtre
          </h2>
          <p className="text-slate-400 mb-8">
            En 5 minutes, vous avez accès à tout ce que vous venez de voir — et plus encore.
          </p>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 hover:shadow-lg hover:shadow-teal-500/30 transition-all"
          >
            Obtenir SaaS-Data Engine
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
