// ProductDetail.js (updated)
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchData, findProductByid, addTocart, directToDelivery } from '../features/DataSlice';
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Review from '../components/Review';

const Productdetail = () => {
    const { id } = useParams();
    const selectedProduct = useSelector((state) => state.cardData.selectedProduct);
    const Products = useSelector((state) => state.cardData.list);
    const status = useSelector((state) => state.cardData.status);
    const dispatch = useDispatch();
    const [isreview, setisreview] = useState(false);
    const product = Products.find(p => p.id.toString() === id);
    const navigate = useNavigate();
    const handlenavigate = () => {
      navigate(-1)
    }
    useEffect(() => {
        if (product) {
            dispatch(findProductByid(Number(id)));
        } else if (status === 'idle') {
            dispatch(fetchData()).then(() => {
                dispatch(findProductByid(Number(id)));
            });
        }

    }, [dispatch, status, id, Products]);

    const handlereview = () => {
        setisreview(!isreview);
    };

    const handleBuyNow = () => {
        if (selectedProduct) {
            dispatch(directToDelivery(selectedProduct));
            navigate("/delivery");
        }
    };

    const handleAddtocart = () => {
        if (selectedProduct) {
            dispatch(addTocart(selectedProduct));
            navigate('/cart');
        }
    };

    return (
        <>
            <Header />
            {status === 'pending' && (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}
            {status === 'rejected' && (
                <div className='text-center'>Error during fetching product...</div>
            )}

            {status === 'succeeded' && selectedProduct && (
                <div className="max-w-7xl mx-auto px-4 py-8 mt-[100px] min-h-[calc(100vh-64px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Product Image */}
                        <div className="flex justify-center items-center h-full">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full max-w-[600px] h-auto rounded-lg shadow-md object-contain"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedProduct.name}</h1>

                            <div className="mb-3 flex gap-2">
                                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Bestseller</span>
                                <span className="text-xs border border-green-500 text-green-600 px-2 py-1 rounded-full">In Stock</span>
                            </div>

                            <div className="text-2xl font-semibold text-blue-600 mb-3">
                                ${selectedProduct.price.toFixed(2)}
                            </div>

                            <div className="flex items-center mb-3">
                                <div className="text-yellow-400 mr-2">
                                    {'★'.repeat(4)}<span className="text-yellow-400">½</span>
                                </div>
                                <p className="text-sm text-gray-500">117 reviews</p>
                            </div>

                            <p className="text-gray-600 mb-3">
                                {selectedProduct.description}
                            </p>

                            <hr className="my-6" />

                            <div className="mb-4">
                                <h3 className="text-sm font-semibold mb-2">Colors</h3>
                                <div className="flex gap-2">
                                    {['Black', 'Heather Grey', 'White'].map((color) => (
                                        <span
                                            key={color}
                                            className="text-sm border-2 rounded-full px-3 py-1 hover:border-blue-500 transition"
                                        >
                                            {color}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-sm font-semibold mb-2">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <button
                                            key={size}
                                            className="border-2 px-4 py-1 rounded hover:border-blue-500 transition"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={handleAddtocart}
                                    sx={{
                                        border: '1px solid #3b82f6'
                                    }}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    onClick={handleBuyNow}
                                    sx={{
                                        border: '1px solid #3b82f6'
                                    }}
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
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
                    </div>
                    <Button
                        onClick={handlereview}
                        variant='contained'
                        sx={{ mt: 4 }}
                    >
                        Customer Reviews
                    </Button>
                    {isreview && (
                        <Review />
                    )}
                </div>
            )}
        </>
    );
};

export default Productdetail;