import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone',
      value: '+251 911 234 567',
      href: 'tel:+251911234567',
      color: 'bg-orange-100',
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Cinema Building, Addis Ababa',
      href: null,
      color: 'bg-orange-100',
    },
    {
      icon: '🕐',
      title: 'Opening Hours',
      value: 'Daily: 7:00 AM - 11:00 PM',
      href: null,
      color: 'bg-orange-100',
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50 pb-20">
      {/* Contact Info Cards */}
      <div className="p-4 max-w-2xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800 mb-6 text-center"
        >
          Contact Us
        </motion.h1>

        <div className="space-y-4">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.href ? (
                <a 
                  href={item.href}
                  className="block bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-2xl`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="block bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-2xl`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* WhatsApp Order */}
          <motion.a 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            href="https://wa.me/251911234567" 
            className="block bg-green-500 text-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                💬
              </div>
              <div>
                <h3 className="font-bold">WhatsApp Order</h3>
                <p className="text-green-100">Message us on WhatsApp</p>
              </div>
            </div>
          </motion.a>
        </div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h3 className="font-bold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/menu" className="bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🍽️</div>
              <div className="font-bold text-gray-800">View Menu</div>
            </Link>
            <a href="tel:+251911234567" className="bg-orange-500 text-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📲</div>
              <div className="font-bold">Call Now</div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
