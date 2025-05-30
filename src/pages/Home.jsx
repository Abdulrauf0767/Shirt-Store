import React from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import Cards from '../components/Cards'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Header/>
      <Slider/>
      <div className='mt-52'>
      <Cards/>
      </div>
      <div className='mt-52'>
      <Footer/>
      </div>
    </div>
  )
}

export default Home
