import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Tab, Tabs, Paper, InputAdornment, IconButton } from '@mui/material';
import { motion } from 'motion/react';
import { Database, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { authService } from '../../services/authService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export function AuthPage() {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      navigate('/landing');
    } catch (error: any) {
      console.error(error);
      const message = error.message || 'Login failed';
      alert(message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(email, password);
      alert('Account created! Please sign in.');
      setTabValue(0);
    } catch (error: any) {
      console.error(error);
      const errorData = await error.response?.json() || {};
      const message = errorData.email ? `Email error: ${errorData.email.join(', ')}` : 'Registration failed';
      alert(message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
              <Database size={48} color="#2dd4bf" />
              <Typography variant="h2" sx={{ fontWeight: 800, color: 'white' }}>
                SaaS-Data Engine
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: '#94a3b8' }}>
              Transform your data into actionable insights
            </Typography>
          </Box>

          <Paper
            elevation={24}
            sx={{
              p: 4,
              background: 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(45, 212, 191, 0.2)',
              borderRadius: 3,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                mb: 3,
                '& .MuiTab-root': {
                  color: '#94a3b8',
                  fontWeight: 600,
                  fontSize: '1rem',
                },
                '& .Mui-selected': {
                  color: '#2dd4bf !important',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#2dd4bf',
                  height: 3,
                },
              }}
            >
              <Tab label="Sign In" />
              <Tab label="Create Account" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color="#2dd4bf" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: '#2dd4bf' },
                      '&.Mui-focused fieldset': { borderColor: '#2dd4bf' },
                    },
                    '& .MuiInputLabel-root': { color: '#94a3b8' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#2dd4bf' },
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} color="#2dd4bf" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#94a3b8' }}>
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: '#2dd4bf' },
                      '&.Mui-focused fieldset': { borderColor: '#2dd4bf' },
                    },
                    '& .MuiInputLabel-root': { color: '#94a3b8' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#2dd4bf' },
                  }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                    },
                  }}
                >
                  Sign In
                </Button>
                <Typography variant="body2" align="center" sx={{ mt: 2, color: '#2dd4bf', cursor: 'pointer' }}>
                  Forgot password?
                </Typography>
              </form>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <form onSubmit={handleSignup}>
                <TextField
                  fullWidth
                  label="Full Name"
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <User size={20} color="#2dd4bf" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: '#2dd4bf' },
                      '&.Mui-focused fieldset': { borderColor: '#2dd4bf' },
                    },
                    '& .MuiInputLabel-root': { color: '#94a3b8' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#2dd4bf' },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color="#2dd4bf" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: '#2dd4bf' },
                      '&.Mui-focused fieldset': { borderColor: '#2dd4bf' },
                    },
                    '& .MuiInputLabel-root': { color: '#94a3b8' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#2dd4bf' },
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} color="#2dd4bf" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#94a3b8' }}>
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: '#2dd4bf' },
                      '&.Mui-focused fieldset': { borderColor: '#2dd4bf' },
                    },
                    '& .MuiInputLabel-root': { color: '#94a3b8' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#2dd4bf' },
                  }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                    },
                  }}
                >
                  Create Account
                </Button>
              </form>
            </TabPanel>
          </Paper>

          <Typography variant="body2" align="center" sx={{ mt: 3, color: '#64748b' }}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
