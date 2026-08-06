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
    playComplete: useCallback((step: number) => {
      const ascendingNotes = [392, 440, 494, 523, 587, 659];
      playNotes([ascendingNotes[Math.min(step, ascendingNotes.length - 1)]], 0.2);
    }, [playNotes]),
    playCelebration: useCallback(() => playNotes([523, 659, 784, 1047], 0.18), [playNotes])
  };
}
