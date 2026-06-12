import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import CookieBanner from './components/CookieBanner';
import LiveChat from './components/LiveChat';

// Pages
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import DataPrepPage from './pages/DataPrepPage';
import AiEnginePage from './pages/AiEnginePage';
import ExportIntegrationPage from './pages/ExportIntegrationPage';
import DocsPage from './pages/DocsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ComparePage from './pages/ComparePage';
import RoadmapPage from './pages/RoadmapPage';
import DashboardPreviewPage from './pages/DashboardPreviewPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Auth pages without layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Pages with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          
          {/* Features */}
          <Route path="features" element={<FeaturesPage />} />
          <Route path="features/data-prep" element={<DataPrepPage />} />
          <Route path="features/ai-engine" element={<AiEnginePage />} />
          <Route path="features/export" element={<ExportIntegrationPage />} />
          
          {/* Resources */}
          <Route path="docs" element={<DocsPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="dashboard-preview" element={<DashboardPreviewPage />} />
          
          {/* Support */}
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          
          {/* Legal */}
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      
      {/* Global UI Components */}
      <ScrollToTopButton />
      <CookieBanner />
      <LiveChat />
    </BrowserRouter>
  );
}
