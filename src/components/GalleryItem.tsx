import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Language, GalleryItem as GalleryItemType } from '@/types';
import { getTranslation } from '@/utils/translations';

interface GalleryItemProps {
  item: GalleryItemType;
  lang: Language;
}

export default function GalleryItem({ item, lang }: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative rounded-tile overflow-hidden bg-charcoal shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      data-type={item.type}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/4] relative">
        <motion.img
          src={item.src}
          alt={getTranslation(item.alt, lang)}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          style={{ backgroundColor: item.dominant || '#111214' }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        
        {/* Gradient overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent"
            />
          )}
        </AnimatePresence>

        {/* Content overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 p-4"
            >
              <h3 className="text-lg font-medium text-ink mb-1">
                {getTranslation(item.alt, lang)}
              </h3>
              <p className="text-sm text-ink/70 capitalize">
                {item.type === 'colour' ? (lang === 'ko' ? '컬러' : 'Color') : 
                 item.type === 'fine-line' ? (lang === 'ko' ? '파인라인' : 'Fine Line') : 
                 item.type === 'lettering' ? (lang === 'ko' ? '레터링' : 'Lettering') :
                 item.type === 'drawing' ? (lang === 'ko' ? '드로잉' : 'Drawing') :
                 (lang === 'ko' ? '기타' : 'Other')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 