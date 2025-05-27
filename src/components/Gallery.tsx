import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
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
  const [isMobile, setIsMobile] = useState(false);
  const [desktopItemsShown, setDesktopItemsShown] = useState(12); // Initial items on desktop
  
  // Mobile swipe detection
  const x = useMotionValue(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Fixed number for mobile
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get items to display based on device
  const displayItems = isMobile 
    ? filteredItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : filteredItems.slice(0, desktopItemsShown);
    
  const hasMoreItems = !isMobile && desktopItemsShown < filteredItems.length;

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
      setDesktopItemsShown(12); // Reset desktop items shown
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
  
  const loadMore = () => {
    setDesktopItemsShown(prev => Math.min(prev + 12, filteredItems.length));
  };

  return (
    <div>
      <GalleryFilter lang={lang} onFilterChange={setActiveFilter} />
      
      <AnimatePresence mode="wait">
        {!isFiltering && (
          <motion.div
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ x: isMobile ? x : 0 }}
            className={isMobile ? "touch-pan-y" : ""}
          >
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key={`${activeFilter}-${currentPage}-${desktopItemsShown}`}
            >
              {displayItems.map((item, index) => (
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
      
      {/* Load More button for desktop */}
      {hasMoreItems && (
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={loadMore}
            className="btn-primary px-8 py-3 text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {lang === 'ko' ? '더 보기' : 'Load More'} 
            <span className="ml-2 text-sm opacity-70">
              ({desktopItemsShown}/{filteredItems.length})
            </span>
          </button>
        </motion.div>
      )}
      
      {/* Pagination dots for mobile only */}
      {isMobile && totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
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
      
      {/* Swipe hint for mobile */}
      {isMobile && totalPages > 1 && (
        <motion.p 
          className="text-center text-sm text-ink/50 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {lang === 'ko' ? '← 스와이프하여 더 보기 →' : '← Swipe to see more →'}
        </motion.p>
      )}
    </div>
  );
} 