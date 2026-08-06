import type { Settings } from '../types';

type Props = { open: boolean; settings: Settings; onOpen: () => void; onClose: () => void; onReset: () => void; onChange: (settings: Partial<Settings>) => void };

export function ParentControls({ open, settings, onOpen, onClose, onReset, onChange }: Props) {
  if (!open) return <button className="parent-button" aria-label="פתיחת הגדרות הורים" onClick={onOpen}>⚙</button>;
  return <div className="modal-backdrop" role="presentation">
    <section className="parent-panel" role="dialog" aria-modal="true" aria-labelledby="parent-title">
      <div className="panel-title"><h2 id="parent-title">הגדרות להורים</h2><button onClick={onClose} aria-label="סגירה">×</button></div>
      <label>שם הילד<input value={settings.childName} maxLength={16} onChange={(event) => onChange({ childName: event.target.value })} /></label>
      <fieldset><legend>מתארגנים לקראת</legend><div className="segmented">
        {(['גן', 'בית הספר'] as const).map((destination) => <button key={destination} className={settings.destination === destination ? 'selected' : ''} onClick={() => onChange({ destination })}>{destination}</button>)}
      </div></fieldset>
      <label className="switch-row"><span>צלילים</span><input type="checkbox" checked={settings.sound} onChange={(event) => onChange({ sound: event.target.checked })} /></label>
      <label className="switch-row"><span>עידוד קולי</span><input type="checkbox" checked={settings.speech} onChange={(event) => onChange({ speech: event.target.checked })} /></label>
      <button className="reset-button" onClick={onReset}>איפוס כל המשימות</button>
    </section>
  </div>;
}
