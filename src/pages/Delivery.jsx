// Delivery.js (updated)
import React, { useState } from 'react';
import Header from '../components/Header';
import {
  Box,
  Container,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
  Typography,
  Divider,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";
import { CreditCard, LocalAtm } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Delivery = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    phone: '',
    zipCode: ''
  });

  // Get delivery items from Redux store
  const deliveryItems = useSelector((state) => state.cardData.delivery || []);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return deliveryItems.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const getPaymentIcon = () => {
    switch(paymentMethod) {
      case 'credit_card':
        return <CreditCard sx={{ mr: 1 }} />;
      case 'CreditCard':
        return <CreditCard sx={{ mr: 1 }} />;
      case 'cash_on_delivery':
        return <LocalAtm sx={{ mr: 1 }} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Checkout
        </Typography>
        
        <Grid container spacing={4}>
          {/* Left Column - Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Shipping Information
              </Typography>
              
              <Stack spacing={3}>
                <TextField
                  name="fullName"
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  name="address"
                  label="Address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="phone"
                      label="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="zipCode"
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>

                <FormControl fullWidth required>
                  <InputLabel id="payment-method-label">Payment Method</InputLabel>
                  <Select
                    labelId="payment-method-label"
                    id="payment-method"
                    value={paymentMethod}
                    label="Payment Method"
                    onChange={handlePaymentChange}
                    sx={{ mt: 1 }}
                  >
                    <MenuItem value="credit_card">
                      <CreditCard sx={{ mr: 1 }} /> Credit Card
                    </MenuItem>
                    <MenuItem value="CreditCard">
                      <CreditCard sx={{ mr: 1 }} /> CreditCard
                    </MenuItem>
                    <MenuItem value="cash_on_delivery">
                      <LocalAtm sx={{ mr: 1 }} /> Cash on Delivery
                    </MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Paper>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Order Summary
              </Typography>
              
              <Stack spacing={3}>
                {deliveryItems.map(product => (
                  <Card key={product.id} sx={{ display: 'flex', mb: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 100, height: 100, objectFit: 'contain', p: 1 }}
                      image={product.image}
                      alt={product.title}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {product.description}
                      </Typography>
                      <Typography variant="body1">
                        ${product.price.toFixed(2)} × {product.quantity}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                
                <Divider sx={{ my: 2 }} />
                
                <Stack spacing={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Subtotal</Typography>
                    <Typography>${calculateTotal().toFixed(2)}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Shipping</Typography>
                    <Typography>Free</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Tax</Typography>
                    <Typography>$5.99</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" fontWeight="bold">Total</Typography>
                    <Typography variant="h6" fontWeight="bold">
                      ${(calculateTotal() + 5.99).toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
                
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 2, py: 1.5 }}
                  startIcon={getPaymentIcon()}
                  disabled={!paymentMethod || Object.values(formData).some(val => !val) || deliveryItems.length === 0}
                >
                  Place Order
                </Button>
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                  By placing your order, you agree to our Terms of Service
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Delivery;