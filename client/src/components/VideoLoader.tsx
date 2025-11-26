import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoLoaderProps {
  onLoadComplete: () => void;
}

export default function VideoLoader({ onLoadComplete }: VideoLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  // ✅ matchMediaを使用してより信頼性の高いモバイル判定を行う
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  // ✅ 画面サイズチェックをmatchMediaで行う
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // ✅ 動画再生のuseEffectを isMobile に依存させる
  useEffect(() => {
    console.log("VideoLoader: isMobile =", isMobile);
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(onLoadComplete, 500);
      }, 300);
    };

    const playVideo = () => {
      video
        .play()
        .catch((err) => {
          console.error("Video play failed:", err);
          // 自動再生失敗時は3秒後に強制終了
          setTimeout(() => {
            setIsLoading(false);
            onLoadComplete();
          }, 3000);
        });
    };

    video.addEventListener("ended", handleEnded);

    // 動画の準備ができたら再生
    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    // 安全策：ロードが遅すぎる、または再生が始まらない場合のタイムアウト（8秒）
    const fallbackTimer = setTimeout(() => {
      console.warn("VideoLoader: Fallback timer triggered");
      setIsLoading(false);
      onLoadComplete();
    }, 8000);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", playVideo);
      clearTimeout(fallbackTimer);
    };
  }, [onLoadComplete, isMobile]);

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
            preload="auto"
            autoPlay
            key={isMobile ? "mobile" : "desktop"}
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
