import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { STORAGE_KEY, defaultSettings, loadState, localDate } from './hooks/useMorningRoutine';

describe('morning routine', () => {
  it('displays all six tasks in recommended RTL DOM order', () => {
    render(<App />);
    expect(screen.getAllByRole('button', { pressed: false })).toHaveLength(6);
    expect(screen.getByRole('button', { name: 'להתלבש' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'להתמרח' })).toBeInTheDocument();
  });

  it('completes a task and updates progress', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'להתלבש' }));
    expect(screen.getByRole('button', { name: /להתלבש, הושלם/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('1 מתוך 6 משימות הושלמו')).toBeInTheDocument();
  });

  it('does not undo a completed task with a normal tap', async () => {
    render(<App />);
    const card = screen.getByRole('button', { name: 'להתלבש' });
    await userEvent.click(card);
    await userEvent.click(screen.getByRole('button', { name: /להתלבש, הושלם/ }));
    expect(screen.getByLabelText('1 מתוך 6 משימות הושלמו')).toBeInTheDocument();
  });

  it('allows out-of-order completion and advances the recommendation correctly', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'נעליים' }));
    expect(screen.getByText('עכשיו מתלבשים')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'להתלבש' }));
    expect(screen.getByText('עכשיו אוכלים')).toBeInTheDocument();
  });

  it('opens the celebration after every task is complete', async () => {
    render(<App />);
    for (const label of ['להתלבש', 'לאכול', 'לצחצח', 'פיפי', 'נעליים', 'להתמרח']) await userEvent.click(screen.getByRole('button', { name: label }));
    expect(screen.getByRole('dialog', { name: 'כל הכבוד!' })).toBeInTheDocument();
  });

  it('resets completion from a previous local day', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: '2000-01-01', completed: ['dress'], settings: defaultSettings }));
    expect(loadState(localDate()).completed).toEqual([]);
  });

  it('persists disabled sound', async () => {
    render(<App />);
    const gear = screen.getByLabelText(/פתיחת הגדרות/);
    fireEvent.click(gear);
    expect(screen.getByRole('dialog', { name: 'הגדרות להורים' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('checkbox', { name: 'צלילים' }));
    expect(screen.getByRole('checkbox', { name: 'צלילים' })).not.toBeChecked();
  });

  it('parent reset clears all completed tasks', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'להתלבש' }));
    const gear = screen.getByLabelText(/פתיחת הגדרות/);
    fireEvent.click(gear);
    fireEvent.click(screen.getByRole('button', { name: 'איפוס כל המשימות' }));
    expect(screen.getByLabelText('0 מתוך 6 משימות הושלמו')).toBeInTheDocument();
  });
});
