import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import type { Language, GalleryItem as GalleryItemType } from '@/types';
import GalleryItem from './GalleryItem';

interface MobileGallerySwipeProps {
  items: GalleryItemType[];
  lang: Language;
}

export default function MobileGallerySwipe({ items, lang }: MobileGallerySwipeProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  // Group items into pages
  const pages = Array.from({ length: totalPages }, (_, i) => 
    items.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  );

  const paginate = (newDirection: number) => {
    const newPage = currentPage + newDirection;
    if (newPage >= 0 && newPage < totalPages) {
      setDirection(newDirection);
      setCurrentPage(newPage);
    }
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocity = 500;
    
    if (Math.abs(info.velocity.x) > swipeVelocity || Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) {
        paginate(-1);
      } else {
        paginate(1);
      }
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };



  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentPage}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="w-full"
        >
          <div className="grid grid-cols-3 gap-2">
            {pages[currentPage].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.3
                }}
              >
                <GalleryItem item={item} lang={lang} />
              </motion.div>
            ))}
            {/* Add empty cells if needed */}
            {pages[currentPage].length < itemsPerPage && 
              Array.from({ length: itemsPerPage - pages[currentPage].length }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-[3/4]" />
              ))
            }
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentPage ? 1 : -1);
                setCurrentPage(index);
              }}
              className={`rounded-full transition-all duration-300 ${
                index === currentPage 
                  ? 'bg-accent-pink w-8 h-2' 
                  : 'bg-ink/30 hover:bg-ink/50 w-2 h-2'
              }`}
              aria-label={`Go to page ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows for easier control */}
      {totalPages > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-charcoal/80 text-ink flex items-center justify-center transition-opacity ${
              currentPage === 0 ? 'opacity-30' : 'opacity-70 hover:opacity-100'
            }`}
            disabled={currentPage === 0}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-charcoal/80 text-ink flex items-center justify-center transition-opacity ${
              currentPage === totalPages - 1 ? 'opacity-30' : 'opacity-70 hover:opacity-100'
            }`}
            disabled={currentPage === totalPages - 1}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Swipe hint */}
      {totalPages > 1 && currentPage === 0 && (
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