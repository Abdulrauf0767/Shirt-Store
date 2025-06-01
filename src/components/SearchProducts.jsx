import React from 'react';
import Header from "../components/Header";
import { Box, Container, Paper, Stack, Typography, Button, Rating, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { addTocart } from '../features/DataSlice';

const StyledPaper = styled(Paper)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
  },
}));

const SearchProducts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch() ;
  const handleAddCard = (product) => {
               dispatch(addTocart(product));
               
  }
  const { list, searchQuery } = useSelector((state) => state.cardData);

  return (
    <div>
      <Header />
      <Container
        maxWidth='xl'
        sx={{
          mt: 14,
          p: { xs: 1, sm: 3 },
        }}
      >
        <Typography
          variant='h5'
          component='h1'
          sx={{ 
            fontWeight: 600,
            mb: 3,
            pl: { xs: 1, sm: 0 }
          }}
        >
          {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
          {list.length > 0 && (
            <Typography 
              component='span' 
              variant='body1'
              color='text.secondary'
              sx={{ ml: 1 }}
            >
              ({list.length} {list.length === 1 ? 'item' : 'items'})
            </Typography>
          )}
        </Typography>

        {list.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            mt: 4,
            p: 4,
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2
          }}>
            <Typography variant='h6' color='text.secondary' gutterBottom>
              No products found matching your search.
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant='contained'
              color='primary'
              size='large'
              sx={{ mt: 2 }}
            >
              Browse All Products
            </Button>
          </Box>
        ) : (
          <Stack spacing={2} sx={{ width: '100%' }}>
            {list.map((product) => (
              <StyledPaper
                key={product.id}
                elevation={2}
                sx={{
                  p: { xs: 1, sm: 2 },
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 3 },
                  width: '100%',
                  borderRadius: 2,
                }}
              >
                {/* Product Image */}
                <Box
                  sx={{
                    width: { xs: '100%', sm: '200px' },
                    height: { xs: '180px', sm: '200px' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component='img'
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: 'auto',
                      height: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>

                {/* Product Details */}
                <Box sx={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  pt: { xs: 0, sm: 1 }
                }}>
                  <Typography 
                    variant='h6' 
                    component='h2'
                    sx={{ 
                      fontWeight: 500,
                      mb: 0.5,
                      lineHeight: 1.3
                    }}
                  >
                    {product.name}
                  </Typography>
                  
                  <Rating 
                    value={product.rating || 4} 
                    precision={0.5} 
                    readOnly 
                    size="small"
                    sx={{ my: 0.5 }}
                  />
                  
                  <Typography 
                    variant='body2' 
                    color='text.secondary'
                    sx={{ 
                      mb: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {product.description}
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Typography 
                      variant='h6' 
                      color='primary'
                      sx={{ 
                        fontWeight: 700,
                        mb: 1
                      }}
                    >
                      ${product.price.toFixed(2)}
                      {product.originalPrice && (
                        <Typography 
                          component='span' 
                          variant='body2'
                          color='text.disabled'
                          sx={{ 
                            textDecoration: 'line-through',
                            ml: 1
                          }}
                        >
                          ${product.originalPrice.toFixed(2)}
                        </Typography>
                      )}
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex',
                      gap: 1,
                      flexWrap: 'wrap'
                    }}>
                      <Button
                        component={Link}
                        to={`/productdetail/${product.id}`}
                        variant='contained'
                        color='primary'
                        size='small'
                        sx={{ 
                          minWidth: '120px',
                          textTransform: 'none'
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        onClick={() =>  handleAddCard(product)}
                        sx={{ 
                          minWidth: '120px',
                          textTransform: 'none'
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </StyledPaper>
            ))}
          </Stack>
        )}
      </Container>
    </div>
  );
};

export default SearchProducts;