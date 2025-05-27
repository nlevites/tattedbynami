import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface CustomScrollbarProps {
  containerRef?: React.RefObject<HTMLElement>;
  className?: string;
}

export default function CustomScrollbar({ containerRef, className = '' }: CustomScrollbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<NodeJS.Timeout>();
  
  const { scrollY, scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Calculate thumb height based on viewport to content ratio
  const thumbHeightRatio = clientHeight > 0 && scrollHeight > 0 
    ? Math.max(30, (clientHeight / scrollHeight) * clientHeight)
    : 0;
  
  // Calculate thumb position
  const thumbY = useTransform(scrollYProgress, (progress) => {
    const maxScroll = clientHeight - thumbHeightRatio;
    return progress * maxScroll;
  });
  
  // Smooth the thumb position
  const smoothThumbY = useSpring(thumbY, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });
  
  useEffect(() => {
    const updateDimensions = () => {
      const element = containerRef?.current || document.documentElement;
      setScrollHeight(element.scrollHeight);
      setClientHeight(element.clientHeight);
      setIsVisible(element.scrollHeight > element.clientHeight);
    };
    
    const handleScroll = () => {
      setIsActive(true);
      
      // Clear existing timeout
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      
      // Hide after 1 second of no scrolling
      hideTimeout.current = setTimeout(() => {
        setIsActive(false);
      }, 1000);
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Listen for content changes
    const observer = new ResizeObserver(updateDimensions);
    const element = containerRef?.current || document.documentElement;
    observer.observe(element);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, [containerRef]);
  
  // Handle scrollbar drag
  const handleDrag = (event: any, info: any) => {
    const element = containerRef?.current || document.documentElement;
    const scrollbarHeight = scrollbarRef.current?.clientHeight || clientHeight;
    const maxScroll = element.scrollHeight - element.clientHeight;
    const dragProgress = info.point.y / scrollbarHeight;
    const newScrollTop = dragProgress * maxScroll;
    
    element.scrollTop = Math.max(0, Math.min(maxScroll, newScrollTop));
  };
  
  if (!isVisible) return null;
  
  return (
    <motion.div 
      ref={scrollbarRef}
      className={`fixed right-0 top-0 bottom-0 w-4 z-40 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{ paddingRight: '8px' }}
    >
      {/* Track */}
      <div className="absolute right-2 top-0 bottom-0 w-1 bg-ink/5 rounded-full" />
      
      {/* Thumb */}
      <motion.div
        className="absolute right-2 w-1 bg-accent-pink/80 rounded-full cursor-grab active:cursor-grabbing"
        style={{
          height: thumbHeightRatio,
          y: smoothThumbY,
        }}
        drag="y"
        dragConstraints={scrollbarRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        whileHover={{ backgroundColor: 'rgb(255 195 217)', scale: 1.5 }}
        whileDrag={{ scale: 2 }}
        transition={{ backgroundColor: { duration: 0.2 } }}
      />
    </motion.div>
  );
} 