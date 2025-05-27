import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  onLoad?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  sizes,
  onLoad
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate WebP version and blur placeholder
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const blurSrc = src.replace(/\.(jpg|jpeg|png)$/i, '-blur.jpg');
  const [blurError, setBlurError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder - only show if not loaded and blur exists */}
      {!isLoaded && !blurError && (
        <img
          src={blurSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-110"
          aria-hidden="true"
          onError={() => setBlurError(true)}
        />
      )}
      
      {/* Main image with fade-in animation */}
      {(loading === 'eager' || isInView) && (
        <motion.picture
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={loading}
            onLoad={handleLoad}
            className="w-full h-full object-cover"
          />
        </motion.picture>
      )}
      
      {/* Loading skeleton - only show if not loaded and not eager */}
      {!isLoaded && loading !== 'eager' && (
        <div className="absolute inset-0 bg-charcoal/20 animate-pulse" />
      )}
    </div>
  );
} 