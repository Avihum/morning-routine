import { tasks } from '../tasks';
import type { TaskId } from '../types';

export function ProgressIndicator({ completed }: { completed: Set<TaskId> }) {
  return <div className="progress" aria-label={`${completed.size} מתוך 6 משימות הושלמו`}>
    {tasks.map((task) => <span key={task.id} className={completed.has(task.id) ? 'progress-dot done' : 'progress-dot'} style={{ '--dot-color': task.color } as React.CSSProperties}>
      {completed.has(task.id) && <span>✓</span>}
    </span>)}
  </div>;
}
