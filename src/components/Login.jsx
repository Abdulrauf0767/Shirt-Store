import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  IconButton,
    SvgIcon
} from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
      const handlenavigate = () => {
      navigate(-1)
    }
  return (
    <Container maxWidth="sm" sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h4" align="center" fontWeight="bold">
            Welcome Back
          </Typography>

          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            required
          />

          <Box textAlign="right">
            <Typography
              variant="body2"
              color="black"
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Forgot Password?
            </Typography>
          </Box>

          <Button variant="contained" fullWidth size="large" sx={{
            borderRadius : 10,
            backgroundColor : '#008080'
          }}>
            Log in
          </Button>

          <Typography variant="body2" align="center">
            Don&apos;t have an account?{' '}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
            <Link to={'/signup'} >
              Sign up
            </Link>
            </Typography>
          </Typography>

          <Stack spacing={1}>
            <Button
              startIcon={<AppleIcon />}
              fullWidth
              variant="contained"
              
              sx={{
                backgroundColor : 'black' ,
                borderRadius : 10
              }}
            >
              Log in with Apple
            </Button>
            <Button
              startIcon={<Box
              component={'img'}
              src='https://img.icons8.com/?size=96&id=17949&format=png'
              alt='google'
              sx={{
                width: 20, height: 20 
              }}
              >
                
              </Box>}
              fullWidth
              variant="outlined"
              color='black'
              sx={{
                borderRadius : 10
              }}
            >
              Log in with Google
            </Button>
          </Stack>
        </Stack>
      </Paper>
        <IconButton
                        onClick={handlenavigate}
                         sx={{
                          borderRadius: "50%" ,
                          position : 'absolute' ,
                          top : '13%',
                          left : '5%' ,
                          backgroundColor : 'none'
                        }} >
                          <KeyboardArrowLeftIcon  />
                        </IconButton>
    </Container>
  );
};

export default Login;
