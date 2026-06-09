import { useState } from 'react';
import { Box, Container, Typography, Paper, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Terminal, Book, Zap, Code, Rocket } from 'lucide-react';

const sections = [
  { id: 'installation', title: 'Installation', icon: Rocket },
  { id: 'quickstart', title: 'Quick Start', icon: Zap },
  { id: 'configuration', title: 'Configuration', icon: Code },
  { id: 'api', title: 'API Reference', icon: Book },
];

const codeBlocks = {
  installation: `# Install via npm
npm install @saas-data-engine/cli --global

# Or using yarn
yarn global add @saas-data-engine/cli

# Verify installation
sde --version`,
  quickstart: `# Initialize new project
sde init my-project

# Navigate to project
cd my-project

# Start development server
sde dev

# Build for production
sde build`,
  configuration: `// sde.config.js
module.exports = {
  dataSource: {
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
    database: 'mydb'
  },
  analytics: {
    enabled: true,
    aiInsights: true
  },
  security: {
    encryption: 'AES-256',
    authentication: 'OAuth2'
  }
}`,
  api: `// Import the SDK
import { SaasDataEngine } from '@saas-data-engine/sdk';

// Initialize client
const client = new SaasDataEngine({
  apiKey: process.env.SDE_API_KEY
});

// Process data
const result = await client.process({
  source: 'data.csv',
  operations: ['clean', 'analyze', 'visualize']
});

// Get AI insights
const insights = await client.getInsights(result.id);`,
};

export function QuickStartPage() {
  const [activeSection, setActiveSection] = useState('installation');

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Sidebar */}
        <Paper
          sx={{
            width: 280,
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(45, 212, 191, 0.2)',
            borderRadius: 2,
            p: 2,
            position: 'sticky',
            top: 20,
            height: 'fit-content',
          }}
        >
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 2, px: 1 }}>
            Documentation
          </Typography>
          <Divider sx={{ borderColor: 'rgba(45, 212, 191, 0.2)', mb: 2 }} />
          <List>
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <ListItem key={section.id} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    selected={activeSection === section.id}
                    onClick={() => setActiveSection(section.id)}
                    sx={{
                      borderRadius: 1,
                      '&.Mui-selected': {
                        background: 'rgba(45, 212, 191, 0.15)',
                        borderLeft: '3px solid #2dd4bf',
                        '&:hover': {
                          background: 'rgba(45, 212, 191, 0.2)',
                        },
                      },
                      '&:hover': {
                        background: 'rgba(45, 212, 191, 0.05)',
                      },
                    }}
                  >
                    <Icon size={20} color={activeSection === section.id ? '#2dd4bf' : '#94a3b8'} style={{ marginRight: 12 }} />
                    <ListItemText
                      primary={section.title}
                      primaryTypographyProps={{
                        sx: {
                          color: activeSection === section.id ? '#2dd4bf' : '#cbd5e1',
                          fontWeight: activeSection === section.id ? 600 : 400,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Paper>

        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          <Paper
            sx={{
              p: 5,
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(45, 212, 191, 0.2)',
              borderRadius: 2,
            }}
          >
            {/* Installation Section */}
            {activeSection === 'installation' && (
              <Box>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 3 }}>
                  Installation
                </Typography>
                <Typography variant="body1" sx={{ color: '#cbd5e1', mb: 4, lineHeight: 1.8 }}>
                  Get started with SaaS-Data Engine in minutes. Our CLI tool provides everything you need to process,
                  analyze, and visualize your data.
                </Typography>

                <Typography variant="h5" sx={{ color: '#2dd4bf', fontWeight: 700, mb: 2 }}>
                  Prerequisites
                </Typography>
                <Typography variant="body1" sx={{ color: '#cbd5e1', mb: 3, lineHeight: 1.8 }}>
                  • Node.js 16.x or higher
                  <br />
                  • npm or yarn package manager
                  <br />• A SaaS-Data Engine account (sign up for free)
                </Typography>

                <Typography variant="h5" sx={{ color: '#2dd4bf', fontWeight: 700, mb: 2 }}>
                  Install the CLI
                </Typography>
                <Paper
                  sx={{
                    background: '#0f172a',
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid rgba(45, 212, 191, 0.3)',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Terminal size={20} color="#2dd4bf" />
                    <Typography variant="body2" sx={{ color: '#2dd4bf', fontWeight: 600 }}>
                      Terminal
                    </Typography>
                  </Box>
                  <pre
                    style={{
                      margin: 0,
                      color: '#cbd5e1',
                      fontFamily: 'Monaco, Consolas, monospace',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {codeBlocks.installation}
                  </pre>
                </Paper>
              </Box>
            )}

            {/* Quick Start Section */}
            {activeSection === 'quickstart' && (
              <Box>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 3 }}>
                  Quick Start Guide
                </Typography>
                <Typography variant="body1" sx={{ color: '#cbd5e1', mb: 4, lineHeight: 1.8 }}>
                  Create your first data processing project in just a few commands.
                </Typography>

                <Typography variant="h5" sx={{ color: '#2dd4bf', fontWeight: 700, mb: 2 }}>
                  1. Create a New Project
                </Typography>
                <Paper
                  sx={{
                    background: '#0f172a',
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid rgba(45, 212, 191, 0.3)',
                    mb: 4,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Terminal size={20} color="#2dd4bf" />
                    <Typography variant="body2" sx={{ color: '#2dd4bf', fontWeight: 600 }}>
                      Terminal
                    </Typography>
                  </Box>
                  <pre
                    style={{
                      margin: 0,
                      color: '#cbd5e1',
                      fontFamily: 'Monaco, Consolas, monospace',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {codeBlocks.quickstart}
                  </pre>
                </Paper>

                <Typography variant="body1" sx={{ color: '#cbd5e1', lineHeight: 1.8 }}>
                  Your development server will start at{' '}
                  <code style={{ background: 'rgba(45, 212, 191, 0.15)', padding: '2px 8px', borderRadius: 4, color: '#2dd4bf' }}>
                    http://localhost:3000
                  </code>
                </Typography>
              </Box>
            )}

            {/* Configuration Section */}
            {activeSection === 'configuration' && (
              <Box>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 3 }}>
                  Configuration
                </Typography>
                <Typography variant="body1" sx={{ color: '#cbd5e1', mb: 4, lineHeight: 1.8 }}>
                  Customize your SaaS-Data Engine instance with a simple configuration file.
                </Typography>

                <Typography variant="h5" sx={{ color: '#2dd4bf', fontWeight: 700, mb: 2 }}>
                  Basic Configuration
                </Typography>
                <Paper
                  sx={{
                    background: '#0f172a',
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid rgba(45, 212, 191, 0.3)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Code size={20} color="#2dd4bf" />
                    <Typography variant="body2" sx={{ color: '#2dd4bf', fontWeight: 600 }}>
                      sde.config.js
                    </Typography>
                  </Box>
                  <pre
                    style={{
                      margin: 0,
                      color: '#cbd5e1',
                      fontFamily: 'Monaco, Consolas, monospace',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {codeBlocks.configuration}
                  </pre>
                </Paper>
              </Box>
            )}

            {/* API Reference Section */}
            {activeSection === 'api' && (
              <Box>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 3 }}>
                  API Reference
                </Typography>
                <Typography variant="body1" sx={{ color: '#cbd5e1', mb: 4, lineHeight: 1.8 }}>
                  Integrate SaaS-Data Engine into your application using our JavaScript/TypeScript SDK.
                </Typography>

                <Typography variant="h5" sx={{ color: '#2dd4bf', fontWeight: 700, mb: 2 }}>
                  Basic Usage
                </Typography>
                <Paper
                  sx={{
                    background: '#0f172a',
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid rgba(45, 212, 191, 0.3)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Code size={20} color="#2dd4bf" />
                    <Typography variant="body2" sx={{ color: '#2dd4bf', fontWeight: 600 }}>
                      JavaScript
                    </Typography>
                  </Box>
                  <pre
                    style={{
                      margin: 0,
                      color: '#cbd5e1',
                      fontFamily: 'Monaco, Consolas, monospace',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {codeBlocks.api}
                  </pre>
                </Paper>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
