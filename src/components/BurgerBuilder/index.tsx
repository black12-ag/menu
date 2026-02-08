import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Check } from 'lucide-react';
import { Button } from '../Button';

interface Ingredient {
  id: string;
  name: string;
  nameAm: string;
  price: number;
  color: string;
  height: string;
  icon: string;
}

const INGREDIENTS: Ingredient[] = [
  { id: 'top-bun', name: 'Top Bun', nameAm: 'የላይኛው ዳቦ', price: 0, color: '#D4A574', height: 'h-12', icon: '🍞' },
  { id: 'sesame', name: 'Sesame Seeds', nameAm: 'ሰሳሚ', price: 5, color: '#F5DEB3', height: 'h-2', icon: '•' },
  { id: 'lettuce', name: 'Lettuce', nameAm: 'ሳላጣ', price: 15, color: '#90EE90', height: 'h-4', icon: '🥬' },
  { id: 'tomato', name: 'Tomato', nameAm: 'ቲማቲም', price: 10, color: '#FF6347', height: 'h-3', icon: '🍅' },
  { id: 'cheese', name: 'Cheese', nameAm: 'ነጭ ወተት', price: 25, color: '#FFD700', height: 'h-2', icon: '🧀' },
  { id: 'patty', name: 'Beef Patty', nameAm: 'የበሬ ስጋ', price: 85, color: '#8B4513', height: 'h-6', icon: '🥩' },
  { id: 'onion', name: 'Onion', nameAm: 'ሽንኩርት', price: 8, color: '#E6E6FA', height: 'h-2', icon: '🧅' },
  { id: 'pickles', name: 'Pickles', nameAm: 'ፒክልስ', price: 12, color: '#9ACD32', height: 'h-2', icon: '🥒' },
  { id: 'bottom-bun', name: 'Bottom Bun', nameAm: 'የታችኛው ዳቦ', price: 0, color: '#D4A574', height: 'h-10', icon: '🍞' },
];

interface BurgerLayer {
  ingredient: Ingredient;
  uniqueId: string;
}

export function BurgerBuilder() {
  const [layers, setLayers] = useState<BurgerLayer[]>([
    { ingredient: INGREDIENTS.find(i => i.id === 'bottom-bun')!, uniqueId: 'bottom-1' },
    { ingredient: INGREDIENTS.find(i => i.id === 'patty')!, uniqueId: 'patty-1' },
    { ingredient: INGREDIENTS.find(i => i.id === 'cheese')!, uniqueId: 'cheese-1' },
    { ingredient: INGREDIENTS.find(i => i.id === 'lettuce')!, uniqueId: 'lettuce-1' },
    { ingredient: INGREDIENTS.find(i => i.id === 'top-bun')!, uniqueId: 'top-1' },
  ]);
  const [isDouble, setIsDouble] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const addIngredient = (ingredient: Ingredient) => {
    const topBunIndex = layers.findIndex(l => l.ingredient.id === 'top-bun');
    const newLayer: BurgerLayer = {
      ingredient,
      uniqueId: `${ingredient.id}-${Date.now()}`,
    };
    
    if (topBunIndex >= 0 && ingredient.id !== 'top-bun' && ingredient.id !== 'bottom-bun') {
      const newLayers = [...layers];
      newLayers.splice(topBunIndex, 0, newLayer);
      setLayers(newLayers);
    } else if (ingredient.id === 'top-bun' && !layers.some(l => l.ingredient.id === 'top-bun')) {
      setLayers([...layers, newLayer]);
    } else if (ingredient.id === 'bottom-bun' && !layers.some(l => l.ingredient.id === 'bottom-bun')) {
      setLayers([newLayer, ...layers]);
    }
  };

  const removeLayer = (uniqueId: string) => {
    setLayers(layers.filter(l => l.uniqueId !== uniqueId));
  };

  const toggleDouble = () => {
    if (!isDouble) {
      // Add extra patty
      const topBunIndex = layers.findIndex(l => l.ingredient.id === 'top-bun');
      const extraPatty: BurgerLayer = {
        ingredient: INGREDIENTS.find(i => i.id === 'patty')!,
        uniqueId: `patty-double-${Date.now()}`,
      };
      const extraCheese: BurgerLayer = {
        ingredient: INGREDIENTS.find(i => i.id === 'cheese')!,
        uniqueId: `cheese-double-${Date.now()}`,
      };
      
      const newLayers = [...layers];
      if (topBunIndex >= 0) {
        newLayers.splice(topBunIndex, 0, extraPatty, extraCheese);
      } else {
        newLayers.push(extraPatty, extraCheese);
      }
      setLayers(newLayers);
    } else {
      // Remove extra patty and cheese
      setLayers(layers.filter(l => !l.uniqueId.includes('double')));
    }
    setIsDouble(!isDouble);
  };

  const totalPrice = layers.reduce((sum, layer) => sum + layer.ingredient.price, 0) + (isDouble ? 85 : 0);

  const handleOrder = () => {
    setShowOrderConfirmation(true);
    setTimeout(() => setShowOrderConfirmation(false), 3000);
  };

  const getLayerStyle = (ingredient: Ingredient) => {
    const baseStyles = "w-48 md:w-64 rounded-lg shadow-md flex items-center justify-center text-2xl relative overflow-hidden";
    
    switch (ingredient.id) {
      case 'top-bun':
        return `${baseStyles} ${ingredient.height} bg-gradient-to-b from-[#E8C9A0] to-[#D4A574] rounded-t-3xl`;
      case 'bottom-bun':
        return `${baseStyles} ${ingredient.height} bg-gradient-to-b from-[#D4A574] to-[#B8956A] rounded-b-3xl`;
      case 'patty':
        return `${baseStyles} ${ingredient.height} bg-gradient-to-b from-[#A0522D] to-[#8B4513] border-2 border-[#654321]`;
      case 'cheese':
        return `${baseStyles} ${ingredient.height} bg-gradient-to-b from-[#FFE55C] to-[#FFD700] skew-x-12`;
      case 'lettuce':
        return `${baseStyles} ${ingredient.height} bg-gradient-to-b from-[#98FB98] to-[#90EE90] rounded-full w-52 md:w-72`;
      case 'tomato':
        return `${baseStyles} ${ingredient.height} bg-gradient-to-b from-[#FF6B6B] to-[#FF6347] rounded-md`;
      case 'onion':
        return `${baseStyles} ${ingredient.height} bg-gradient-to-b from-[#F0E6FF] to-[#E6E6FA] rounded-full w-44 md:w-60 opacity-80`;
      case 'pickles':
        return `${baseStyles} ${ingredient.height} bg-gradient-to-b from-[#ADFF2F] to-[#9ACD32] rounded-md w-40 md:w-56`;
      default:
        return `${baseStyles} ${ingredient.height}`;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
      {/* Burger Preview */}
      <div className="flex flex-col items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Build Your Burger</h3>
        <h4 className="text-sm text-gray-600 mb-4">በርገርዎን ይስሩ</h4>
        
        {/* Burger Stack */}
        <div className="relative flex flex-col items-center gap-1 min-h-[300px] justify-center py-4">
          <AnimatePresence mode="popLayout">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.uniqueId}
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.05
                }}
                className={getLayerStyle(layer.ingredient)}
              >
                {layer.ingredient.id === 'sesame' ? (
                  <div className="flex gap-4 text-[#8B4513]">
                    <span>•</span><span>•</span><span>•</span>
                  </div>
                ) : (
                  <span className="text-3xl">{layer.ingredient.icon}</span>
                )}
                
                {/* Remove button */}
                {layer.ingredient.id !== 'top-bun' && layer.ingredient.id !== 'bottom-bun' && (
                  <button
                    onClick={() => removeLayer(layer.uniqueId)}
                    className="absolute -right-8 top-1/2 -translate-y-1/2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                
                {/* Double indicator */}
                {layer.uniqueId.includes('double') && (
                  <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">
                    2x
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {layers.length === 0 && (
            <p className="text-gray-400 text-center">Add ingredients to build your burger</p>
          )}
        </div>

        {/* Price Display */}
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{totalPrice} ETB</p>
          <p className="text-sm text-gray-500">Total Price / ጠቅላላ ዋጋ</p>
        </div>
      </div>

      {/* Double Burger Toggle */}
      <div className="mb-6 p-4 bg-orange-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800">Double Burger</p>
            <p className="text-sm text-gray-600">ድርብ በርገር (+85 ETB)</p>
          </div>
          <button
            onClick={toggleDouble}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              isDouble ? 'bg-orange-500' : 'bg-gray-300'
            }`}
          >
            <motion.div
              className="absolute top-1 w-6 h-6 bg-white rounded-full shadow"
              animate={{ x: isDouble ? 26 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
        {isDouble && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-sm text-orange-600 mt-2"
          >
            ✓ Extra patty and cheese added!
          </motion.p>
        )}
      </div>

      {/* Ingredient Controls */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Add Ingredients / ንጥረ ነገሮችን ይጨምሩ</h4>
        <div className="grid grid-cols-2 gap-2">
          {INGREDIENTS.filter(i => i.id !== 'top-bun' && i.id !== 'bottom-bun').map((ingredient) => {
            const isAdded = layers.some(l => l.ingredient.id === ingredient.id && !l.uniqueId.includes('double'));
            const count = layers.filter(l => l.ingredient.id === ingredient.id && !l.uniqueId.includes('double')).length;
            
            return (
              <motion.button
                key={ingredient.id}
                onClick={() => addIngredient(ingredient)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  isAdded 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <span className="text-2xl">{ingredient.icon}</span>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800">{ingredient.name}</p>
                  <p className="text-xs text-gray-500">{ingredient.nameAm}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-orange-600">+{ingredient.price}</p>
                  {count > 0 && (
                    <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Current Ingredients List */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
        <h4 className="font-semibold text-gray-800 mb-2">Your Burger Has / በርገርዎ አለው:</h4>
        <div className="flex flex-wrap gap-2">
          {layers.map((layer) => (
            <span
              key={layer.uniqueId}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm border border-gray-200"
            >
              {layer.ingredient.icon} {layer.ingredient.name}
              {layer.uniqueId.includes('double') && <span className="text-orange-500 font-bold">(2x)</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Order Button */}
      <Button
        onClick={handleOrder}
        className="w-full py-4 text-lg font-bold"
      >
        Order Now - {totalPrice} ETB
      </Button>

      {/* Order Confirmation */}
      <AnimatePresence>
        {showOrderConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check size={40} className="text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Order Placed!</h3>
              <p className="text-gray-600">Your custom burger has been added to the cart.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
