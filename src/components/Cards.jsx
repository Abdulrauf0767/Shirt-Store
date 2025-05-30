import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../features/DataSlice';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  Container,
  Skeleton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Cards = () => {
  const products = useSelector((state) => state.cardData.list);
  const status = useSelector((state) => state.cardData.status);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === 'succeeded') {
      const alreadyVisited = sessionStorage.getItem('hasVisitedCards');
      if (alreadyVisited) {
        setShowData(true);
      } else {
        const timer = setTimeout(() => {
          setShowData(true);
          sessionStorage.setItem('hasVisitedCards', 'true');
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [status]);

  const skeletonArray = Array.from({ length: 8 });

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} justifyContent="center">
        {status === 'succeeded' && showData
          ? products.map((product) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                <Link to={`/productdetail/${product.id}`} style={{ textDecoration: 'none' }}>
                  <Box display="flex" justifyContent="center">
                    <Card
                      sx={{
                        p: isMobile ? 1 : 2,
                        py: isMobile ? 2 : 3,
                        bgcolor: 'background.paper',
                        textAlign: 'center',
                        transition: 'transform 0.3s, background-color 0.3s',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          bgcolor: 'primary.lighter',
                          cursor: 'pointer',
                          boxShadow: 6
                        },
                        borderRadius: 2,
                        boxShadow: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: isMobile ? 120 : 200,
                        maxWidth: isMobile ? 150 : 300,
                        width: '100%'
                      }}
                    >
                      <Box sx={{ position: 'relative', flex: '0 0 auto' }}>
                        <Box
                          sx={{
                            width: '100%',
                            height: isMobile ? 140 : 180,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f8f8f8',
                            p: 1
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.name}
                            sx={{
                              maxHeight: '100%',
                              maxWidth: '100%',
                              objectFit: 'auto'
                            }}
                          />
                        </Box>

                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'rgba(255,255,255,0.8)',
                            '&:hover': {
                              bgcolor: 'white'
                            }
                          }}
                        >
                          <FavoriteBorderIcon color="error" />
                        </IconButton>
                      </Box>

                      <CardContent
                        sx={{
                          flex: '1 1 auto',
                          pt: 1,
                          pb: 0,
                          px: isMobile ? 1 : 2
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                          {[1, 2, 3, 4].map((star) => (
                            <StarIcon
                              key={star}
                              sx={{
                                width: 16,
                                height: 16,
                                mx: 0.5,
                                color: 'warning.main'
                              }}
                            />
                          ))}
                          <StarBorderIcon
                            sx={{
                              width: 16,
                              height: 16,
                              mx: 0.5,
                              color: 'grey.400'
                            }}
                          />
                        </Box>

                        <Typography
                          variant={isMobile ? 'subtitle1' : 'h6'}
                          component="h3"
                          sx={{
                            mb: 1,
                            fontWeight: 'medium',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {product.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontSize: isMobile ? '0.75rem' : '0.875rem'
                          }}
                        >
                          {product.description}
                        </Typography>

                        <Typography
                          variant={isMobile ? 'subtitle1' : 'h6'}
                          component="h2"
                          sx={{
                            fontWeight: 'bold',
                            color: 'red'
                          }}
                        >
                          ${product.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Link>
              </Grid>
            ))
          : skeletonArray.map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box display="flex" justifyContent="center">
                  <Card
                    sx={{
                      p: isMobile ? 1 : 2,
                      py: isMobile ? 2 : 3,
                      borderRadius: 2,
                      boxShadow: 3,
                      minWidth: isMobile ? 160 : 200,
                      maxWidth: isMobile ? 180 : 300,
                      width: '100%'
                    }}
                  >
                    <Skeleton variant="rectangular" height={isMobile ? 140 : 180} />
                    <CardContent>
                      <Skeleton width="60%" height={20} />
                      <Skeleton width="80%" height={15} />
                      <Skeleton width="40%" height={25} />
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default Cards;
