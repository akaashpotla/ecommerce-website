import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductGrid from './pages/ProductGrid';
import ProductView from './pages/ProductView';
import Cart from './pages/Cart';
import Landing from './pages/Landing';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<ProductGrid />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Landing />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
