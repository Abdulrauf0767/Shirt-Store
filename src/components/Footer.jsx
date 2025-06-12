import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f9f9f9', py: 6, px: 2 }}>
      <Container
        maxWidth={false}
        sx={{
          width: { xs: '100%', md: '90%' },
          margin: '0 auto',
        }}
      >
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Fashion Week
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Premium T-shirts for your style. Feel the comfort, wear the trend.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" underline="hover" color="text.primary">
                Home
              </Link>
              <Link href="#" underline="hover" color="text.primary">
                About
              </Link>
              <Link href="#" underline="hover" color="text.primary">
                Contact Us
              </Link>
              <Link href="#" underline="hover" color="text.primary">
                Products
              </Link>
            </Box>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton href="#" target="_blank" sx={{ color: '#555' }}>
                <Facebook />
              </IconButton>
              <IconButton href="#" target="_blank" sx={{ color: '#555' }}>
                <Instagram />
              </IconButton>
              <IconButton href="#" target="_blank" sx={{ color: '#555' }}>
                <Twitter />
              </IconButton>
              <IconButton href="#" target="_blank" sx={{ color: '#555' }}>
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={6} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Fashion week. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
