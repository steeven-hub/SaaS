import { useState } from 'react';
import { Container, Box, Typography, Button, Paper, Grid, Divider, Radio, RadioGroup, FormControlLabel, Chip } from '@mui/material';
import { CreditCard, Lock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { billingService } from '../../services/billingService';

export function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem('access_token'); 
    if (!token) {
        navigate('/auth');
        return;
    }

    try {
        const { url } = await billingService.createCheckoutSession(selectedPlan, token);
        window.location.href = url;
    } catch (error) {
        console.error('Checkout failed:', error);
    }
  };

  return (
    <Box sx={{ background: '#0f172a', minHeight: 'calc(100vh - 64px)', py: 6 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 2 }}>
            Secure Checkout
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 4,
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(45, 212, 191, 0.2)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
                Select a Plan
              </Typography>

              <RadioGroup value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                <FormControlLabel value="starter" sx={{ color: 'white' }} control={<Radio sx={{ color: '#2dd4bf' }} />} label="Plan Base (29 $/mois)" />
                <FormControlLabel value="pro" sx={{ color: 'white' }} control={<Radio sx={{ color: '#2dd4bf' }} />} label="Plan Pro (99 $/mois)" />
                <FormControlLabel value="enterprise" sx={{ color: 'white' }} control={<Radio sx={{ color: '#2dd4bf' }} />} label="Plan Enterprise (Coutumes)" />
              </RadioGroup>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleCheckout}
                sx={{
                  mt: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
                  fontWeight: 700,
                }}
              >
                Proceed to Secure Payment
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
