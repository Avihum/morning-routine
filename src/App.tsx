import { useEffect, useRef, useState } from 'react';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { ParentControls } from './components/ParentControls';
import { ProgressIndicator } from './components/ProgressIndicator';
import { RoutineTaskCard } from './components/RoutineTaskCard';
import { useMorningRoutine } from './hooks/useMorningRoutine';
import { useSoundEffects } from './hooks/useSoundEffects';
import { tasks } from './tasks';

export default function App() {
  const routine = useMorningRoutine();
  const sounds = useSoundEffects(routine.settings.sound);
  const [parentOpen, setParentOpen] = useState(false);
  const celebrated = useRef(routine.completed.length === tasks.length);
  const allComplete = routine.completed.length === tasks.length;

  useEffect(() => {
    if (allComplete && !celebrated.current) sounds.playCelebration();
    celebrated.current = allComplete;
  }, [allComplete, sounds]);

  const completeTask = (index: number) => {
    const task = tasks[index];
    if (!routine.complete(task.id)) return;
    sounds.playComplete(index);
    if (routine.settings.speech && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(task.completedMessage);
      utterance.lang = 'he-IL';
      window.speechSynthesis.speak(utterance);
    }
  };

  return <main className="app-shell">
    <div className="cloud cloud-one"/><div className="cloud cloud-two"/>
    <ParentControls open={parentOpen} settings={routine.settings} onOpen={() => setParentOpen(true)} onClose={() => setParentOpen(false)} onChange={routine.updateSettings} onReset={() => { routine.reset(); setParentOpen(false); }} />
    <header className="morning-header">
      <h1>בוקר טוב, {routine.settings.childName || 'חבר'}</h1>
      <p>בוא נתארגן!</p>
      <ProgressIndicator completed={routine.completedSet} />
    </header>

    {routine.nextTask && <div className="next-hint" aria-live="polite">{routine.nextTask.hint}</div>}

    <section className="task-grid" aria-label="משימות הבוקר">
      {tasks.map((task, index) => <RoutineTaskCard key={task.id} task={task} completed={routine.completedSet.has(task.id)} recommended={routine.nextTask?.id === task.id} onComplete={() => completeTask(index)} onUndo={() => routine.undo(task.id)} />)}
    </section>

    <footer className="landscape">
      <div className="hills"/><div className="sun" aria-hidden="true"><span className="sun-eye"/><span className="sun-eye"/><span className="sun-smile"/></div>
      <div className="encouragement"><strong>{allComplete ? 'איזה יופי!' : 'כמעט מוכנים'}</strong><span>{allComplete ? 'סיימת את כל משימות הבוקר!' : 'אתה עושה עבודה נהדרת!'}</span></div>
    </footer>
    {allComplete && !parentOpen && <CelebrationOverlay destination={routine.settings.destination} onReset={routine.reset} />}
  </main>;
}
