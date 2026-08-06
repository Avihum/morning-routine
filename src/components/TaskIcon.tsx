import type { TaskId } from '../types';

export function TaskIcon({ id }: { id: TaskId }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return <svg viewBox="0 0 160 130" role="img" aria-hidden="true">
    <ellipse className="icon-blob" cx="80" cy="70" rx="65" ry="52" />
    {id === 'dress' && <g {...common}><path d="M55 34 28 50l15 29 16-9v37h44V70l16 9 15-29-29-16c-5 12-35 12-40 0Z"/><path d="M66 38c4 10 24 10 28 0"/></g>}
    {id === 'breakfast' && <g {...common}><path d="M30 61h100c-2 32-20 48-50 48S32 93 30 61Z"/><path d="M42 61c5-24 72-25 77 0M108 29v22M121 25v25"/><circle cx="61" cy="54" r="5" fill="currentColor"/><circle cx="83" cy="48" r="6" fill="currentColor"/></g>}
    {id === 'brush' && <g {...common}><path d="m29 96 75-50 15 20-76 49c-12 7-24-11-14-19Z"/><path d="m103 46 21-14M110 53l23-11M116 61l21-9"/></g>}
    {id === 'toilet' && <g {...common}><path d="M45 47h48v40c0 18-13 27-32 27H48V83h45M45 47V26h49v21M101 69h22v31H99"/><path d="M51 55h64c0 21-12 30-30 30S53 76 51 55Z"/></g>}
    {id === 'shoes' && <g {...common}><path d="M23 79c17 1 28-8 35-29l20 10c-4 21 9 22 15 34 4 8-2 18-14 18H32c-18 0-23-31-9-33Z"/><path d="M74 76c18-1 25-9 31-26l21 10c-3 18 8 24 12 34 4 8-2 18-14 18H84M39 72l26 18M50 61l24 15"/></g>}
    {id === 'sunscreen' && <g {...common}><path d="M56 47h49v67H56zM64 47V27h33v20M72 27v-9h17v9"/><circle cx="81" cy="79" r="14"/><path d="M81 57v7M81 94v7M59 79h7M96 79h7M66 64l5 5M91 90l5 5M96 64l-5 5M71 90l-5 5"/></g>}
  </svg>;
}
