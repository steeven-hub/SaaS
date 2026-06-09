import { Container, Box, Typography, Paper, Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/material';
import { Rocket, Zap, Bug } from 'lucide-react';

const changelogData = [
  { version: 'v1.0.0', date: '2026-06-07', title: 'Initial Release', description: 'Launch of SaaS-Data Engine with core features.', icon: Rocket },
];

export function ChangelogPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 4, textAlign: 'center' }}>
        Changelog
      </Typography>
      <Paper sx={{ p: 4, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(45, 212, 191, 0.2)', borderRadius: 2 }}>
        {changelogData.map((item, index) => {
          const Icon = item.icon;
          return (
            <Box key={index} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Icon size={24} color="#2dd4bf" />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                  {item.version} - {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>({item.date})</Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#cbd5e1', pl: 5 }}>
                {item.description}
              </Typography>
            </Box>
          );
        })}
      </Paper>
    </Container>
  );
}
