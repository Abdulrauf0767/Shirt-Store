import React, { useState } from 'react';
import { 
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  styled
} from '@mui/material';
import { 
  LocationOn,
  Phone,
  Email,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  height: '50vh',
  minHeight: '400px',
  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(8),
  padding: theme.spacing(4),
}));

const ContactFormCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '16px',
  boxShadow: theme.shadows[4],
  padding: theme.spacing(4),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[8],
  },
}));

const ContactInfoCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '16px',
  boxShadow: theme.shadows[4],
  padding: theme.spacing(4),
  height: '100%',
}));

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ContactUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      subject: formData.subject.trim() === '',
      message: formData.message.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form submission logic would go here
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth="md">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant={isMobile ? 'h3' : 'h2'} 
                component="h1" 
                gutterBottom 
                sx={{ fontWeight: 700 }}
              >
                Get In Touch
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h5'} 
                component="p" 
                sx={{ maxWidth: '700px', margin: '0 auto' }}
              >
                Have questions about our products or want to collaborate? We'd love to hear from you!
              </Typography>
            </motion.div>
          </Container>
        </HeroSection>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mb: 8 }}>
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ContactFormCard>
                  <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                    Send Us a Message
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          variant="outlined"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          error={errors.name}
                          helperText={errors.name ? 'Please enter your name' : ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          variant="outlined"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                          helperText={errors.email ? 'Please enter a valid email' : ''}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          variant="outlined"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          error={errors.subject}
                          helperText={errors.subject ? 'Please enter a subject' : ''}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          variant="outlined"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          error={errors.message}
                          helperText={errors.message ? 'Please enter your message' : ''}
                          multiline
                          rows={6}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          fullWidth={isMobile}
                          sx={{ 
                            py: 2,
                            fontWeight: 600,
                            fontSize: '1.1rem'
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </ContactFormCard>
              </motion.div>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <ContactInfoCard>
                  <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                    Contact Information
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOn color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
                      <Typography variant="body1">
                        123 T-Shirt Avenue<br />
                        Fashion District<br />
                        New York, NY 10001
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Phone color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
                      <Typography variant="body1">
                        (555) 123-4567
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Email color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
                      <Typography variant="body1">
                        info@tshirtstore.com
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    Business Hours
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Monday - Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    Follow Us
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton 
                      color="primary" 
                      aria-label="Facebook"
                      sx={{ backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}
                    >
                      <Facebook />
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      aria-label="Instagram"
                      sx={{ backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}
                    >
                      <Instagram />
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      aria-label="Twitter"
                      sx={{ backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}
                    >
                      <Twitter />
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      aria-label="LinkedIn"
                      sx={{ backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}
                    >
                      <LinkedIn />
                    </IconButton>
                  </Box>
                </ContactInfoCard>
 
                <Box sx={{ mt: 4, borderRadius: '16px', overflow: 'hidden', boxShadow: theme.shadows[4] }}>
                  <iframe 
                    title="Store Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573027655!2d-73.987844924264!3d40.74844097138996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ContactUsPage;