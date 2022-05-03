import React from 'react';
import Navbar from '../Components/Layout/Navbar/Navbar';
import Footer from '../Components/Layout/Footer/Footer'
import Checkout from '../Components/Cart/Checkout';

const CheckoutPage = () => {
  return <>
  <Navbar/>
  <Checkout/>
  <Footer/>
  </>;
};

export default CheckoutPage;
