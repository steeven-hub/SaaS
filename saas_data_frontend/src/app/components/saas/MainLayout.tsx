import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import { Database, Home, BookOpen, CreditCard, LayoutDashboard, Brain, Trophy, LogOut, LogIn, Sun, Moon, User, Users, Workflow } from 'lucide-react';
import { useTheme } from 'next-themes';
import { authService } from '../../services/authService';

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isAuthenticated = authService.isAuthenticated();

  const navItems = [
    { label: 'Landing', path: '/', icon: Home },
    { label: 'Docs', path: '/docs', icon: BookOpen },
    { label: 'Pricing', path: '/checkout', icon: CreditCard },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Hub', path: '/ai-hub', icon: Brain },
    { label: 'Hackathon', path: '/hackathon', icon: Trophy },
  ];

  // Add Profile to nav if authenticated
  if (isAuthenticated) {
    navItems.push({ label: 'Profil', path: '/profile', icon: User });
    navItems.push({ label: 'Équipe', path: '/team', icon: Users });
    navItems.push({ label: 'Pipeline', path: '/pipeline', icon: Workflow });
  }

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ensure only click triggers this
    authService.logout();
    navigate('/auth');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#0f172a' : '#f8fafc' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: theme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(45, 212, 191, 0.2)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
              <Database size={32} color="#2dd4bf" />
              <Typography variant="h6" sx={{ fontWeight: 800, color: theme === 'dark' ? 'white' : '#0f172a' }}>
                SaaS-Data Engine
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} sx={{ color: '#2dd4bf' }}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </IconButton>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                    }}
                    startIcon={<Icon size={18} />}
                    sx={{
                      color: isActive(item.path) ? '#2dd4bf' : (theme === 'dark' ? '#94a3b8' : '#64748b'),
                      borderBottom: isActive(item.path) ? '2px solid #2dd4bf' : '2px solid transparent',
                      borderRadius: 0,
                      px: 2,
                      fontWeight: 600,
                      '&:hover': {
                        background: 'rgba(45, 212, 191, 0.1)',
                        color: '#2dd4bf',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}

              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  startIcon={<LogOut size={18} />}
                  sx={{
                    color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    ml: 2,
                    '&:hover': {
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                    },
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/auth')}
                  startIcon={<LogIn size={18} />}
                  sx={{
                    color: '#2dd4bf',
                    ml: 2,
                    fontWeight: 700,
                    border: '1px solid #2dd4bf',
                    '&:hover': {
                      background: 'rgba(45, 212, 191, 0.1)',
                    },
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </Box>
  );
}
