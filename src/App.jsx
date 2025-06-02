import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { AnimatePresence } from 'framer-motion';
import AnimatedPageWrapper from './components/AnimatedPageWrapper';
import ScrollToTop from './components/ScrollToTop';

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

  return (
    <div>
      <ScrollToTop />
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
