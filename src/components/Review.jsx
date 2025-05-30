import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  Paper,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const ProductReview = ({ productId, productName }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [form, setForm] = useState({ name: "", comment: "", rating: 0 });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e, newValue) => {
    setForm({ ...form, rating: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.comment && form.rating > 0) {
      const newReview = {
        id: Date.now(),
        productId,
        ...form,
      };
      setAllReviews([newReview, ...allReviews]);
      setForm({ name: "", comment: "", rating: 0 });
    }
  };

  const productReviews = allReviews.filter((r) => r.productId === productId);

  return (
    <Box sx={{ mt: 6, px: 2 }}>
      <Typography variant="h5" gutterBottom>
        Reviews for {productName}
      </Typography>

      {productReviews.length === 0 ? (
        <Typography sx={{ mb: 4 }}>No reviews yet. Be the first to review!</Typography>
      ) : (
        <Box sx={{ mb: 4 }}>
          {productReviews.map((review) => (
            <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
              <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {review.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">{review.name}</Typography>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {review.comment}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Leave Your Review
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Your Name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="comment"
            label="Write your review"
            value={form.comment}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            required
          />
          <Rating
            name="rating"
            value={form.rating}
            onChange={handleRatingChange}
          />
          <Button type="submit" variant="contained">
            Submit Review
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductReview;
