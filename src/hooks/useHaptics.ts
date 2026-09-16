import { useMotionValueEvent, MotionValue } from 'framer-motion';
import { useRef } from 'react';

// Create a singleton AudioContext so we don't create hundreds of them
let audioCtx: AudioContext | null = null;

const playTickSound = () => {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    
    // Resume context if suspended (requires user interaction first)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    // Create a very subtle, low-frequency "thud" to simulate Apple's Taptic Engine
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Ignore errors (e.g., if user hasn't interacted yet)
  }
};

export const triggerHapticTick = () => {
  if (typeof window !== 'undefined') {
    // 1. Hardware Vibration for Android
    if ('vibrate' in navigator) {
      try {
        // Increased from 5ms to 15ms. Many smartphone motors take ~10ms just to spin up.
        // 15ms gives a very solid, distinct gear tick.
        navigator.vibrate(15);
      } catch (e) {}
    }
    
    // 2. Audio "Taptic" fallback for iPhones & PC
    playTickSound();
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
