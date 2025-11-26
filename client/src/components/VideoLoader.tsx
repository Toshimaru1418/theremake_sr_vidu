import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoLoaderProps {
  onLoadComplete: () => void;
}

export default function VideoLoader({ onLoadComplete }: VideoLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if screen is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(onLoadComplete, 500);
      }, 300);
    };

    video.addEventListener("ended", handleEnded);

    // Auto-play video
    video.play().catch(() => {
      // If auto-play fails, skip to main content after 2 seconds
      setTimeout(() => {
        setIsLoading(false);
        onLoadComplete();
      }, 2000);
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src={isMobile ? "/loader-mobile.mp4" : "/remake-video.mp4"}
            className="w-full h-full object-cover"
            muted
            playsInline
            key={isMobile ? 'mobile' : 'desktop'}
          >
            <track kind="captions" />
          </video>
          
          {/* Skip button */}
          <button
            onClick={() => {
              setIsLoading(false);
              onLoadComplete();
            }}
            className="absolute bottom-8 right-8 px-6 py-3 bg-primary/20 hover:bg-primary/40 backdrop-blur-sm border border-primary/50 rounded-lg text-primary font-semibold transition-all duration-300 hover:scale-105"
          >
            SKIP
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
