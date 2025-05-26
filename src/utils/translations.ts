import type { Language, Translation } from '@/types';

export const translations = {
  nav: {
    home: { ko: '홈', en: 'Home' },
    gallery: { ko: '갤러리', en: 'Gallery' },
    about: { ko: '소개', en: 'About' },
    book: { ko: '예약', en: 'Book' },
  },
  hero: {
    title: { ko: '타투이스트', en: 'Tattoos by' },
    name: { ko: '나미', en: 'Nami' },
    subtitle: { ko: '섬세한 라인워크와 파스텔 색감의 조화', en: 'Delicate linework with playful pastel accents' },
  },
  home: {
    featuredWork: { ko: '최근 작품', en: 'Recent Work' },
    viewAll: { ko: '모든 작품 보기', en: 'View All Work' },
  },
  gallery: {
    title: { ko: '작품 갤러리', en: 'Gallery' },
    filters: {
      all: { ko: '전체', en: 'All' },
      'fine-line': { ko: '파인라인', en: 'Fine line' },
      colour: { ko: '컬러', en: 'Colour' },
      lettering: { ko: '레터링', en: 'Lettering' },
      drawing: { ko: '드로잉', en: 'Drawings' },
    },
  },
  about: {
    title: { ko: '나미 소개', en: 'About Nami' },
    bio: {
      ko: `안녕하세요, 타투이스트 나미입니다. 
      
섬세한 라인워크와 파스텔 톤의 색감을 전문으로 하며, 각 고객님의 이야기를 피부 위에 아름답게 표현합니다. 

특히 꽃, 나비, 애니메이션 캐릭터 등 부드럽고 여성스러운 디자인을 선호하며, 각 작품에 고유한 감성을 담아냅니다.

스튜디오는 포틀랜드 로이드의 유포리아 타투에 위치하고 있으며, 편안하고 아늑한 분위기에서 작업합니다.`,
      en: `Hello, I'm Nami, a tattoo artist specializing in delicate fine-line work.

I love combining intricate linework with soft pastel colors to create unique pieces that tell each client's story beautifully on their skin.

My favorite subjects include flowers, butterflies, and anime characters, always with a soft and feminine touch that makes each piece special.

I work at Euphoria Tattoo in Lloyd, Portland, Oregon, in a comfortable and cozy atmosphere.`,
    },
    studio: { ko: '스튜디오 위치', en: 'Studio Location' },
    address: { ko: '유포리아 타투, 로이드, 포틀랜드, 오레곤', en: 'Euphoria Tattoo, Lloyd, Portland, Oregon' },
    contact: { ko: '카카오톡 ID', en: 'KakaoTalk ID' },
  },
  booking: {
    title: { ko: '예약하기', en: 'Book Appointment' },
    form: {
      name: { ko: '성함', en: 'Name' },
      email: { ko: '이메일', en: 'Email' },
      date: { ko: '희망 날짜', en: 'Preferred Date' },
      time: { ko: '희망 시간', en: 'Preferred Time' },
      kakao: { ko: '카카오톡 ID (선택)', en: 'KakaoTalk ID (optional)' },
      message: { ko: '메시지', en: 'Message' },
      reference: { ko: '참고 이미지 (선택)', en: 'Reference Image (optional)' },
      submit: { ko: '예약 신청', en: 'Submit Booking' },
      success: { ko: '예약 신청이 완료되었습니다!', en: 'Booking request submitted!' },
      error: { ko: '오류가 발생했습니다. 다시 시도해주세요.', en: 'An error occurred. Please try again.' },
    },
  },
};

export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value[k];
    if (!value) return key;
  }
  
  return value[lang] || value.en || key;
}

export function getTranslation(translation: Translation, lang: Language): string {
  return translation[lang] || translation.en;
} 