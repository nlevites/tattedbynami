export type Language = 'ko' | 'en';

export interface Translation {
  ko: string;
  en: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: Translation;
  type: 'fine-line' | 'colour' | 'lettering';
  dominant?: string;
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