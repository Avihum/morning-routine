import type { RoutineTask } from './types';

export const tasks: RoutineTask[] = [
  { id: 'dress', label: 'להתלבש', hint: 'עכשיו מתלבשים', completedMessage: 'מעולה, התלבשת!', color: '#2f8ef4', paleColor: '#e7f4ff', order: 1 },
  { id: 'breakfast', label: 'לאכול', hint: 'עכשיו אוכלים', completedMessage: 'יופי, סיימת לאכול!', color: '#ff9418', paleColor: '#fff2dc', order: 2 },
  { id: 'brush', label: 'לצחצח', hint: 'עכשיו מצחצחים', completedMessage: 'כל הכבוד, צחצחת שיניים!', color: '#24bfb6', paleColor: '#e0f9f6', order: 3 },
  { id: 'toilet', label: 'פיפי', hint: 'עכשיו פיפי', completedMessage: 'מצוין, עשית פיפי!', color: '#8b5cf6', paleColor: '#f0e9ff', order: 4 },
  { id: 'shoes', label: 'נעליים', hint: 'עכשיו נועלים נעליים', completedMessage: 'נהדר, נעלת נעליים!', color: '#62ad5c', paleColor: '#e9f7e5', order: 5 },
  { id: 'sunscreen', label: 'להתמרח', hint: 'עכשיו מתמרחים', completedMessage: 'יופי, התמרחת!', color: '#f3bd24', paleColor: '#fff7d6', order: 6 }
];
