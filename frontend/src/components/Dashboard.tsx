import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../utils/api';

const Dashboard = () => {
  const [data, setData] = useState({ kpis: {}, chart_data: [], plans_dist: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard/data');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-white">Chargement...</div>;

  // Transform chart_data for Recharts
  const barData = data.chart_data.map((value, index) => ({ name: index, value }));
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-white">
          <h3 className="text-sm text-slate-400">Total Utilisateurs</h3>
          <p className="text-2xl font-bold">{data.kpis.total_users}</p>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-white">
          <h3 className="text-sm text-slate-400">Utilisateurs Actifs</h3>
          <p className="text-2xl font-bold">{data.kpis.active_users}</p>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-white">
          <h3 className="text-sm text-slate-400">Récompenses Totales</h3>
          <p className="text-2xl font-bold">{data.kpis.total_rewards} $</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg">
        <h2 className="text-white mb-4">Distribution des Plans</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data.plans_dist} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {data.plans_dist.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg">
        <h2 className="text-white mb-4">Tendance (Données brutes)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
