import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Header from './components/Header';

// Import Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ItemDetailPage from './pages/ItemDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

/**
 * Main App Component
 * 
 * Sets up the router and renders the application.
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-orange-50">
        <Header />
        {/* Add padding-top to account for fixed header (64px = h-16) */}
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/item/:id" element={<ItemDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
