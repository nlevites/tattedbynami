import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language, GalleryItem as GalleryItemType } from '@/types';
import GalleryFilter from './GalleryFilter';
import GalleryItem from './GalleryItem';

interface GalleryProps {
  items: GalleryItemType[];
  lang: Language;
}

export default function Gallery({ items, lang }: GalleryProps) {
  const [filteredItems, setFilteredItems] = useState(items);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      if (activeFilter === 'all') {
        setFilteredItems(items);
      } else {
        setFilteredItems(items.filter(item => item.type === activeFilter));
      }
      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeFilter, items]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div>
      <GalleryFilter lang={lang} onFilterChange={setActiveFilter} />
      
      <AnimatePresence mode="wait">
        {!isFiltering && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key={activeFilter}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                custom={index}
                layout
              >
                <GalleryItem item={item} lang={lang} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 