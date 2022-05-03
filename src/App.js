import React from 'react'
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage'
import ItemOverviewPage from './Pages/ItemOverviewPage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


const App = (props) => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/login" element={<AuthPage page="Login"/>} />
      <Route path='/signup' element={<AuthPage page="SignUp"/>} />
      <Route path='/item-overview' element={<ItemOverviewPage />} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/checkout' element = {<CheckoutPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
