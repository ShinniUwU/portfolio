'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaReact, FaNodeJs, FaGithub, FaJava, FaGitAlt, FaLinux } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs } from 'react-icons/si';

const AboutMe: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      id="about"
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-900 to-black text-white"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <motion.h2 className="text-4xl font-bold mb-8" variants={itemVariants}>
        About Me
      </motion.h2>
      
      <motion.div className="max-w-2xl text-center mb-12" variants={itemVariants}>
        <p className="mb-4">
          Hey there! I'm Hana Becheva, a code enthusiast with a passion for crafting sleek and efficient web solutions.
        </p>
        <p>
          When I'm not immersed in lines of code, you'll find me exploring new coffee shops, diving into sci-fi novels, or contributing to open-source projects that catch my eye.
        </p>
      </motion.div>

      <motion.div className="flex flex-wrap justify-center gap-8 mb-12" variants={itemVariants}>
        <TechIcon Icon={FaReact} label="React" />
        <TechIcon Icon={SiTypescript} label="TypeScript" />
        <TechIcon Icon={SiNextdotjs} label="Next.js" />
        <TechIcon Icon={FaNodeJs} label="Node.js" />
        <TechIcon Icon={FaGithub} label="GitHub" />
        <TechIcon Icon={FaJava} label="Java" />
        <TechIcon Icon={FaGitAlt} label="Git" />
        <TechIcon Icon={FaLinux} label="Linux Bash" />
      </motion.div>

      <motion.a
        href="https://github.com/ShinniUwU"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
        variants={itemVariants}
      >
        Check out my GitHub
      </motion.a>
    </motion.div>
  );
};

const TechIcon: React.FC<{ Icon: React.ElementType; label: string }> = ({ Icon, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? { y: -5 } : { y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="text-4xl mb-2" />
      </motion.div>
      <motion.span
        className="text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

export default AboutMe;
