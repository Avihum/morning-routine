import { useRef } from 'react';
import type { MouseEventHandler, PointerEventHandler } from 'react';

export function useLongPress(action: () => void, delay = 800) {
  const timer = useRef<number | null>(null);
  const fired = useRef(false);

  const clear = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };

  const onPointerDown: PointerEventHandler = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    fired.current = false;
    timer.current = window.setTimeout(() => {
      fired.current = true;
      action();
    }, delay);
  };

  const onClick: MouseEventHandler = (event) => {
    if (fired.current) {
      event.preventDefault();
      event.stopPropagation();
      fired.current = false;
    }
  };

  return { onPointerDown, onPointerUp: clear, onPointerCancel: clear, onPointerLeave: clear, onClick };
}
