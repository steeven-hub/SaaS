import { useState } from 'react';
import { Container, Typography, Paper, Button, CircularProgress, Alert, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { PlayArrow } from 'lucide-react';
import { runMarketPipeline } from '../services/pipelineService';

export function DataPipelinePage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunPipeline = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await runMarketPipeline();
      setMetrics(data.metrics);
    } catch (err) {
      setError('Erreur lors de l\'exécution du pipeline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 4 }}>
        Pipeline de Données Marchés
      </Typography>

      <Paper sx={{ p: 4, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(45, 212, 191, 0.2)', borderRadius: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<PlayArrow />} 
          onClick={handleRunPipeline}
          disabled={loading}
          sx={{ background: '#2dd4bf', '&:hover': { background: '#14b8a6' } }}
        >
          {loading ? <CircularProgress size={24} /> : 'Exécuter le Pipeline'}
        </Button>
      </Paper>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {metrics && (
        <Paper sx={{ mt: 4, p: 4, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(45, 212, 191, 0.2)', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Indicateurs de Qualité</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#94a3b8' }}>Métrique</TableCell>
                  <TableCell sx={{ color: '#94a3b8' }}>Valeur</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(metrics).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell sx={{ color: 'white' }}>{key}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{String(value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}
