import { useLongPress } from '../hooks/useLongPress';

export function CelebrationOverlay({ destination, onReset }: { destination: string; onReset: () => void }) {
  const resetPress = useLongPress(onReset);
  return <div className="celebration" role="dialog" aria-modal="true" aria-labelledby="celebration-title">
    <div className="confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--i': index } as React.CSSProperties} />)}</div>
    <div className="celebration-card">
      <div className="celebration-stars" aria-hidden="true">★ ✦ ★</div>
      <h2 id="celebration-title">כל הכבוד!</h2>
      <p>אתה מוכן ל{destination}</p>
      <button {...resetPress}>לחיצה ארוכה לבוקר חדש</button>
    </div>
  </div>;
}
