import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Language } from '@/types';
import { t } from '@/utils/translations';
import { cn } from '@/utils/cn';

interface GalleryFilterProps {
  lang: Language;
  onFilterChange: (filter: string) => void;
}

const filters = ['all', 'fine-line', 'colour', 'lettering', 'drawing'] as const;

export default function GalleryFilter({ lang, onFilterChange }: GalleryFilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {filters.map((filter) => (
        <motion.button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative',
            activeFilter === filter
              ? 'bg-accent-pink text-charcoal shadow-lg'
              : 'bg-charcoal border border-ink/20 text-ink hover:border-accent-pink hover:text-accent-pink'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3,
            delay: filters.indexOf(filter) * 0.05
          }}
        >
          {activeFilter === filter && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-accent-pink rounded-full -z-10"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          )}
          <span className="relative z-10">
            {t(`gallery.filters.${filter}`, lang)}
          </span>
        </motion.button>
      ))}
    </div>
  );
} 