import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'
import CategoryShop from './pages/CategoryShop'
import Cart from './pages/Cart'
import MyOrder from './pages/MyOrder'
import { ShopContext } from './context/ShopContext'
import Login from './pages/Login'
import AdminLogin from './admin/AdminLogin'
import Sidebar from './admin/Sidebar'
import AddProduct from './admin/AddProduct'
import ProductList from './admin/ProductList'
import Orders from './admin/Orders'
import Sell from './pages/Sell'
import AddressForm from './pages/AddressForm'




const App = () => {
  const {showUserLogin,isAdmin} = useContext(ShopContext);
  const isAdminPath = useLocation().pathname.includes('admin')
  return (
    <main>
    {showUserLogin && <Login/>}
     {!isAdminPath && <Header/>}
      <Toaster position='bottom-right'/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/shop' element={<Shop/>}/>
         <Route path='/shop/:category' element={<CategoryShop/>}/>
         <Route path='/shop/:category/:id' element={<ProductDetails/>}/>
         <Route path='/blog' element ={<Blog/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/sell' element={<Sell/>}/>
         <Route path='/address-form' element={<AddressForm/>}/>
         <Route path='/my-orders' element={<MyOrder/>}/>
         <Route path='/admin' element={isAdmin ? <Sidebar/>:<AdminLogin/>}>
         <Route index element={isAdmin ? <AddProduct/> : null}/>
         <Route path='list' element={<ProductList/>}/>
         <Route path='orders' element={<Orders/>}/>
         </Route>        
      </Routes>
      {!isAdminPath && <Footer/>}
    </main>
  )
}

export default App