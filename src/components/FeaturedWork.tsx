import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Language, GalleryItem as GalleryItemType } from '@/types';
import GalleryItem from './GalleryItem';

interface FeaturedWorkProps {
  items: GalleryItemType[];
  lang: Language;
}

export default function FeaturedWork({ items, lang }: FeaturedWorkProps) {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20, scale: isMobile ? 0.95 : 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: isMobile ? "tween" : "spring",
        stiffness: 100,
        damping: 15,
        duration: isMobile ? 0.3 : undefined
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isMobile ? 0.05 : 0.1 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          custom={index}
          style={{ willChange: isMobile ? 'auto' : 'transform' }}
        >
          <GalleryItem item={item} lang={lang} />
        </motion.div>
      ))}
    </motion.div>
  );
} 