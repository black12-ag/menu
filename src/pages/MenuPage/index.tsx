import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuItems } from '../../data/menuData';
import { categories } from '../../data/categories';

const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Update category from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Real-time filtering with debounce effect
  const filteredItems = useMemo(() => {
    setIsSearching(true);
    const filtered = menuItems.filter((item) => {
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.nameAm.includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
    
    // Simulate slight delay for search feedback
    const timer = setTimeout(() => setIsSearching(false), 150);
    return filtered;
  }, [selectedCategory, searchTerm]);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 pb-20">
      {/* Search Section */}
      <div className="bg-white p-4 sticky top-16 z-40 shadow-sm">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            🔍
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Search Results Count */}
        {searchTerm && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-gray-500 mt-2"
          >
            Found {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
          </motion.p>
        )}
      </div>

      {/* Categories */}
      <div className="px-4 py-3 bg-orange-50">
        <div className="flex gap-2 overflow-x-auto pb-2 max-w-4xl mx-auto scrollbar-hide">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategorySelect(null)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              !selectedCategory 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.icon} {cat.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-4 max-w-4xl mx-auto">
        {isSearching ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-gray-500"
          >
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-lg">No items found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid gap-3"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Link
                  to={`/item/${item.id}`}
                  className="block bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
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
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-orange-600 font-bold text-lg">{item.price} ETB</span>
                        {item.isPopular && (
                          <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                            ⭐ Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
