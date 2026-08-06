import { useCallback, useRef } from 'react';

export function useSoundEffects(enabled: boolean) {
  const contextRef = useRef<AudioContext | null>(null);

  const playNotes = useCallback((notes: number[], duration = 0.12) => {
    if (!enabled || typeof AudioContext === 'undefined') return;
    const context = contextRef.current ?? new AudioContext();
    contextRef.current = context;
    void context.resume();
    const start = context.currentTime;
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, start + index * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.12, start + index * 0.07 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + index * 0.07 + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(start + index * 0.07);
      oscillator.stop(start + index * 0.07 + duration + 0.02);
    });
  }, [enabled]);

  return {
    playComplete: useCallback((variant: number) => {
      const roots = [440, 466, 494];
      const root = roots[variant % roots.length];
      playNotes([root, root * 1.122, root * 1.26, root * 1.335, root * 1.498, root * 1.682], 0.1);
    }, [playNotes]),
    playCelebration: useCallback(() => playNotes([523, 659, 784, 1047], 0.18), [playNotes])
  };
}
