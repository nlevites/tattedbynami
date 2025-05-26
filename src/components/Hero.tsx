import { motion } from 'framer-motion';
import type { Language } from '@/types';
import { t } from '@/utils/translations';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const shouldReduceMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Helper function to create URLs with language parameter
  const createLangUrl = (path: string) => {
    return lang === 'ko' ? `${path}?lang=ko` : path;
  };

  return (
    <section className="relative overflow-hidden">
      {/* Pastel accent sprinkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-accent-pink blur-3xl opacity-30"></div>
        <div className="absolute bottom-12 -left-12 w-36 h-36 rounded-full bg-accent-sky blur-3xl opacity-30"></div>
      </div>

      <div className="container py-16 lg:py-24">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.8,
            bounce: 0.3
          }}
          className="relative rounded-card overflow-hidden bg-gradient-to-br from-charcoal to-charcoal/90"
        >
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 lg:p-12">
              <h1 className="text-4xl lg:text-6xl font-title mb-4">
                {t('hero.title', lang)}{' '}
                <span className="text-accent-pink">{t('hero.name', lang)}</span>
              </h1>
              <p className="text-lg text-ink/80 text-balance">
                {t('hero.subtitle', lang)}
              </p>
              <div className="mt-8">
                <a href={createLangUrl('/gallery')} className="btn-primary">
                  {t('nav.gallery', lang)} →
                </a>
              </div>
            </div>
            
            <div className="relative h-96 md:h-full">
              <img
                src="/images/dainty_fineline_flowers.png"
                alt={lang === 'ko' ? '섬세한 꽃 파인라인' : 'Dainty fine-line flowers'}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-charcoal/30"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 