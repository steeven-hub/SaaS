import { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { Brain, Download, BarChart3, Activity, CheckCircle, PieChart } from 'lucide-react';
import { decisionService } from '../../services/decisionService';
import { useNavigate } from 'react-router-dom';

export function AIDecisionHub() {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInsights = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/auth');
        return;
      }
      setLoading(true);
      try {
        // Using dummy data as placeholder for analysis request
        const data = { sample_dataset: 'Q2 Financials' };
        const response = await decisionService.getInsights(data, token);
        setInsights([response.insights]);
      } catch (err) {
        console.error('Failed to fetch insights', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [navigate]);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>
            AI Decision Hub
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8' }}>
            Automated insights and data-driven recommendations powered by AI
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          startIcon={<Download size={20} />}
          sx={{
            py: 1.5,
            px: 4,
            background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
            fontWeight: 700,
          }}
        >
          Download PDF Executive Report
        </Button>
      </Box>

      {/* Smart Insights */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(45, 212, 191, 0.2)',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Brain size={28} color="#2dd4bf" />
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
            Smart Insights
          </Typography>
        </Box>

        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress color="secondary" /></Box>
        ) : (
            <Grid container spacing={3}>
            {insights.map((insight: string, index: number) => (
                <Grid item xs={12} md={6} key={index}>
                    <Paper sx={{ p: 3, background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #2dd4bf', borderRadius: 2 }}>
                        <Typography variant="body1" sx={{ color: '#cbd5e1' }}>{insight}</Typography>
                    </Paper>
                </Grid>
            ))}
            </Grid>
        )}
      </Paper>
    </Container>
  );
}
