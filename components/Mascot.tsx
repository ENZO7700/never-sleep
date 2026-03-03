import React from 'react';
import { motion } from 'framer-motion';

interface MascotProps {
  className?: string;
  size?: number;
  withBubble?: boolean;
  bubbleText?: string;
}

export function Mascot({ className = '', size = 120, withBubble = false, bubbleText = "I'm on it!" }: MascotProps) {
  const [isQuacking, setIsQuacking] = React.useState(false);

  const handleQuack = () => {
    setIsQuacking(true);
    setTimeout(() => setIsQuacking(false), 1000);
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {(withBubble || isQuacking) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 px-4 py-2 rounded-2xl rounded-bl-none shadow-xl whitespace-nowrap z-10"
        >
          <span className="text-sm font-bold text-text-primary">
            {isQuacking ? "QUACK! 🦆" : bubbleText}
          </span>
          <div className="absolute -bottom-2 left-2 w-4 h-4 bg-white dark:bg-white/10 border-l border-b border-black/10 dark:border-white/20 transform rotate-45" />
        </motion.div>
      )}
      
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: isQuacking ? [0, -10, 10, -10, 0] : 0
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0.3, repeat: isQuacking ? 2 : 0 }
        }}
        className="relative group"
        onClick={handleQuack}
      >
        <div className="absolute inset-0 bg-yellow/20 blur-3xl rounded-full group-hover:bg-yellow/40 transition-colors duration-500" />
        <img 
          src="/logoduck.png" 
          alt="RubberDuck Mascot" 
          width={size}
          height={size}
          className="relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer"
        />
      </motion.div>
    </div>
  );
}
