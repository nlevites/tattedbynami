import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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
  
  // Mobile swipe detection
  const x = useMotionValue(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 9;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  const currentItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      if (activeFilter === 'all') {
        setFilteredItems(items);
      } else {
        setFilteredItems(items.filter(item => item.type === activeFilter));
      }
      setIsFiltering(false);
      setCurrentPage(0); // Reset to first page on filter change
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

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (info.offset.x < -swipeThreshold && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <GalleryFilter lang={lang} onFilterChange={setActiveFilter} />
      
      <AnimatePresence mode="wait">
        {!isFiltering && (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="touch-pan-y"
          >
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key={`${activeFilter}-${currentPage}`}
            >
              {currentItems.map((item, index) => (
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
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pagination dots for mobile */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 md:hidden">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentPage 
                  ? 'bg-accent-pink w-6' 
                  : 'bg-ink/30 hover:bg-ink/50'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 