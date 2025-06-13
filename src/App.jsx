import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Box, CircularProgress, Modal, Typography, Button } from "@mui/material";
import { AnimatePresence } from 'framer-motion';
import AnimatedPageWrapper from './components/AnimatedPageWrapper';
import ScrollToTop from './components/ScrollToTop';
import Cookies from 'js-cookie';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Productdetail = lazy(() => import('./pages/Productdetail'));
const CartPage = lazy(() => import('./pages/CartPage'));
const Delivery = lazy(() => import('./pages/Delivery'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const SearchProducts = lazy(() => import('./components/SearchProducts'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));

const App = () => {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      setToken(savedToken);
    } else {
      setOpenModal(true); // Show modal if token not found
    }
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <ScrollToTop />

      {/* 🔐 Welcome Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h5" fontWeight="bold">
            Welcome to Our Shop!
          </Typography>
          <Typography sx={{ mt: 1, mb: 3 }} color="text.secondary">
            Please login to access personalized features or continue as guest.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </Box>

          <Button
            onClick={handleCloseModal}
            sx={{ mt: 3 }}
            variant="text"
            color="inherit"
          >
            Continue as Guest
          </Button>
        </Box>
      </Modal>

      {/* 🔄 Suspense and Route Setup */}
      <Suspense fallback={
        <Box sx={{ display: 'flex', width: '100%', height: '500px', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      }>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<AnimatedPageWrapper><Home /></AnimatedPageWrapper>} />
            <Route path='/productdetail/:id' element={<AnimatedPageWrapper><Productdetail /></AnimatedPageWrapper>} />
            <Route path='/cart' element={<AnimatedPageWrapper><CartPage /></AnimatedPageWrapper>} />
            <Route path='/delivery' element={<AnimatedPageWrapper><Delivery /></AnimatedPageWrapper>} />
            <Route path='/login' element={<AnimatedPageWrapper><Login /></AnimatedPageWrapper>} />
            <Route path='/signup' element={<AnimatedPageWrapper><Signup /></AnimatedPageWrapper>} />
            <Route path='/search' element={<AnimatedPageWrapper><SearchProducts /></AnimatedPageWrapper>} />
            <Route path='/about' element={<AnimatedPageWrapper><AboutUs /></AnimatedPageWrapper>} />
            <Route path='/contact' element={<AnimatedPageWrapper><ContactUsPage /></AnimatedPageWrapper>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default App;
