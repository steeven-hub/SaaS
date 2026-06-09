import { Grid, Card, CardMedia, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { motion } from 'motion/react';
import { Eye, Clock } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    title: 'Application Mobile Banking',
    description: 'Refonte complète de l\'expérience utilisateur pour une application bancaire mobile avec focus sur l\'accessibilité et la simplicité.',
    image: 'https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    tags: ['Mobile', 'Finance', 'UX Research'],
    duration: '3 mois',
    views: 1240,
  },
  {
    id: 2,
    title: 'Plateforme E-commerce',
    description: 'Conception d\'une expérience d\'achat fluide avec intégration de recommendations personnalisées et parcours utilisateur optimisé.',
    image: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    tags: ['Web', 'E-commerce', 'UI Design'],
    duration: '4 mois',
    views: 980,
  },
  {
    id: 3,
    title: 'Dashboard Analytics',
    description: 'Interface de visualisation de données complexes rendue intuitive grâce à une architecture d\'information réfléchie.',
    image: 'https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    tags: ['Dashboard', 'Data Viz', 'B2B'],
    duration: '2 mois',
    views: 1560,
  },
  {
    id: 4,
    title: 'Application de Fitness',
    description: 'Design d\'une app de suivi sportif avec gamification et parcours d\'onboarding personnalisé.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    tags: ['Mobile', 'Health', 'Gamification'],
    duration: '3 mois',
    views: 2100,
  },
  {
    id: 5,
    title: 'Outil de Collaboration',
    description: 'Plateforme collaborative pour équipes distribuées avec focus sur la communication asynchrone.',
    image: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    tags: ['SaaS', 'Collaboration', 'Remote Work'],
    duration: '5 mois',
    views: 1780,
  },
  {
    id: 6,
    title: 'Application Éducative',
    description: 'Conception d\'une expérience d\'apprentissage interactive pour enfants avec principes de design inclusif.',
    image: 'https://images.unsplash.com/photo-1627757818592-ce2649563a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    tags: ['Education', 'Mobile', 'Accessibility'],
    duration: '4 mois',
    views: 1450,
  },
];

export function CaseStudies() {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
            Études de Cas
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800 }}>
            Découvrez mes projets UX récents et les méthodologies appliquées pour résoudre des problèmes utilisateurs complexes.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {caseStudies.map((study, index) => (
            <Grid item xs={12} sm={6} md={4} key={study.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={study.image}
                    alt={study.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                      {study.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {study.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {study.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Clock size={16} color="#666" />
                        <Typography variant="caption" color="text.secondary">
                          {study.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Eye size={16} color="#666" />
                        <Typography variant="caption" color="text.secondary">
                          {study.views.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        borderColor: '#667eea',
                        color: '#667eea',
                        '&:hover': {
                          borderColor: '#667eea',
                          background: 'rgba(102, 126, 234, 0.05)',
                        },
                      }}
                    >
                      Voir le projet
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}
