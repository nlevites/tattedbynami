import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language, GalleryItem as GalleryItemType } from '@/types';
import GalleryFilter from './GalleryFilter';
import GalleryItem from './GalleryItem';
import MobileGallerySwipe from './MobileGallerySwipe';

interface GalleryProps {
  items: GalleryItemType[];
  lang: Language;
}

export default function Gallery({ items, lang }: GalleryProps) {
  const [filteredItems, setFilteredItems] = useState(items);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [desktopItemsShown, setDesktopItemsShown] = useState(12);
  const [mobileItemsShown, setMobileItemsShown] = useState(9);
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get items to display
  const displayItems = isMobile 
    ? filteredItems.slice(0, mobileItemsShown)
    : filteredItems.slice(0, desktopItemsShown);
    
  const hasMoreItems = isMobile 
    ? mobileItemsShown < filteredItems.length
    : desktopItemsShown < filteredItems.length;

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      if (activeFilter === 'all') {
        setFilteredItems(items);
      } else {
        setFilteredItems(items.filter(item => item.type === activeFilter));
      }
      setIsFiltering(false);
      setDesktopItemsShown(12);
      setMobileItemsShown(9);
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
  
  const loadMore = () => {
    if (isMobile) {
      setMobileItemsShown(prev => Math.min(prev + 9, filteredItems.length));
    } else {
      setDesktopItemsShown(prev => Math.min(prev + 12, filteredItems.length));
    }
  };

  return (
    <div>
      <GalleryFilter lang={lang} onFilterChange={setActiveFilter} />
      
      <AnimatePresence mode="wait">
        {!isFiltering && (
          <>
            {isMobile ? (
              <MobileGallerySwipe items={filteredItems} lang={lang} />
            ) : (
              <>
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  key={`${activeFilter}-${desktopItemsShown}`}
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
              </>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 