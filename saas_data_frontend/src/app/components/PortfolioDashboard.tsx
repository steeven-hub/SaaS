import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Avatar } from '@mui/material';
import { Briefcase, User, LogOut } from 'lucide-react';

export function PortfolioDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/dashboard' && (location.pathname === '/dashboard' || location.pathname === '/dashboard/case-studies')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Portfolio UX Designer
          </Typography>

          <Button
            color="inherit"
            startIcon={<Briefcase size={20} />}
            onClick={() => navigate('/dashboard/case-studies')}
            sx={{
              mx: 1,
              borderBottom: isActive('/dashboard') || isActive('/dashboard/case-studies') ? '2px solid white' : '2px solid transparent',
              borderRadius: 0,
              pb: 0.5,
            }}
          >
            Études de cas
          </Button>

          <Button
            color="inherit"
            startIcon={<User size={20} />}
            onClick={() => navigate('/dashboard/biography')}
            sx={{
              mx: 1,
              borderBottom: isActive('/dashboard/biography') ? '2px solid white' : '2px solid transparent',
              borderRadius: 0,
              pb: 0.5,
            }}
          >
            Biographie
          </Button>

          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            <LogOut size={20} />
          </IconButton>

          <Avatar
            sx={{
              ml: 2,
              bgcolor: 'rgba(255,255,255,0.3)',
              width: 40,
              height: 40,
            }}
          >
            JD
          </Avatar>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
