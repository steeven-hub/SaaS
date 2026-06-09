import { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid, TextField, Button, List, ListItem, ListItemText, CircularProgress, Alert, Chip } from '@mui/material';
import { Users, UserPlus, Mail } from 'lucide-react';

import { API_BASE_URL } from '../../config';

export function TeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/teams/members`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (err) {
      setError('Erreur lors du chargement des membres.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${API_BASE_URL}/teams/members`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSuccess('Membre ajouté avec succès.');
        setEmail('');
        fetchMembers();
      } else {
        const data = await response.json();
        setError(data.detail || 'Erreur lors de l\'ajout.');
      }
    } catch (err) {
      setError('Erreur lors de la communication avec le serveur.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 4 }}>
        Gestion de l'Équipe
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 4, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(45, 212, 191, 0.2)', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <UserPlus size={24} color="#2dd4bf" />
          <Typography variant="h6" sx={{ color: 'white' }}>Ajouter un membre</Typography>
        </Box>
        <form onSubmit={handleAddMember} style={{ display: 'flex', gap: 10 }}>
          <TextField
            fullWidth
            label="Email du membre"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' } }, '& .MuiInputLabel-root': { color: '#94a3b8' } }}
          />
          <Button type="submit" variant="contained" sx={{ background: '#2dd4bf', '&:hover': { background: '#14b8a6' } }}>
            Inviter
          </Button>
        </form>
      </Paper>

      <Paper sx={{ mt: 4, p: 4, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(45, 212, 191, 0.2)', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Users size={20} color="#2dd4bf" /> Membres actuels
        </Typography>
        {loading ? <CircularProgress sx={{ color: '#2dd4bf' }} /> : (
          <List>
            {members.map((member) => (
              <ListItem key={member.id} sx={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
                <ListItemText primary={`${member.first_name} ${member.last_name}`} secondary={member.email} secondaryTypographyProps={{ sx: { color: '#94a3b8' } }} primaryTypographyProps={{ sx: { color: 'white' } }} />
                <Chip label={member.role} size="small" sx={{ background: 'rgba(45, 212, 191, 0.1)', color: '#2dd4bf' }} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}
