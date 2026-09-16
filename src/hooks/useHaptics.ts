import { useMotionValueEvent, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export const triggerHapticTick = () => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      // 5ms produces a very short, crisp "tick" on most Android vibration motors,
      // simulating a mechanical gear click.
      navigator.vibrate(5);
    } catch (e) {
      // Ignore
    }
  }
};

export const useHapticTickOnCenter = (scrollProgress: MotionValue<number>) => {
  const hasTickedRef = useRef(false);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    // 0.48 to 0.52 creates a tight threshold right at the dead-center
    if (latest > 0.48 && latest < 0.52) {
      if (!hasTickedRef.current) {
        triggerHapticTick();
        hasTickedRef.current = true;
      }
    } else {
      hasTickedRef.current = false;
    }
  });
};
