import type { Language, GalleryItem as GalleryItemType } from '@/types';
import GalleryItem from './GalleryItem';

interface FeaturedWorkProps {
  items: GalleryItemType[];
  lang: Language;
}

export default function FeaturedWork({ items, lang }: FeaturedWorkProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <GalleryItem key={item.id} item={item} lang={lang} />
      ))}
    </div>
  );
} 