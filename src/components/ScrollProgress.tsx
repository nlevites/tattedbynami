import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Use less springy animation on mobile for better performance
  const scaleX = useSpring(scrollYProgress, {
    stiffness: isMobile ? 400 : 100,
    damping: isMobile ? 50 : 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent-pink/20 transform-origin-left z-50"
      style={{ 
        scaleX,
        willChange: 'transform'
      }}
    >
      <div className="h-full bg-gradient-to-r from-accent-pink to-accent-sky" />
    </motion.div>
  );
} 