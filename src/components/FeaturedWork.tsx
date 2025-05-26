import { motion } from 'framer-motion';
import type { Language, GalleryItem as GalleryItemType } from '@/types';
import GalleryItem from './GalleryItem';

interface FeaturedWorkProps {
  items: GalleryItemType[];
  lang: Language;
}

export default function FeaturedWork({ items, lang }: FeaturedWorkProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          custom={index}
        >
          <GalleryItem item={item} lang={lang} />
        </motion.div>
      ))}
    </motion.div>
  );
} 