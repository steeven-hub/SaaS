import { useState } from 'react';
import { Container, Box, Typography, Button, Paper, Grid, Chip, Card, CardContent } from '@mui/material';
import { motion } from 'motion/react';
import { Upload, FolderTree, Check, Zap, Shield, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { useOnboardingTour } from './OnboardingTour';

const pricingTiers = [
  {
    name: 'Base',
    price: '$29',
    period: '/mois',
    description: 'Essentiel pour les petites équipes',
    features: [
      'Jusqu’à 10 Go de traitement des données',
      '5 membres de l’équipe',
      'Analyses de base',
      'Support par email',
      'SLA de disponibilité à 99,5 %',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/mois',
    description: 'Fonctionnalités avancées pour des entreprises en croissance',
    features: [
      'Traitement illimité des données',
      'Membres illimités de l’équipe',
      'Analytique avancée de l’IA',
      'Support prioritaire 24h/24 et 7j/7',
      'SLA à 99,9 % de disponibilité',
      'Intégrations personnalisées',
      'Accès API',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Coutumes',
    period: '',
    description: 'Solutions sur mesure pour les grandes organisations',
    features: [
      'Tout ce qui est dans Pro',
      'Gestionnaire de compte dédié',
      'SLA personnalisé',
      'Déploiement sur site',
      'Fonctionnalités de sécurité avancées',
      'Formation et intégration',
    ],
    popular: false,
  },
];

const architectureData = [
  { name: 'Angular Frontend', type: 'folder', children: ['components/', 'services/', 'models/'] },
  { name: 'Python Backend', type: 'folder', children: ['api/', 'ml_engine/', 'data_pipeline/'] },
  { name: 'Docker Infrastructure', type: 'folder', children: ['Dockerfile', 'docker-compose.yml', 'k8s/'] },
];

export function LandingPage() {
  useOnboardingTour();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const supportedFormats = ['.csv', '.xlsx', '.xls', '.json', '.parquet', '.sql'];
      const isSupported = supportedFormats.some(format => file.name.toLowerCase().endsWith(format));
      
      if (!isSupported) {
        setUploadedFile(file.name);
        setUploadStatus('error');
        console.error('Unsupported file format:', file.name);
        return;
      }

      setUploadedFile(file.name);
      setUploadStatus('uploading');
      
      try {
        await dataService.uploadFile(file);
        setUploadStatus('success');
      } catch (error) {
        console.error('Upload failed:', error);
        setUploadStatus('error');
      }
    }
  };

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section */}
      <Box className="hero-section"
        sx={{
          background: 'linear-gradient(180deg, rgba(45, 212, 191, 0.05) 0%, transparent 100%)',
          pt: 8,
          pb: 12,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Chip
                label="🚀 New: AI-Powered Insights"
                sx={{
                  mb: 3,
                  background: 'rgba(45, 212, 191, 0.15)',
                  color: '#2dd4bf',
                  fontWeight: 600,
                  border: '1px solid rgba(45, 212, 191, 0.3)',
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 900,
                  color: 'white',
                  mb: 3,
                  lineHeight: 1.1,
                }}
              >
                Transform Data Into
                <br />
                <span style={{ color: '#2dd4bf' }}>Actionable Insights</span>
              </Typography>
              <Typography variant="h6" sx={{ color: '#94a3b8', mb: 4, maxWidth: 700, mx: 'auto' }}>
                Enterprise-grade data processing engine powered by AI. Process, analyze, and visualize your data in
                real-time with zero configuration.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    console.log('Navigating to checkout');
                    navigate('/checkout');
                  }}
                  sx={{
                    py: 1.5,
                    px: 4,
                    background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                    },
                  }}
                  endIcon={<ChevronRight />}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    console.log('Navigating to docs');
                    navigate('/docs');
                  }}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderColor: '#2dd4bf',
                    color: '#2dd4bf',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    '&:hover': {
                      borderColor: '#2dd4bf',
                      background: 'rgba(45, 212, 191, 0.1)',
                    },
                  }}
                >
                  View Documentation
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Live Demo Section */}
      <Container maxWidth="lg" sx={{ mt: -6 }} className="demo-upload">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 4,
              background: 'rgba(30, 41, 59, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(45, 212, 191, 0.2)',
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1, textAlign: 'center' }}>
              Live Demo: File Upload
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3, textAlign: 'center' }}>
              Drop your CSV, JSON, or Excel files here to see the magic happen
            </Typography>

            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                border: `2px dashed ${isDragging ? '#2dd4bf' : 'rgba(148, 163, 184, 0.3)'}`,
                borderRadius: 2,
                p: 6,
                textAlign: 'center',
                background: isDragging ? 'rgba(45, 212, 191, 0.05)' : 'rgba(15, 23, 42, 0.5)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              <Upload size={64} color={isDragging ? '#2dd4bf' : '#64748b'} style={{ marginBottom: 16 }} />
              {uploadStatus === 'idle' && (
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                    Drag & drop your files here
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    or click to browse (CSV, JSON, XLSX supported)
                  </Typography>
                </Box>
              )}
              {uploadStatus === 'uploading' && (
                <Typography variant="h6" sx={{ color: '#2dd4bf' }}>Uploading...</Typography>
              )}
              {uploadStatus === 'success' && (
                <Typography variant="h6" sx={{ color: '#2dd4bf' }}>✓ File uploaded: {uploadedFile}</Typography>
              )}
              {uploadStatus === 'error' && (
                <Typography variant="h6" sx={{ color: '#ef4444' }}>✗ Upload failed. Please try again.</Typography>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Container>

      {/* Architecture Tree Viewer */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Interactive Architecture
        </Typography>
        <Grid container spacing={3}>
          {architectureData.map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Paper
                  sx={{
                    p: 3,
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(45, 212, 191, 0.2)',
                    borderRadius: 2,
                    '&:hover': {
                      border: '1px solid rgba(45, 212, 191, 0.5)',
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <FolderTree size={24} color="#2dd4bf" />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                  </Box>
                  <Box sx={{ pl: 3 }}>
                    {item.children.map((child, idx) => (
                      <Typography key={idx} variant="body2" sx={{ color: '#94a3b8', py: 0.5 }}>
                        • {child}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Why Choose SaaS-Data Engine?
        </Typography>
        <Grid container spacing={3}>
          {[
            { icon: Zap, title: 'Lightning Fast', desc: 'Process millions of records in seconds' },
            { icon: Shield, title: 'Enterprise Security', desc: 'Bank-level encryption & compliance' },
            { icon: TrendingUp, title: 'AI-Powered', desc: 'Automated insights and predictions' },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(45, 212, 191, 0.2)',
                    height: '100%',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: 'rgba(45, 212, 191, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <Icon size={32} color="#2dd4bf" />
                    </Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Pricing Section */}
      <Container maxWidth="lg" sx={{ mt: 10 }} className="pricing-section">
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 2, textAlign: 'center' }}>
          Choose Your Plan
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8', mb: 6, textAlign: 'center' }}>
          Flexible pricing for teams of all sizes
        </Typography>

        <Grid container spacing={4}>
          {pricingTiers.map((tier, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Paper
                  elevation={tier.popular ? 24 : 8}
                  sx={{
                    p: 4,
                    height: '100%',
                    background: tier.popular
                      ? 'linear-gradient(135deg, rgba(45, 212, 191, 0.15) 0%, rgba(30, 41, 59, 0.9) 100%)'
                      : 'rgba(30, 41, 59, 0.8)',
                    border: tier.popular ? '2px solid #2dd4bf' : '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: 3,
                    position: 'relative',
                    transform: tier.popular ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {tier.popular && (
                    <Chip
                      label="MOST POPULAR"
                      sx={{
                        position: 'absolute',
                        top: -12,
                        right: 20,
                        background: '#2dd4bf',
                        color: '#0f172a',
                        fontWeight: 700,
                      }}
                    />
                  )}

                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                    {tier.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
                    {tier.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3" sx={{ color: '#2dd4bf', fontWeight: 800, display: 'inline' }}>
                      {tier.price}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#94a3b8', display: 'inline', ml: 1 }}>
                      {tier.period}
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant={tier.popular ? 'contained' : 'outlined'}
                    onClick={() => navigate('/checkout')}
                    sx={{
                      py: 1.5,
                      mb: 3,
                      background: tier.popular ? 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)' : 'transparent',
                      borderColor: '#2dd4bf',
                      color: tier.popular ? 'white' : '#2dd4bf',
                      fontWeight: 700,
                      '&:hover': {
                        background: tier.popular
                          ? 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
                          : 'rgba(45, 212, 191, 0.1)',
                        borderColor: '#2dd4bf',
                      },
                    }}
                  >
                    Get Started
                  </Button>

                  <Box>
                    {tier.features.map((feature, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <Check size={20} color="#2dd4bf" />
                        <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
