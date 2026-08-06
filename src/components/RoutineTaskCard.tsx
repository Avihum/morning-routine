import { useLongPress } from '../hooks/useLongPress';
import type { RoutineTask } from '../types';
import { TaskIcon } from './TaskIcon';

type Props = { task: RoutineTask; completed: boolean; recommended: boolean; onComplete: () => void; onUndo: () => void };

export function RoutineTaskCard({ task, completed, recommended, onComplete, onUndo }: Props) {
  const longPress = useLongPress(onUndo);
  const pressProps = completed ? longPress : {};
  return <button
    type="button"
    className={`task-card ${completed ? 'completed' : 'incomplete'} ${recommended ? 'recommended' : ''}`}
    style={{ '--task-color': task.color, '--task-pale': task.paleColor } as React.CSSProperties}
    aria-label={`${task.label}${completed ? ', הושלם. לחיצה ארוכה לביטול' : ''}`}
    aria-pressed={completed}
    onClick={completed ? longPress.onClick : onComplete}
    {...pressProps}
  >
    <span className="check" aria-hidden="true">{completed ? '✓' : ''}</span>
    <span className="task-art"><TaskIcon id={task.id} /></span>
    <span className="task-label">{task.label}</span>
  </button>;
}
