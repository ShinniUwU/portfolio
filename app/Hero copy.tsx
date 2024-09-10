'use client'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowDown } from "react-icons/fa6";

const colors = ['#5BCEFA', '#F5A9B8', '#FFFFFF', '#F5A9B8', '#5BCEFA'];
const widths = [100, 200, 150, 200, 100];

interface HeroProps {
  scrollToAboutMe: () => void; // Define the prop
}

const Hero: React.FC<HeroProps> = ({ scrollToAboutMe }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsVisible(true); // Show GitHub PFP on page load
  }, []);

  return (
    <motion.section 
    id="hero" 
    className="relative flex items-center justify-center min-h-screen overflow-hidden"
    style={{ opacity }}
  >
      <div className="flex flex-col items-center relative md:flex-row gap-3">
        <AnimatePresence>
          {isVisible && (
            <motion.img
              src="https://github.com/ShinniUwU.png"
              alt="GitHub profile picture"
              width={80}
              height={80}
              initial={{ opacity: 0, y: 50,}}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 2 }} 
              className="rounded-full md:absolute md:bottom-14 md:left-[360px] "
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 1.5 }} 
              className="md:absolute md:left-[360px] md:bottom-auto text-inherit font-bold text-xl"
            >
              <h3 className="md:text-center md:pb-14 md:-ml-6 ">
                Hana Becheva
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
        {colors.map((color, index) => (
          <motion.div
            key={index}
            initial={{ width: 0 }}
            animate={{ width: widths[index] }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className="h-5 rounded-md m-2 md:m-0"
            style={{
              backgroundColor: color,
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ y: -10 }} // Initial position above
        animate={{ y: 10 }} // Animate down
        transition={{
          y: {
            duration: 1, // Duration of animation
            repeat: Infinity, // Repeat indefinitely
            repeatType: 'reverse', // Reverse animation when repeating
            ease: 'linear', // Linear easing
          },
        }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }} // Initial position above with opacity 0
          animate={{ y: 0, opacity: 1 }} // Animate down with opacity
          transition={{ duration: 0.5, delay: 3 }} // Start after 3 seconds
          whileHover={{ scale: 1.2 }} // Scale up on hover
        >
          <FaArrowDown
            className="size-12 cursor-pointer"
            onClick={scrollToAboutMe}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
