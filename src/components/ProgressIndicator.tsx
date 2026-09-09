import { tasks } from '../tasks';
import type { TaskId } from '../types';

export function ProgressIndicator({ completed }: { completed: Set<TaskId> }) {
  return <div className="progress-wrap">
    <div className="progress-copy"><span>התקדמות</span><strong>{completed.size}/{tasks.length}</strong></div>
    <div className="progress" aria-label={`${completed.size} מתוך ${tasks.length} משימות הושלמו`}>
    {tasks.map((task, index) => <span key={task.id} className={completed.has(task.id) ? 'progress-dot done' : 'progress-dot'} style={{ '--dot-color': task.color } as React.CSSProperties}>
      <span>{completed.has(task.id) ? '✓' : index + 1}</span>
    </span>)}
    </div>
  </div>;
}
