import { motion } from 'framer-motion';
import type { Language, GalleryItem as GalleryItemType } from '@/types';
import { getTranslation } from '@/utils/translations';

interface GalleryItemProps {
  item: GalleryItemType;
  lang: Language;
}

export default function GalleryItem({ item, lang }: GalleryItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="relative rounded-tile overflow-hidden bg-charcoal shadow-lg hover:shadow-xl transition-shadow duration-200"
      data-type={item.type}
    >
      <div className="aspect-[3/4] relative">
        <img
          src={item.src}
          alt={getTranslation(item.alt, lang)}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          style={{ backgroundColor: item.dominant || '#111214' }}
        />
      </div>
    </motion.div>
  );
} 