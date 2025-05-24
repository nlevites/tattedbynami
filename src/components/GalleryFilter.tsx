import { useState } from 'react';
import type { Language } from '@/types';
import { t } from '@/utils/translations';
import { cn } from '@/utils/cn';

interface GalleryFilterProps {
  lang: Language;
  onFilterChange: (filter: string) => void;
}

const filters = ['all', 'fine-line', 'colour', 'lettering'] as const;

export default function GalleryFilter({ lang, onFilterChange }: GalleryFilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            activeFilter === filter
              ? 'bg-accent-pink text-charcoal shadow-lg'
              : 'bg-charcoal border border-ink/20 text-ink hover:border-accent-pink hover:text-accent-pink'
          )}
        >
          {t(`gallery.filters.${filter}`, lang)}
        </button>
      ))}
    </div>
  );
} 