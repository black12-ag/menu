import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';

// Import Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ItemDetailPage from './pages/ItemDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QRCodePage from './pages/QRCodePage';

/**
 * Main App Content Component
 * Handles location-based styling
 */
const AppContent: React.FC = () => {
  const location = useLocation();
  const isItemDetailPage = location.pathname.startsWith('/item/');
  
  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      {/* Add padding-top to account for fixed header (64px = h-16) */}
      {/* Add padding-bottom for mobile bottom nav on non-detail pages */}
      <main className={`pt-16 ${isItemDetailPage ? '' : 'pb-16 md:pb-0'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/qr-code" element={<QRCodePage />} />
        </Routes>
      </main>
      <MobileBottomNav />
    </div>
  );
};

/**
 * Main App Component
 * Sets up the router and renders the application.
 */
const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
