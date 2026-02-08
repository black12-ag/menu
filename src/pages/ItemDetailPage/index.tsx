import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuItems } from '../../data/menuData';
import { BurgerBuilder } from '../../components/BurgerBuilder';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  const item = menuItems.find((i) => i.id === id);

  // Smooth scroll to top when page loads
  useEffect(() => {
    const scrollToTop = () => {
      const headerOffset = 64;
      const elementPosition = 0;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition > 0 ? offsetPosition : 0,
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
          <Link to="/menu" className="text-orange-500 mt-2 inline-block">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const relatedItems = menuItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 3);

  const totalPrice = item.price * quantity;

  return (
    <div className="min-h-screen bg-orange-50 pb-24">
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

      {/* Burger Builder for Burger Items */}
      {item.category === 'burger' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-4"
        >
          <BurgerBuilder />
        </motion.div>
      )}

      {/* Quantity Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 bg-white mt-2"
      >
        <h3 className="font-bold text-gray-800 mb-3">Quantity</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 bg-gray-100 rounded-full text-2xl font-bold hover:bg-gray-200 transition-colors"
          >
            -
          </button>
          <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 bg-orange-100 rounded-full text-2xl font-bold text-orange-600 hover:bg-orange-200 transition-colors"
          >
            +
          </button>
        </div>
      </motion.div>

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 mt-2"
        >
          <h3 className="font-bold text-gray-800 mb-3">You May Also Like</h3>
          <div className="space-y-2">
            {relatedItems.map((related) => (
              <Link
                key={related.id}
                to={`/item/${related.id}`}
                className="block bg-white rounded-xl p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img 
                      src={related.image} 
                      alt={related.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{related.name}</h4>
                    <p className="text-orange-600 font-bold">{related.price} ETB</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="flex items-center justify-between mb-3 max-w-4xl mx-auto">
          <span className="text-gray-600">Total:</span>
          <span className="text-2xl font-bold text-orange-600">{totalPrice} ETB</span>
        </div>
        <a
          href={`tel:+251911234567`}
          className="block w-full max-w-4xl mx-auto bg-orange-500 text-white py-4 rounded-xl font-bold text-lg text-center hover:bg-orange-600 transition-colors"
        >
          📞 Call to Order
        </a>
      </div>
    </div>
  );
};

export default ItemDetailPage;
