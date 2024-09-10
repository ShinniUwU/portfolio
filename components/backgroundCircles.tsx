import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();

  useEffect(() => {
    const updateCircles = () => {
      const newCircles = colors.map((color) => ({
        size: Math.random() * 200 + 100,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color,
      }));
      setCircles(newCircles);
    };

    updateCircles();

    window.addEventListener('resize', updateCircles);
    return () => window.removeEventListener('resize', updateCircles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
              opacity: theme === 'light' ? 0.3 : 0.2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: theme === 'light' ? 0.3 : 0.2 }}
            transition={{ ease: 'easeOut', duration: 1 }}
          />
        ))}
    </div>
  );
};

export default BackgroundCircles;
