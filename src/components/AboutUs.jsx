import React from 'react';
import { 
  Container,
  Box,
  Typography,
  Grid,
  Card,
  Avatar,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

// Create a properly structured custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',  // Added main property
      light: '#81c784',  // Light variant
      contrastText: '#ffffff',
    },
    common: {
      white: '#ffffff',
    },
  },
});

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  height: '60vh',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.unsplash.com/photo-1523381210434-271e8be1f52b)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(8),
}));

const MissionCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(8),
}));

const TeamCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderRadius: '16px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const EcoBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  padding: theme.spacing(1, 2),
  borderRadius: '20px',
  margin: theme.spacing(1, 0),
}));

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AboutUsContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Fashion enthusiast with a vision for sustainable apparel',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Jamie Smith',
      role: 'Design Director',
      bio: 'Creates trends instead of following them',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Taylor Wong',
      role: 'Sustainability Lead',
      bio: 'Ensures our products meet the highest eco-standards',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    },
  ];

  const ecoPractices = [
    {
      title: 'Organic Cotton',
      description: '100% GOTS certified organic cotton for all our basics',
      icon: '🌱',
    },
    {
      title: 'Water-Based Inks',
      description: 'Non-toxic, eco-friendly printing that lasts',
      icon: '🎨',
    },
    {
      title: 'Carbon Neutral',
      description: 'We offset all our carbon emissions from production',
      icon: '♻️',
    },
    {
      title: 'Ethical Factories',
      description: 'Fair wages and safe conditions for all workers',
      icon: '✊',
    },
  ];

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <Typography variant={isMobile ? 'h3' : 'h2'} component="h1" gutterBottom sx={{ fontWeight: 900 }}>
              Wear Your Values
            </Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} component="p" sx={{ maxWidth: '700px', margin: '0 auto' }}>
              We create fashion that doesn't cost the earth. Trendy tees with a conscience.
            </Typography>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Mission Statement */}
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MissionCard>
            <Typography variant={isMobile ? 'h5' : 'h4'} component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
              We're on a mission to revolutionize the fashion industry by proving that style and sustainability 
              can coexist. Every tee tells a story - of ethical production, eco-friendly materials, and timeless 
              design that outlasts fast fashion trends.
            </Typography>
          </MissionCard>
        </motion.div>

        {/* Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 700, mb: 6 }}>
            Meet The Crew
          </Typography>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={fadeInUp}>
                    <TeamCard>
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        sx={{ width: 120, height: 120, mb: 3 }}
                      />
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                        {member.role}
                      </Typography>
                      <Typography variant="body2" textAlign="center">
                        {member.bio}
                      </Typography>
                    </TeamCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Sustainability Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 700, mb: 6 }}>
            Our Sustainable Practices
          </Typography>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              {ecoPractices.map((practice, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {practice.icon}
                      </Typography>
                      <EcoBadge>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {practice.title}
                        </Typography>
                      </EcoBadge>
                      <Typography variant="body1" sx={{ mt: 2 }}>
                        {practice.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Closing CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Join the Movement
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: '700px', margin: '0 auto', mb: 3 }}>
              Every purchase supports ethical fashion and helps reduce the industry's environmental impact.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

const AboutUs = () => {
  return (
    <ThemeProvider theme={theme}>
      <AboutUsContent />
    </ThemeProvider>
  );
};

export default AboutUs;