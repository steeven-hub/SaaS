import { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid, Avatar, Divider, Button, TextField, CircularProgress, Tabs, Tab } from '@mui/material';
import { Shield, Save, Upload, Link } from 'lucide-react';

import { API_BASE_URL, BACKEND_URL } from '../../config';

export function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [avatarTab, setAvatarTab] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateAvatar = async (data: any, isFile: boolean) => {
    try {
        const token = localStorage.getItem('access_token');
        const headers: HeadersInit = { 'Authorization': `Bearer ${token}` };
        
        let body;
        if (isFile) {
            body = data;
        } else {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }
        
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'PATCH',
            headers: headers,
            body: body
        });
        if (response.ok) {
            const updatedUser = await response.json();
            setUser(updatedUser);
            setSelectedFile(null);
            setNewAvatarUrl('');
        }
    } catch (error) {
        console.error('Failed to update avatar:', error);
    }
  }

  const handleFileUpload = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('profile_picture', selectedFile);
    updateAvatar(formData, true);
  }

  const handleUrlUpdate = () => {
    if (!newAvatarUrl) return;
    updateAvatar({ profile_picture_url: newAvatarUrl }, false);
  }

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}><CircularProgress sx={{ color: '#2dd4bf' }} /></Box>;

  const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  const getAvatarSrc = () => {
      const src = user?.profile_picture || user?.profile_picture_url;
      if (src && src.startsWith('/media/')) {
          return `${BACKEND_URL}${src}`;
      }
      return src;
  };
  const avatarSrc = getAvatarSrc();

  return (
    <Box sx={{ background: '#0f172a', minHeight: 'calc(100vh - 64px)', py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 4 }}>Mon Profil</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(45, 212, 191, 0.2)', borderRadius: 3, textAlign: 'center' }}>
              <Avatar src={avatarSrc} sx={{ width: 100, height: 100, bgcolor: '#2dd4bf', fontSize: '2.5rem', mx: 'auto', mb: 2, boxShadow: '0 0 20px rgba(45, 212, 191, 0.3)' }}>
                {!avatarSrc && (fullName?.charAt(0) || 'U')}
              </Avatar>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>{fullName || 'Utilisateur'}</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>{user?.subscription_plan || 'Plan Base'}</Typography>
              <Divider sx={{ bgcolor: 'rgba(148, 163, 184, 0.1)', mb: 3 }} />
              
              <Tabs value={avatarTab} onChange={(_, newValue) => setAvatarTab(newValue)} variant="fullWidth" sx={{ mb: 2 }}>
                <Tab icon={<Upload size={16}/>} label="Fichier" sx={{ color: '#94a3b8' }} />
                <Tab icon={<Link size={16}/>} label="URL" sx={{ color: '#94a3b8' }} />
              </Tabs>
              
              {avatarTab === 0 ? (
                <>
                    <Button variant="outlined" component="label" fullWidth sx={{ mb: 1, color: '#2dd4bf', borderColor: '#2dd4bf' }}>
                        Choisir fichier
                        <input type="file" hidden accept="image/*" onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])} />
                    </Button>
                    {selectedFile && <Typography variant="caption" sx={{ color: 'white', display: 'block', mb: 1 }}>{selectedFile.name}</Typography>}
                    <Button variant="contained" fullWidth disabled={!selectedFile} onClick={handleFileUpload} sx={{ background: '#2dd4bf' }}>Charger</Button>
                </>
              ) : (
                <>
                    <TextField placeholder="URL de l'image" value={newAvatarUrl} onChange={(e) => setNewAvatarUrl(e.target.value)} sx={{ mb: 1, ...textFieldStyles }} size="small" fullWidth />
                    <Button variant="contained" fullWidth disabled={!newAvatarUrl} onClick={handleUrlUpdate} sx={{ background: '#2dd4bf' }}>Mettre à jour</Button>
                </>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(45, 212, 191, 0.2)', borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Shield size={20} color="#2dd4bf" /> Informations Personnelles
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Nom complet" value={fullName || ''} InputProps={{ readOnly: true }} sx={textFieldStyles} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Email" value={user?.email || ''} InputProps={{ readOnly: true }} sx={textFieldStyles} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Lien de parrainage" value={`http://localhost:5173/auth?ref=${user?.affiliate_code || ''}`} InputProps={{ readOnly: true, endAdornment: <Button onClick={() => navigator.clipboard.writeText(`http://localhost:5173/auth?ref=${user?.affiliate_code || ''}`)}>Copier</Button> }} sx={textFieldStyles} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Plan actuel" value={user?.subscription_plan || 'Base'} InputProps={{ readOnly: true }} sx={textFieldStyles} /></Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
const textFieldStyles = {
  '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' }, '&.Mui-focused fieldset': { borderColor: '#2dd4bf' } },
  '& .MuiInputLabel-root': { color: '#94a3b8' },
};
