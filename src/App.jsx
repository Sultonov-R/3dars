import {Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import Header from './components/Header';
import ErrorPage from './pages/ErrorPage';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

function App() {
   
   const[countCart, setCountCart] = useState(0);

   useEffect(()=>{

    if (localStorage.getItem('products')) {
      let products = JSON.parse(localStorage.getItem('products'));
      let sum = 0;
      products.forEach(pro => {
        sum += Number(pro.count)
      });
      setCountCart(sum);
    }
   }, [])


  return (
   <CartContext.Provider value={{countCart, setCountCart}}>
   <Header> </Header>
   <Routes>
    <Route path='/' element={<Products></Products>} />
    <Route path='/cart' element={<Cart></Cart>} />
    <Route path='/about/:id' element={<About></About>} />
    <Route path='*' element={<ErrorPage></ErrorPage>} />
   </Routes>
   </CartContext.Provider>
  )
}

export default App
