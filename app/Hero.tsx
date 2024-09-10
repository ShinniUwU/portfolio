'use client'
import { motion, AnimatePresence, MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa6";

interface HeroProps {
  scrollToAboutMe: () => void;
  opacity: MotionValue<number>;
}

const Hero: React.FC<HeroProps> = ({ scrollToAboutMe, opacity }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.section 
      id="hero" 
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{ opacity }}
    >
      <div className="text-center">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://github.com/ShinniUwU.png"
                alt="Hana Becheva"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Hana Becheva
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6">
                Full Stack Developer & UI/UX Enthusiast
              </h2>
              <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8">
                Welcome to my portfolio! I craft elegant, efficient web solutions 
                and bring creative ideas to life through code.
              </p>
              <div className="flex justify-center space-x-4 mb-8">
                <a href="https://github.com/ShinniUwU" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300 transition-colors">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300 transition-colors">
                  <FaLinkedin />
                </a>
              </div>
              <motion.button 
                onClick={scrollToAboutMe}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default Hero;
