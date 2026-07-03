import React from 'react';
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';

const DashboardPage = () => {
  return (
    <Layout>
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-6">Tableau de bord</h1>
        <Dashboard />
      </div>
    </Layout>
  );
};

export default DashboardPage;
