import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, DollarSign, TrendingUp, ArrowRight,
  BarChart3, PieChart, Activity, Bell, Settings, Search,
  ChevronDown, Download, Filter, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import api from '../utils/api';

export default function DashboardPreviewPage() {
  const handleExport = async () => {
    try {
      const response = await api.post('/data/generate-pdf', {
        insights: data.recentCustomers,
        filename: 'Dashboard_Export'
      }, { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Dashboard_Export.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Export error', error);
      alert('Erreur lors de l\'export PDF.');
    }
  };

  const [data, setData] = useState({
    kpis: [],
    chartData: [],
    plansDist: [],
    recentCustomers: [],
    licenses: [],
    invoices: []
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [dashboardRes, licensesRes, invoicesRes] = await Promise.all([
          api.get('/dashboard/data'),
          api.get('/dashboard/licenses'),
          api.get('/dashboard/invoices')
        ]);

        setData({
          kpis: [
            { label: 'Total Users', value: dashboardRes.data.kpis.total_users.toString(), change: +5.0, icon: <Users className="w-5 h-5" /> },
            { label: 'Active Users', value: dashboardRes.data.kpis.active_users.toString(), change: +2.0, icon: <Activity className="w-5 h-5" /> },
            { label: 'Total Rewards', value: `$${dashboardRes.data.kpis.total_rewards}`, change: +10.0, icon: <DollarSign className="w-5 h-5" /> },
          ],
          chartData: dashboardRes.data.chart_data,
          plansDist: dashboardRes.data.plans_dist,
          recentCustomers: dashboardRes.data.recent_customers,
          licenses: licensesRes.data,
          invoices: invoicesRes.data
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'licenses':
        return (
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Vos Licences</h3>
            <table className="w-full text-sm text-slate-300">
              <thead><tr className="border-b border-slate-700"><th className="pb-2">ID</th><th className="pb-2">Produit</th><th className="pb-2">Statut</th><th className="pb-2">Expire le</th></tr></thead>
              <tbody>
                {data.licenses.map(l => <tr key={l.id} className="border-b border-slate-700/50"><td className="py-3">{l.id}</td><td className="py-3">{l.product}</td><td className="py-3">{l.status}</td><td className="py-3">{l.expires}</td></tr>)}
              </tbody>
            </table>
          </div>
        );
      case 'invoices':
        return (
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Vos Factures</h3>
            <table className="w-full text-sm text-slate-300">
              <thead><tr className="border-b border-slate-700"><th className="pb-2">ID</th><th className="pb-2">Date</th><th className="pb-2">Montant</th><th className="pb-2">Statut</th></tr></thead>
              <tbody>
                {data.invoices.map(i => <tr key={i.id} className="border-b border-slate-700/50"><td className="py-3">{i.id}</td><td className="py-3">{i.date}</td><td className="py-3">{i.amount}</td><td className="py-3">{i.status}</td></tr>)}
              </tbody>
            </table>
          </div>
        );
      default:
        return (
            <div className="p-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Dashboard Overview</h2>
                  <p className="text-sm text-slate-500">Bienvenue, Jean. Voici un aperçu de votre activité.</p>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {data.kpis.map((kpi) => (
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
                <div className="lg:col-span-2 p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-teal-400" />
                      <h3 className="font-semibold text-white">Revenue Overview</h3>
                    </div>
                  </div>
                  <div className="h-48 flex items-end gap-2">
                    {data.chartData.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-1">
                        <div
                          className="w-full rounded-t bg-gradient-to-t from-teal-600/80 to-teal-400/80 transition-all hover:from-teal-500 hover:to-teal-300"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-4">
                    <PieChart className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">Plans Distribution</h3>
                  </div>
                  <div className="space-y-2">
                    {data.plansDist.map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-400">
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
                      {data.recentCustomers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/30">
                          <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                          <td className="px-4 py-3 text-slate-400">{row.plan}</td>
                          <td className="px-4 py-3 text-slate-400">{row.status}</td>
                          <td className="px-4 py-3 text-right text-white">{row.mrr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        );
    }
  };


  if (loading) return <div className="pt-16 text-white text-center">Chargement du Dashboard réel...</div>;

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
                  {['Overview', 'Licenses', 'Invoices'].map((tab) => (
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 w-64 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
                  />
                </div>
                  <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-500 text-sm font-semibold text-slate-950 hover:bg-teal-400">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
              </div>
            </div>

            {/* Main Content */}
            {renderContent()}

          </div>
        </div>
      </section>
    </div>
  );
}
