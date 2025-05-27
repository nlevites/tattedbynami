import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language } from '@/types';

interface FAQItem {
  id: string;
  question: {
    en: string;
    ko: string;
  };
  answer: {
    en: string;
    ko: string;
  };
}

const faqData: FAQItem[] = [
  {
    id: 'pain',
    question: {
      en: 'How painful is getting a tattoo?',
      ko: '타투는 얼마나 아픈가요?'
    },
    answer: {
      en: 'Pain levels vary depending on the location and your personal pain tolerance. Most describe it as a scratching or vibrating sensation. I use techniques to minimize discomfort, and we can take breaks whenever needed.',
      ko: '통증은 위치와 개인의 통증 내성에 따라 다릅니다. 대부분 긁히거나 진동하는 느낌으로 묘사합니다. 불편함을 최소화하는 기술을 사용하며, 필요할 때마다 휴식을 취할 수 있습니다.'
    }
  },
  {
    id: 'duration',
    question: {
      en: 'How long does a tattoo session take?',
      ko: '타투 시술은 얼마나 걸리나요?'
    },
    answer: {
      en: 'Session length depends on the size and complexity of the design. Small tattoos can take 30 minutes to 2 hours, while larger pieces may require multiple sessions of 3-5 hours each.',
      ko: '시술 시간은 디자인의 크기와 복잡성에 따라 다릅니다. 작은 타투는 30분에서 2시간, 큰 작품은 3-5시간씩 여러 세션이 필요할 수 있습니다.'
    }
  },
  {
    id: 'healing',
    question: {
      en: 'How long does it take to heal?',
      ko: '치유 기간은 얼마나 되나요?'
    },
    answer: {
      en: 'Initial healing takes about 2-3 weeks, during which the tattoo will peel and may feel itchy. Complete healing of deeper skin layers takes 2-3 months. Proper aftercare is crucial for optimal healing.',
      ko: '초기 치유는 약 2-3주가 걸리며, 이 기간 동안 타투가 벗겨지고 가려울 수 있습니다. 깊은 피부층의 완전한 치유는 2-3개월이 걸립니다. 최적의 치유를 위해 적절한 관리가 중요합니다.'
    }
  },
  {
    id: 'aftercare',
    question: {
      en: 'What aftercare is required?',
      ko: '어떤 관리가 필요한가요?'
    },
    answer: {
      en: 'Keep the tattoo clean and moisturized. Avoid direct sunlight, swimming, and soaking for 2-3 weeks. I provide detailed aftercare instructions and recommend specific products for optimal healing.',
      ko: '타투를 깨끗하고 촉촉하게 유지하세요. 2-3주 동안 직사광선, 수영, 물에 담그는 것을 피하세요. 자세한 관리 지침을 제공하고 최적의 치유를 위한 특정 제품을 추천합니다.'
    }
  },
  {
    id: 'price',
    question: {
      en: 'How much does a tattoo cost?',
      ko: '타투 비용은 얼마인가요?'
    },
    answer: {
      en: 'Pricing depends on size, complexity, and time required. Small pieces start from $150, with larger custom work priced by the hour. I provide quotes during consultation based on your specific design.',
      ko: '가격은 크기, 복잡성, 소요 시간에 따라 다릅니다. 작은 작품은 $150부터 시작하며, 큰 맞춤 작업은 시간당 가격이 책정됩니다. 상담 중 특정 디자인에 따라 견적을 제공합니다.'
    }
  },
  {
    id: 'design',
    question: {
      en: 'Can you create a custom design for me?',
      ko: '맞춤 디자인을 만들어 주실 수 있나요?'
    },
    answer: {
      en: 'Absolutely! I love creating custom pieces. Share your ideas, references, and inspiration during consultation. I\'ll create a unique design that perfectly captures your vision while complementing your body\'s natural flow.',
      ko: '물론입니다! 맞춤 작품을 만드는 것을 좋아합니다. 상담 중에 아이디어, 참고 자료, 영감을 공유해 주세요. 당신의 비전을 완벽하게 포착하면서 몸의 자연스러운 흐름을 보완하는 독특한 디자인을 만들어 드립니다.'
    }
  },
  {
    id: 'age',
    question: {
      en: 'What is the minimum age for getting a tattoo?',
      ko: '타투를 받을 수 있는 최소 연령은 몇 살인가요?'
    },
    answer: {
      en: 'You must be at least 18 years old to get a tattoo. Valid ID is required for all appointments. No exceptions can be made, even with parental consent.',
      ko: '타투를 받으려면 최소 18세 이상이어야 합니다. 모든 예약에 유효한 신분증이 필요합니다. 부모 동의가 있어도 예외는 없습니다.'
    }
  },
  {
    id: 'touch-up',
    question: {
      en: 'Do you offer free touch-ups?',
      ko: '무료 터치업을 제공하나요?'
    },
    answer: {
      en: 'I offer one free touch-up within 3 months of the initial tattoo, provided you\'ve followed aftercare instructions. This ensures your tattoo heals perfectly and maintains its vibrancy.',
      ko: '관리 지침을 따랐다면 초기 타투 후 3개월 이내에 무료 터치업을 한 번 제공합니다. 이를 통해 타투가 완벽하게 치유되고 생동감을 유지할 수 있습니다.'
    }
  }
];

interface FAQSectionProps {
  lang: Language;
}

export default function FAQSection({ lang }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {faqData.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-charcoal/50 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-charcoal/70 transition-colors"
            aria-expanded={openItems.includes(item.id)}
          >
            <h3 className="text-lg font-medium pr-4">
              {item.question[lang]}
            </h3>
            <motion.svg
              animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-5 h-5 text-accent-pink flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
          
          <AnimatePresence>
            {openItems.includes(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-4 text-ink/80">
                  {item.answer[lang]}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
} 