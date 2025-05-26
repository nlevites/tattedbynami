import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Language } from '@/types';
import { t } from '@/utils/translations';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  const shouldReduceMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Helper function to create URLs with language parameter
  const createLangUrl = (path: string) => {
    return lang === 'ko' ? `${path}?lang=ko` : path;
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Animated Pastel accent sprinkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-accent-pink blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-12 -left-12 w-36 h-36 rounded-full bg-accent-sky blur-3xl opacity-30"
        />
      </div>

      <motion.div style={{ y, opacity }} className="container py-16 lg:py-24">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.8,
            bounce: 0.3
          }}
          className="relative rounded-card overflow-hidden bg-gradient-to-br from-charcoal to-charcoal/90 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 items-center">
            <motion.div 
              className="p-8 lg:p-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                className="text-4xl lg:text-6xl font-title mb-4"
                variants={itemVariants}
              >
                {t('hero.title', lang)}{' '}
                <motion.span 
                  className="text-accent-pink inline-block"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(255, 195, 217, 0)",
                      "0 0 20px rgba(255, 195, 217, 0.5)",
                      "0 0 0px rgba(255, 195, 217, 0)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {t('hero.name', lang)}
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-lg text-ink/80 text-balance"
                variants={itemVariants}
              >
                {t('hero.subtitle', lang)}
              </motion.p>
              <motion.div 
                className="mt-8"
                variants={itemVariants}
              >
                <motion.a 
                  href={createLangUrl('/gallery')} 
                  className="btn-primary group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{t('nav.gallery', lang)} →</span>
                  <motion.div
                    className="absolute inset-0 bg-accent-sky"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "tween", duration: 0.3 }}
                  />
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative h-96 md:h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.img
                src="/images/dainty_fineline_flowers.png"
                alt={lang === 'ko' ? '섬세한 꽃 파인라인' : 'Dainty fine-line flowers'}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-charcoal/30"></div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 