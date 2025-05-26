export type Language = 'ko' | 'en';

export interface Translation {
  ko: string;
  en: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: {
    ko: string;
    en: string;
  };
  type: 'fine-line' | 'colour' | 'lettering' | 'drawing' | 'other';
  dominant: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  kakaoId?: string;
  message: string;
  referenceImage?: File;
} 