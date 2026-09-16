import { useMotionValueEvent, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export const triggerHapticTick = () => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      // A pronounced gear-like vibration pattern for Android:
      // Vibrates for 20ms, pauses for 30ms, vibrates for 20ms
      navigator.vibrate([20, 30, 20]);
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
