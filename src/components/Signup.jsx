import React from 'react'
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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate() ;
      const handlenavigate = () => {
      navigate(-1)
    }
  return (
    <div>
       <Container maxWidth="sm" sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
              <Stack spacing={3}>
                <Typography variant="h4" align="center" fontWeight="bold">
                  Register
                </Typography>
      
                <TextField
                  type="text"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  type="text"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                />
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
      
                <Button variant="contained" fullWidth size="large" sx={{
                  borderRadius : 10,
                  backgroundColor : '#008080'
                }}>
                  Sign up
                </Button>
      
                <Typography variant="body2" align="center">
                  Already have an account?{' '}
                  <Typography
                    component="span"
                    color="primary"
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Login
                  </Typography>
                </Typography>
                
              </Stack>
            </Paper>
              <IconButton
                        onClick={handlenavigate}
                         sx={{
                          borderRadius: "50%" ,
                          position : 'absolute' ,
                          top : '13%',
                          left : '5%' ,
                          backgroundColor : 'grey'
                        }} >
                          <KeyboardArrowLeftIcon  />
                        </IconButton>
          </Container>
    </div>
  )
}

export default Signup
