import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface CircleMaskProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
}

export default function CircleMask({ imageSrc, title, subtitle }: CircleMaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.2, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative py-32 px-4 overflow-hidden"
    >
      <div className="container max-w-7xl relative">
        {/* Left decorative images */}
        <motion.div
          className="absolute left-0 top-1/4 w-64 h-64 opacity-20"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-50, 50]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 15])
          }}
        >
          <img
            src="/cyber-bg-6.png"
            alt="Decorative"
            className="w-full h-full object-cover rounded-lg border border-primary/30"
          />
        </motion.div>
        <motion.div
          className="absolute left-12 bottom-1/4 w-48 h-48 opacity-15"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [30, -30]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, -10])
          }}
        >
          <img
            src="/cyber-bg-7.png"
            alt="Decorative"
            className="w-full h-full object-cover rounded-lg border border-primary/20"
          />
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Circle masked image */}
          <motion.div
            style={{ scale, y }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/30">
              <motion.img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover"
                style={{
                  scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2])
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay"></div>
            </div>
            {/* Decorative rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/20"
              style={{
                scale: useTransform(scrollYProgress, [0, 1], [1, 1.2])
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/10"
              style={{
                scale: useTransform(scrollYProgress, [0, 1], [1, 1.4])
              }}
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-6xl font-bold leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
