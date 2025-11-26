import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      <span
        className={`relative z-10 ${glitchActive ? 'animate-glitch' : ''}`}
        data-text={text}
      >
        {text}
      </span>
      {glitchActive && (
        <>
          <span
            className="absolute top-0 left-0 text-cyan-500 opacity-70 animate-glitch-1"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
            aria-hidden="true"
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-purple-500 opacity-70 animate-glitch-2"
            style={{ clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)' }}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
}
