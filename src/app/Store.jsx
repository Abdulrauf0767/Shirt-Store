import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from '../features/DataSlice';

export const store = configureStore({
    reducer:{
        cardData : ProductReducer ,
    }
})