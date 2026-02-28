import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CartModal from './components/shop/CartModal';
import ProductPreviewModal from './components/shop/ProductPreviewModal';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Membership from './pages/Membership';
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';

// Admin Dashboard Components
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import DashboardProducts from './components/dashboard/DashboardProducts';
import DashboardOrders from './components/dashboard/DashboardOrders';
import DashboardCustomers from './components/dashboard/DashboardCustomers';
import DashboardSettings from './components/dashboard/DashboardSettings';

// Guest Dashboard Components
import GuestDashboardLayout from './components/guest-dashboard/GuestDashboardLayout';
import GuestDashboardOverview from './components/guest-dashboard/GuestDashboardOverview';
import GuestDashboardOrders from './components/guest-dashboard/GuestDashboardOrders';
import GuestDashboardSettings from './components/guest-dashboard/GuestDashboardSettings';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <BackToTop />
  </>
);

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <CartModal />
                <ProductPreviewModal />
                <Routes>
                  {/* Standard Layout Routes */}
                  <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                  <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />
                  <Route path="/shop" element={<MainLayout><Shop /></MainLayout>} />
                  <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
                  <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
                  <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                  <Route path="/membership" element={<MainLayout><Membership /></MainLayout>} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<MainLayout><Orders /></MainLayout>} />
                  <Route path="/wishlist" element={<MainLayout><Wishlist /></MainLayout>} />
                  <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
                  <Route path="/order-success" element={<MainLayout><OrderSuccess /></MainLayout>} />
                  <Route path="/product/:slug" element={<MainLayout><ProductDetails /></MainLayout>} />

                  {/* Admin Dashboard Routes */}
                  <Route path="/admin" element={<DashboardLayout />}>
                    <Route index element={<DashboardOverview />} />
                    <Route path="products" element={<DashboardProducts />} />
                    <Route path="orders" element={<DashboardOrders />} />
                    <Route path="users" element={<DashboardCustomers />} />
                    <Route path="settings" element={<DashboardSettings />} />
                  </Route>

                  {/* Guest Dashboard Routes */}
                  <Route path="/guest" element={<GuestDashboardLayout />}>
                    <Route index element={<GuestDashboardOverview />} />
                    <Route path="orders" element={<GuestDashboardOrders />} />
                    <Route path="settings" element={<GuestDashboardSettings />} />
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
