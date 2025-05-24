import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.type === activeFilter));
    }
  }, [activeFilter, items]);

  return (
    <div>
      <GalleryFilter lang={lang} onFilterChange={setActiveFilter} />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <GalleryItem key={item.id} item={item} lang={lang} />
        ))}
      </div>
    </div>
  );
} 