import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuItems } from '../../data/menuData';

const HomePage: React.FC = () => {
  // Get popular items for featured section
  const popularItems = menuItems.filter(item => item.isPopular).slice(0, 4);

  const categories = [
    { icon: '🍲', name: 'Ethiopian', id: 'ethiopian' },
    { icon: '🍳', name: 'Breakfast', id: 'breakfast' },
    { icon: '🍗', name: 'Chicken', id: 'chicken' },
    { icon: '🍔', name: 'Burger', id: 'burger' },
    { icon: '🍕', name: 'Pizza', id: 'pizza' },
    { icon: '🥗', name: 'Salad', id: 'salad' },
  ];

  return (
    <div className="min-h-screen bg-orange-50 pb-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-orange-100 to-orange-50 p-6 text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-7xl mb-4"
        >
          🍽️
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Our Restaurant!</h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Browse our delicious menu and order your favorite food. Fast, easy, and tasty!
        </p>
        <Link 
          to="/menu"
          className="inline-block bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
        >
          View Full Menu 🍔
        </Link>
      </motion.div>

      {/* Categories Section */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Browse Categories</h2>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/menu?category=${cat.id}`}
                className="block bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="text-sm font-medium text-gray-700">{cat.name}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Items Section */}
      <div className="p-4 mt-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Items ⭐</h2>
        <div className="space-y-3">
          {popularItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/item/${item.id}`}
                className="block bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3">
                  <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-orange-600 font-bold">{item.price} ETB</span>
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                        ⭐ Popular
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Contact Section */}
      <div className="p-4 mt-2">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3">Quick Contact</h3>
          <div className="space-y-2 text-sm">
            <a href="tel:+251911234567" className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
              <span>📞</span> +251 911 234 567
            </a>
            <p className="flex items-center gap-2 text-gray-600">
              <span>📍</span> Cinema Building, Addis Ababa
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <span>🕐</span> Open 7AM - 11PM Daily
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
