import { Grid, Paper, Typography, Box, Avatar, Chip, LinearProgress, Divider, IconButton } from '@mui/material';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Award, Briefcase, GraduationCap, MapPin } from 'lucide-react';

const skills = [
  { name: 'UX Research', level: 95 },
  { name: 'UI Design', level: 90 },
  { name: 'Prototyping', level: 88 },
  { name: 'User Testing', level: 92 },
  { name: 'Design Systems', level: 85 },
  { name: 'Wireframing', level: 90 },
];

const tools = ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Miro', 'Optimal Workshop', 'Maze', 'UserTesting'];

const experiences = [
  {
    role: 'Senior UX Designer',
    company: 'TechCorp International',
    period: '2022 - Présent',
    description: 'Lead UX sur des projets B2B SaaS avec équipes distribuées.',
  },
  {
    role: 'UX Designer',
    company: 'StartupLab',
    period: '2019 - 2022',
    description: 'Design d\'applications mobiles et web pour startups innovantes.',
  },
  {
    role: 'Junior UX Designer',
    company: 'Digital Agency',
    period: '2017 - 2019',
    description: 'Participation à des projets e-commerce et sites institutionnels.',
  },
];

const certifications = [
  'Google UX Design Professional Certificate',
  'Nielsen Norman Group UX Certification',
  'Interaction Design Foundation - UX Management',
  'Certified Usability Analyst (CUA)',
];

export function Biography() {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                textAlign: 'center',
                position: 'sticky',
                top: 20,
              }}
            >
              <Avatar
                src="https://images.unsplash.com/photo-1581841064838-a470c740e8ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Designer UX"
                sx={{
                  width: 160,
                  height: 160,
                  margin: '0 auto 20px',
                  border: '4px solid #667eea',
                }}
              />

              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Julie Dupont
              </Typography>

              <Typography variant="h6" color="text.secondary" gutterBottom>
                Senior UX Designer
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                <MapPin size={16} color="#666" />
                <Typography variant="body2" color="text.secondary">
                  Paris, France
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                <IconButton
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    '&:hover': { background: 'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)' },
                  }}
                >
                  <Mail size={20} />
                </IconButton>
                <IconButton
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    '&:hover': { background: 'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)' },
                  }}
                >
                  <Linkedin size={20} />
                </IconButton>
                <IconButton
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    '&:hover': { background: 'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)' },
                  }}
                >
                  <Github size={20} />
                </IconButton>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                "Designer passionnée par la création d'expériences utilisateur mémorables et accessibles"
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                  À Propos
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Avec plus de 7 ans d'expérience dans le domaine du design UX/UI, je me spécialise dans la création
                  d'interfaces intuitives et centrées sur l'utilisateur. Mon approche combine recherche approfondie,
                  tests utilisateurs rigoureux et design itératif pour livrer des produits qui répondent aux besoins
                  réels des utilisateurs.
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Passionnée par l'accessibilité et le design inclusif, je m'efforce de créer des expériences qui
                  fonctionnent pour tous. Ma philosophie : chaque pixel compte, chaque interaction doit avoir un sens,
                  et le design doit toujours servir l'utilisateur final.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  En dehors du travail, je contribue à la communauté design en participant à des conférences, en
                  écrivant des articles sur Medium, et en mentorant des designers juniors.
                </Typography>
              </Paper>

              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Briefcase size={24} color="#667eea" />
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Expérience
                  </Typography>
                </Box>
                {experiences.map((exp, index) => (
                  <Box key={index} sx={{ mb: 3, pb: 3, borderBottom: index < experiences.length - 1 ? '1px solid #eee' : 'none' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {exp.role}
                    </Typography>
                    <Typography variant="body2" color="primary" gutterBottom>
                      {exp.company} • {exp.period}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.description}
                    </Typography>
                  </Box>
                ))}
              </Paper>

              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                  Compétences
                </Typography>
                {skills.map((skill) => (
                  <Box key={skill.name} sx={{ mb: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {skill.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {skill.level}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Paper>

              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                  Outils & Technologies
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {tools.map((tool) => (
                    <Chip
                      key={tool}
                      label={tool}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        px: 1,
                      }}
                    />
                  ))}
                </Box>
              </Paper>

              <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Award size={24} color="#667eea" />
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Certifications
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {certifications.map((cert, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <GraduationCap size={20} color="#667eea" />
                      <Typography variant="body1">{cert}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
}
