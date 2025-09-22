import { useEffect, useState, useRef } from 'react';

const ScrollAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate horizontal position - 2 back and forth movements
  const getHorizontalPosition = () => {
    // Create a sawtooth pattern for 2 back and forth movements
    const cycleProgress = (scrollProgress * 2) % 1; // 2 cycles
    const isGoingRight = Math.floor(scrollProgress * 2) % 2 === 0;
    
    if (isGoingRight) {
      return cycleProgress * 100; // Move right (0 to 100vw)
    } else {
      return 100 - (cycleProgress * 100); // Move left (100 to 0vw)
    }
  };

  const horizontalPosition = getHorizontalPosition();

  // Calculate vertical position (gentle falling effect)
  const verticalPosition = scrollProgress * 20; // Move down as we scroll

  // Calculate scale and rotation
  const getTransformStyle = () => {
    const baseScale = 0.8 + (scrollProgress * 0.4); // Scale from 0.8 to 1.2 (previous size)
    const rotation = scrollProgress * 720; // Two full rotations as we scroll
    
    return {
      transform: `translate(${horizontalPosition}vw, ${verticalPosition}vh) scale(${baseScale}) rotate(${rotation}deg)`,
      opacity: 1,
    };
  };

  return (
    <>
      <div 
        ref={animationRef}
        className="fixed top-20 left-10 z-50 pointer-events-none"
        style={{
          ...getTransformStyle(),
          transition: 'all 0.3s ease-out',
        }}
      >
        {/* Sparkle Animation Container */}
        <div className="relative">
          {/* Sparkles around the coin */}
          <div className="absolute -top-4 -left-4 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -top-2 -right-6 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute -bottom-3 -left-2 w-1 h-1 bg-yellow-200 rounded-full animate-ping opacity-80"></div>
          <div className="absolute -bottom-2 -right-4 w-2.5 h-2.5 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-2 -left-8 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-4 -right-2 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse opacity-75"></div>
          <div className="absolute -top-6 left-4 w-1 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-65"></div>
          <div className="absolute -bottom-5 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
          
          {/* Main Coin */}
          <div className="transition-all duration-500 opacity-100 scale-100">
            <img 
              src="/coin.png" 
              alt="Coin" 
              className="w-16 h-16 object-contain"
              style={{
                filter: 'drop-shadow(0 6px 12px rgba(255, 215, 0, 0.4)) brightness(1.1)',
                animation: 'coin-glow 2s ease-in-out infinite alternate',
              }}
              onError={(e) => console.log('Coin image failed to load:', e)}
            />
          </div>
        </div>
      </div>


      {/* Custom CSS for coin glow animation */}
      <style jsx>{`
        @keyframes coin-glow {
          0% {
            filter: drop-shadow(0 6px 12px rgba(255, 215, 0, 0.4)) brightness(1.1);
          }
          100% {
            filter: drop-shadow(0 8px 16px rgba(255, 215, 0, 0.8)) brightness(1.3);
          }
        }
      `}</style>
    </>
  );
};

export default ScrollAnimation;
