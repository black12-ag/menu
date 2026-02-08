import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { menuItems } from '../../data/menuData';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const item = menuItems.find((i) => i.id === id);

  // Smooth scroll to top when page loads
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const timer = setTimeout(scrollToTop, 100);
    return () => clearTimeout(timer);
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-4xl mb-2">😕</div>
          <p className="text-gray-600">Item not found</p>
          <button 
            onClick={() => navigate(-1)}
            className="text-orange-500 mt-2 inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Back Button Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* Item Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 text-center"
      >
        <div className="w-48 h-48 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
          {!imageError ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-6xl">🍽️</span>
          )}
        </div>
        {item.isPopular && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full mt-4"
          >
            ⭐ Popular Item
          </motion.span>
        )}
      </motion.div>

      {/* Item Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 bg-white mt-2"
      >
        <h1 className="text-2xl font-bold text-gray-800">{item.name}</h1>
        <p className="text-3xl font-bold text-orange-600 mt-2">{item.price} ETB</p>
        <p className="text-gray-600 mt-3 leading-relaxed">{item.description}</p>

        {/* Ingredients */}
        {item.ingredients && (
          <div className="mt-4">
            <h3 className="font-bold text-gray-800 mb-2">Ingredients:</h3>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ing) => (
                <span key={ing} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Call to Order */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 mt-4"
      >
        <a
          href={`tel:+251911234567`}
          className="block w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg text-center hover:bg-orange-600 transition-colors"
        >
          📞 Call to Order
        </a>
      </motion.div>
    </div>
  );
};

export default ItemDetailPage;
