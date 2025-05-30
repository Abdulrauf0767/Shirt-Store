// CartPage.js (updated)
import {
  Box,
  Typography,
  IconButton,
  Button,
  CardMedia,
  Divider,
  Grid,
  Paper
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  moveCartToDelivery
} from '../features/DataSlice';

const CartPage = () => {
  const cart = useSelector((state) => state.cardData.addtoCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDelivery = () => {
    dispatch(moveCartToDelivery());
    navigate("/delivery");
  };

  if (cart.length === 0) {
    return (
      <Box p={5} textAlign="center" minHeight="60vh">
        <Typography variant="h4" fontWeight="bold" mb={2}>Your Cart is Empty</Typography>
        <Typography variant="body1" color="textSecondary">
          Start shopping to add items to your cart
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, sm: 4 }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        mb={4}
        color="primary"
      >
        Your Shopping Cart
      </Typography>

      {/* Cart Items Section */}
      <Paper elevation={2} sx={{ borderRadius: 3, width: '100%', mb: 4 }}>
        {cart.map((item, index) => (
          <Box key={item.id} width="100%">
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'center', sm: 'flex-start' }}
              gap={2}
              p={2}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: 'contain',
                  borderRadius: 2
                }}
              />
              <Box flexGrow={1} width="100%">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  gap={1}
                >
                  <Typography variant="h6" align="center">{item.title}</Typography>
                  <IconButton color="error" onClick={() => dispatch(removeFromCart(item.id))}>
                    <Delete />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" mt={1}>
                  ${item.price.toFixed(2)}
                </Typography>

                <Box display="flex" alignItems="center" mt={2} flexWrap="wrap" gap={2}>
                  <IconButton
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    disabled={item.quantity <= 1}
                    sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
                  >
                    <Remove />
                  </IconButton>
                  <Typography fontWeight="bold">{item.quantity}</Typography>
                  <IconButton
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
                  >
                    <Add />
                  </IconButton>
                  <Box ml="auto" fontWeight="bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Box>
                </Box>
              </Box>
            </Box>
            {index !== cart.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>

      {/* Clear Cart Button */}
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button variant="outlined" color="error" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </Box>

      {/* Order Summary Section */}
      <Paper elevation={2} sx={{ 
        borderRadius: 3, p: 3, 
        width: { xs: '100%', sm: '40%', md: '30%' },
        float: { xs: 'none', sm: 'right' },
        ml: { xs: 0, sm: 2 }
      }}>
        <Typography variant="h6" mb={2}>Order Summary</Typography>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Subtotal</Typography>
          <Typography>${totalPrice.toFixed(2)}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Shipping</Typography>
          <Typography color="success.main">Free</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" fontWeight="bold" mb={3}>
          <Typography>Total</Typography>
          <Typography>${totalPrice.toFixed(2)}</Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleDelivery}
          sx={{ borderRadius: 2 }}
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default CartPage;