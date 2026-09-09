import type { RoutineTask } from './types';

export const tasks: RoutineTask[] = [
  { id: 'dress', label: 'להתלבש', hint: 'המשימה הבאה: להתלבש', completedMessage: 'מעולה, התלבשת!', color: '#3e7ee8', paleColor: '#eaf2ff', order: 1 },
  { id: 'toilet', label: 'פיפי', hint: 'המשימה הבאה: פיפי', completedMessage: 'מצוין, עשית פיפי!', color: '#7357c7', paleColor: '#f0edff', order: 2 },
  { id: 'breakfast', label: 'לאכול', hint: 'המשימה הבאה: לאכול', completedMessage: 'יופי, סיימת לאכול!', color: '#e88b2c', paleColor: '#fff2e2', order: 3 },
  { id: 'brush', label: 'לצחצח', hint: 'המשימה הבאה: לצחצח שיניים', completedMessage: 'כל הכבוד, צחצחת שיניים!', color: '#159b9a', paleColor: '#e5f8f6', order: 4 },
  { id: 'bag', label: 'לארגן תיק', hint: 'המשימה הבאה: לארגן תיק', completedMessage: 'התיק מוכן, כל הכבוד!', color: '#c96b46', paleColor: '#fff0e9', order: 5 },
  { id: 'shoes', label: 'נעליים', hint: 'המשימה הבאה: לנעול נעליים', completedMessage: 'נהדר, נעלת נעליים!', color: '#508d5a', paleColor: '#edf7ed', order: 6 }
];
