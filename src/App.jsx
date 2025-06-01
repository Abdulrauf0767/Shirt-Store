import React from 'react'
import { Routes,Route } from "react-router-dom";
import Home from './pages/Home';
import Productdetail from './pages/Productdetail'
import CartPage from './pages/CartPage';
import Delivery from './pages/Delivery';
import  Login  from '../src/components/Login';
import Signup from './components/Signup';
import SearchProducts from './components/SearchProducts';
import AboutUs from './components/AboutUs';
import ContactUsPage from './pages/ContactUsPage';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/productdetail/:id' element = {<Productdetail/>} />
        <Route path='/cart' element = {<CartPage/>} />
        <Route path='/delivery' element = {<Delivery/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Signup/>} />
        <Route path='/search' element = {<SearchProducts/>} />
        <Route path='/about' element = {<AboutUs/>} />
        <Route path='/contact' element = {<ContactUsPage  />} />
      </Routes>
    </div>
  )
}

export default App
