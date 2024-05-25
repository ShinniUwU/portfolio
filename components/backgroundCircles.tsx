import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const colors = ['#5BCEFA', '#F5A9B8', '#FFFFFF', '#F5A9B8', '#5BCEFA'];

interface Circle {
  size: number;
  x: number;
  y: number;
  color: string;
}

interface BackgroundCirclesProps {
  isVisible: boolean;
}

const BackgroundCircles: React.FC<BackgroundCirclesProps> = ({ isVisible }) => {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newCircles = colors.map((color) => ({
        size: Math.random() * 200 + 100,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color,
      }));
      setCircles(newCircles);
    };

    updateWindowDimensions();

    const handleResize = () => {
      updateWindowDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {isVisible &&
        circles.map((circle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: circle.size,
              height: circle.size,
              backgroundColor: circle.color,
              filter: 'blur(50px)',
              top: circle.y,
              left: circle.x,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ ease: 'easeOut', duration: 1 }}
          />
        ))}
    </div>
  );
};

export default BackgroundCircles;
