// DataSlice.js (updated)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
    'fetchdata/productData',
    async () => {
        const response = await fetch('/Products.json');
        const data = await response.json();
        return data;
    }
);

const initialState = {
    list: [],
    status: 'idle',
    selectedProduct: null,
    addtoCart: [],
    delivery: [],
    originalList: [],
    searchQuery: '',
    error: '',
};

const ProductSlice = createSlice({
    name: 'ProductSlice',
    initialState,
    reducers: {
        findProductByid: (state, action) => {
            const productId = action.payload;
            state.selectedProduct = state.list.find((p) => p.id === productId);
            state.status = state.selectedProduct ? 'succeeded' : 'rejected';
        },
        addTocart: (state, action) => {
            const existing = state.addtoCart.find((item) => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.addtoCart.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.addtoCart.find(product => product.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.addtoCart.find(product => product.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            state.addtoCart = state.addtoCart.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.addtoCart = [];
        },
        moveCartToDelivery: (state) => {
            state.delivery = [...state.addtoCart];
            state.addtoCart = [];
        },
        directToDelivery: (state, action) => {
            state.delivery = [{ ...action.payload, quantity: 1 }];
        },
        clearDelivery: (state) => {
            state.delivery = [];
        },
        handleSearch: (state, action) => {
            const query = action.payload.toLowerCase();
            state.searchQuery = query;
            if (query.trim() === '') {
                state.list = state.originalList;
            } else {
                 setTimeout(() => {
                  state.list =   state.originalList.filter((item) =>
                    item.name.toLowerCase().includes(query)
                ); 
                }, 3000);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload.products;
                state.originalList = action.payload.products;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            });
    }
});

export const {
    findProductByid,
    addTocart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    moveCartToDelivery,
    directToDelivery,
    clearDelivery,
    handleSearch
} = ProductSlice.actions;

export default ProductSlice.reducer;