import { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid, Chip, Button, List, ListItem, ListItemButton, ListItemText, CircularProgress, Avatar, Divider, Checkbox, FormControlLabel } from '@mui/material';
import { 
  LayoutGrid, Bot, Trophy, CreditCard, 
  Upload, Download, CheckCircle, XCircle, 
  BarChart2, Wand2, Key, FileText, 
  TrendingUp, AlertCircle, Lightbulb,
  Table as TableIcon
} from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';
import { dataService } from '../../services/dataService';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const menuItems = [
  { id: 'overview', label: 'Aperçu & Fichiers', icon: LayoutGrid },
  { id: 'ai_hub', label: 'Hub Décisionnel IA', icon: Bot },
  { id: 'hackathon', label: 'Mode Hackathon', icon: Trophy },
  { id: 'billing', label: 'Licence & Facturation', icon: CreditCard },
];

const correlationData = [
  { x: 0.1, y: 0.2, z: 200, name: 'Var A vs B' },
  { x: 0.3, y: 0.8, z: 260, name: 'Var C vs D' },
  { x: 0.5, y: 0.6, z: 400, name: 'Var E vs F' },
  { x: 0.7, y: 0.9, z: 280, name: 'Var G vs H' },
  { x: 0.9, y: 0.3, z: 500, name: 'Var I vs J' },
];

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState({ licenses: [], invoices: [], downloads: [] });
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [correlationData, setCorrelationData] = useState<{x: number, y: number}[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'none' | 'valid' | 'invalid'>('none');
  const navigate = useNavigate();

  const fetchAIInsights = async (dataToAnalyze: any) => {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    try {
      setLoading(true);
      const response = await dataService.getAIInsights(dataToAnalyze, token);
      setAiInsights(response.insights ? response.insights.split('\n').filter(Boolean) : []);
    } catch (err) {
      console.error("Failed to fetch AI insights", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/auth');
        return;
      }
      setLoading(true);
      try {
        const [profile, licenses, invoices, downloads] = await Promise.all([
          authService.getProfile(token),
          dashboardService.getLicenses(token),
          dashboardService.getInvoices(token),
          dashboardService.getDownloads(token),
        ]);
        setUser(profile);
        setData({ licenses, invoices, downloads });
        
        // Mock some AI insights if they don't exist
        setAiInsights([
          "🟠 Alerte : Chute de 12% des performances au T2",
          "🟢 Opportunité : Segment de marché sous-exploité détecté",
          "🔵 Tendance : Corrélation forte entre X et Y identifiée"
        ]);
      } catch (err: any) {
        console.error('Failed to fetch dashboard data', err);
        if (err.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/auth');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handlePdfDownload = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    try {
      await dataService.generatePDF(aiInsights, "Executive_Report", token);
    } catch (err) {
      console.error(err);
    }
  };
const handleDrop = async (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragging(false);
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const token = localStorage.getItem('access_token');
    try {
      setLoading(true);
      // Upload and get processed file
      await dataService.uploadFile(files[0], token || undefined);

      // Trigger AI analysis if authenticated
      if (token) {
         await fetchAIInsights({ filename: files[0].name });
         setActiveTab('ai_hub');
      } else {
         window.location.reload();
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  }
};


  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress sx={{ color: '#2dd4bf' }} /></Box>;

  return (
    <Box sx={{ background: '#0f172a', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar - Fixée à gauche */}
      <Box sx={{ 
        width: 280, 
        borderRight: '1px solid rgba(45, 212, 191, 0.2)', 
        background: 'rgba(30, 41, 59, 0.5)', 
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        zIndex: 1000
      }}>
        {/* User Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
          <Avatar 
            src={user?.profile_picture} 
            sx={{ width: 48, height: 48, bgcolor: '#2dd4bf', boxShadow: '0 0 15px rgba(45, 212, 191, 0.3)' }}
          >
            {user?.first_name?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 700 }}>
              {user?.first_name} {user?.last_name}
            </Typography>
            <Chip 
              label={user?.subscription_plan?.toUpperCase() || 'BASE'} 
              size="small" 
              sx={{ height: 20, fontSize: '0.65rem', background: 'rgba(45, 212, 191, 0.1)', color: '#2dd4bf', border: '1px solid rgba(45, 212, 191, 0.2)' }} 
            />
          </Box>
        </Box>

        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 1.5 }}>
                <ListItemButton
                  selected={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    transition: 'all 0.2s',
                    '&.Mui-selected': {
                      background: 'rgba(45, 212, 191, 0.1)',
                      borderLeft: '4px solid #2dd4bf',
                      '&:hover': { background: 'rgba(45, 212, 191, 0.15)' },
                    },
                    '&:hover': { background: 'rgba(45, 212, 191, 0.05)' },
                  }}
                >
                  <Icon size={22} color={activeTab === item.id ? '#2dd4bf' : '#94a3b8'} style={{ marginRight: 16 }} />
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        color: activeTab === item.id ? '#2dd4bf' : '#94a3b8',
                        fontWeight: activeTab === item.id ? 700 : 500,
                        fontSize: '0.95rem'
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ ml: '280px', flexGrow: 1, p: 6 }}>
        
        {/* Onglet 1 : Aperçu & Fichiers */}
        {activeTab === 'overview' && (
          <Box>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 4 }}>Aperçu & Fichiers</Typography>
            
            <Paper 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              sx={{ 
                p: 8, 
                mb: 6, 
                background: 'rgba(15, 23, 42, 0.5)', 
                border: `2px dashed ${isDragging ? '#2dd4bf' : 'rgba(45, 212, 191, 0.3)'}`,
                borderRadius: 4,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': { background: 'rgba(45, 212, 191, 0.02)', borderColor: '#2dd4bf' }
              }}
            >
              <Upload size={64} color="#2dd4bf" style={{ marginBottom: 20 }} />
              <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>Glissez-déposez votre fichier</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>CSV, JSON ou Excel supportés (Max 50MB)</Typography>
            </Paper>

            <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>Fichiers récents</Typography>
            <Paper sx={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <List disablePadding>
                {data.downloads.slice(0, 5).map((file: any, i) => (
                  <ListItem key={i} sx={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)', py: 2, px: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <TableIcon size={24} color="#94a3b8" />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>{file.name}</Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.8rem' }}>{file.size} • {file.date}</Typography>
                      </Box>
                      <Button startIcon={<Download size={18} />} sx={{ color: '#2dd4bf', '&:hover': { background: 'rgba(45, 212, 191, 0.1)' } }}>
                        Télécharger
                      </Button>
                    </Box>
                  </ListItem>
                ))}
                {data.downloads.length === 0 && (
                  <ListItem sx={{ py: 4, justifyContent: 'center' }}>
                    <Typography sx={{ color: '#94a3b8' }}>Aucun fichier traité récemment.</Typography>
                  </ListItem>
                )}
              </List>
            </Paper>
          </Box>
        )}

        {/* Onglet 2 : Hub Décisionnel IA */}
        {activeTab === 'ai_hub' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 800 }}>Hub Décisionnel IA</Typography>
              <Button 
                variant="contained" 
                startIcon={<Download size={20} />}
                onClick={handlePdfDownload}
                sx={{ 
                  background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 4
                }}
              >
                Télécharger le Rapport PDF Exécutif
              </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 6 }}>
              {aiInsights.map((insight, i) => (
                <Grid item xs={12} key={i}>
                  <Paper sx={{ 
                    p: 3, 
                    background: 'rgba(30, 41, 59, 0.8)', 
                    borderLeft: `6px solid ${insight.includes('🟢') ? '#2dd4bf' : insight.includes('🟠') ? '#f97316' : '#3b82f6'}`,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3
                  }}>
                    {insight.includes('🟢') ? <Lightbulb color="#2dd4bf" size={32} /> : 
                     insight.includes('🟠') ? <AlertCircle color="#f97316" size={32} /> : 
                     <TrendingUp color="#3b82f6" size={32} />}
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>{insight}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>Analyse de Corrélation</Typography>
            <Paper sx={{ p: 4, background: 'rgba(15, 23, 42, 0.5)', borderRadius: 4, border: '1px solid rgba(45, 212, 191, 0.2)' }}>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis type="number" dataKey="x" stroke="#94a3b8" />
                  <YAxis type="number" dataKey="y" stroke="#94a3b8" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Variables" data={correlationData} fill="#2dd4bf">
                    {correlationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.y > 0.7 ? '#ef4444' : '#2dd4bf'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        )}

        {/* Onglet 3 : Mode Hackathon */}
        {activeTab === 'hackathon' && (
          <Box>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 4 }}>Machine à Hackathon</Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 4, background: 'rgba(45, 212, 191, 0.1)', border: '1px solid #2dd4bf', borderRadius: 4, textAlign: 'center' }}>
                  <Typography variant="subtitle2" sx={{ color: '#2dd4bf', mb: 2, fontWeight: 700 }}>BASELINE SCORE</Typography>
                  <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                    <CircularProgress variant="determinate" value={84.5} size={120} sx={{ color: '#2dd4bf' }} />
                    <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h4" sx={{ color: 'white', fontWeight: 800 }}>0.845</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>AUC Score estimé en 2s</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 4, background: 'rgba(30, 41, 59, 0.8)', borderRadius: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Wand2 color="#2dd4bf" />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>Studio Feature Engineering</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {["Extraire les week-ends", "Target Encoding", "Log Transformation", "Imputation Mean", "Interaction X*Y"].map((task, i) => (
                      <Grid item xs={6} key={i}>
                        <FormControlLabel
                          control={<Checkbox sx={{ color: '#94a3b8', '&.Mui-checked': { color: '#2dd4bf' } }} />}
                          label={<Typography sx={{ color: '#cbd5e1' }}>{task}</Typography>}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ 
                  p: 4, 
                  background: submissionStatus === 'valid' ? 'rgba(45, 212, 191, 0.05)' : submissionStatus === 'invalid' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(15, 23, 42, 0.8)',
                  border: `2px solid ${submissionStatus === 'valid' ? '#2dd4bf' : submissionStatus === 'invalid' ? '#ef4444' : 'rgba(148, 163, 184, 0.3)'}`,
                  borderRadius: 4
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ p: 2, borderRadius: '50%', background: submissionStatus === 'valid' ? '#2dd4bf' : submissionStatus === 'invalid' ? '#ef4444' : '#64748b' }}>
                      {submissionStatus === 'valid' ? <CheckCircle color="white" /> : submissionStatus === 'invalid' ? <XCircle color="white" /> : <TableIcon color="white" />}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>Submission Validator (Safety Belt)</Typography>
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        {submissionStatus === 'valid' ? "🟢 Prêt à soumettre ! 100% conforme à sample_submission.csv" : 
                         submissionStatus === 'invalid' ? "🔴 Erreur : 3 valeurs manquantes détectées à la ligne 452" :
                         "Glissez votre fichier final ici pour vérification immédiate."}
                      </Typography>
                    </Box>
                    <Button 
                      variant="outlined" 
                      onClick={() => setSubmissionStatus(submissionStatus === 'valid' ? 'invalid' : 'valid')}
                      sx={{ borderColor: '#2dd4bf', color: '#2dd4bf' }}
                    >
                      Simuler Test
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Onglet 4 : Licence & Facturation */}
        {activeTab === 'billing' && (
          <Box>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 4 }}>Licence & Facturation</Typography>
            
            <Paper sx={{ p: 4, mb: 4, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(45, 212, 191, 0.2)', borderRadius: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Key color="#2dd4bf" size={32} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>Détails de la Licence</Typography>
                </Box>
                <Button variant="contained" sx={{ background: '#2dd4bf' }}>Gérer sur Stripe</Button>
              </Box>
              
              {data.licenses.map((lic: any, i) => (
                <Grid container key={i} spacing={3}>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>ID LICENCE</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 700 }}>{lic.id}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>STATUT</Typography>
                    <Chip label={lic.status} size="small" sx={{ background: 'rgba(45, 212, 191, 0.1)', color: '#2dd4bf', ml: 1 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>PLAN</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 700 }}>{lic.product}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>EXPIRATION</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 700 }}>{lic.expires}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Paper>

            <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>Historique des Factures</Typography>
            <Paper sx={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: 3, overflow: 'hidden' }}>
              <List disablePadding>
                {data.invoices.map((inv: any, i) => (
                  <ListItem key={i} sx={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)', py: 2, px: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <FileText size={24} color="#94a3b8" />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>{inv.id}</Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.8rem' }}>{inv.date} • {inv.amount}</Typography>
                      </Box>
                      <Chip label={inv.status} size="small" sx={{ background: 'rgba(45, 212, 191, 0.1)', color: '#2dd4bf' }} />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}

      </Box>
    </Box>
  );
}
