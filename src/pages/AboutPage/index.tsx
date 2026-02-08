import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Star, Users, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

/**
 * AboutPage Component
 * 
 * Displays information about Cinema Cafe.
 */
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-200 dark:bg-secondary-500">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-secondary-200/20 dark:border-secondary-400/20">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-500 transition-colors">
              <ArrowLeft className="w-6 h-6 text-secondary-500 dark:text-cream-200" />
            </Link>
            <span className="text-xl font-heading font-bold text-secondary-500 dark:text-cream-200">
              About Us
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-400 to-primary-500">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Coffee className="w-20 h-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Where cinematic ambiance meets culinary excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading font-bold text-secondary-500 dark:text-cream-200 mb-6">
                A Decade of Excellence
              </h2>
              <p className="text-secondary-400 dark:text-cream-300 mb-4 leading-relaxed">
                Founded in 2014, Cinema Cafe has been serving the finest dishes in Addis Ababa. 
                Our unique concept combines the magic of cinema with exceptional dining experiences.
              </p>
              <p className="text-secondary-400 dark:text-cream-300 leading-relaxed">
                Every dish we serve is crafted with passion, using locally sourced ingredients 
                and time-honored recipes that celebrate both Ethiopian and international cuisines.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-3xl p-8 text-center"
            >
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-heading font-bold text-cream-200 mb-2">
                Cinema Meets Cafe
              </h3>
              <p className="text-cream-300">
                Experience dining like never before
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-secondary-400">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Star, value: '10+', label: 'Years Experience' },
              { icon: Users, value: '50K+', label: 'Happy Customers' },
              { icon: Award, value: '25+', label: 'Menu Items' },
              { icon: Coffee, value: '100K+', label: 'Coffees Served' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-10 h-10 text-primary-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-secondary-500 dark:text-cream-200 mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary-400 dark:text-cream-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-secondary-500 dark:text-cream-200 mb-4">
              Our Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Quality First', desc: 'Only the freshest ingredients make it to your plate', emoji: '✨' },
              { title: 'Customer Love', desc: 'Every guest is treated like family', emoji: '❤️' },
              { title: 'Community', desc: 'Proudly serving our local community', emoji: '🤝' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-secondary-400 rounded-2xl p-8 text-center shadow-card"
              >
                <div className="text-5xl mb-4">{value.emoji}</div>
                <h3 className="text-xl font-heading font-semibold text-secondary-500 dark:text-cream-200 mb-3">
                  {value.title}
                </h3>
                <p className="text-secondary-400 dark:text-cream-300">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-400 to-primary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Come Visit Us Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the perfect blend of cinema and cuisine
          </p>
          <Link to="/menu">
            <Button variant="secondary" size="lg">
              View Our Menu
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-600 py-8">
        <div className="container-custom text-center">
          <p className="text-cream-400 text-sm">
            © 2024 Cinema Cafe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
