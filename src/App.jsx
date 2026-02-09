import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartModal from './components/shop/CartModal';
import ProductPreviewModal from './components/shop/ProductPreviewModal';
import BackToTop from './components/BackToTop';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Membership from './pages/Membership';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <CartProvider>
        <main className="w-full min-h-screen relative">
          <Navbar />
          <CartModal />
          <ProductPreviewModal />
          <BackToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </main>
      </CartProvider>
    </Router>
  );
}

export default App;
