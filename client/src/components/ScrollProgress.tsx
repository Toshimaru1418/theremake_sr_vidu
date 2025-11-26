import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const circumference = 163.36;
  
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  );
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="30"
          cy="30"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-border opacity-30"
        />
        {/* Progress circle */}
        <motion.circle
          cx="30"
          cy="30"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-primary"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
