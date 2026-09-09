export type TaskId = 'dress' | 'toilet' | 'breakfast' | 'brush' | 'bag' | 'shoes';

export type RoutineTask = {
  id: TaskId;
  label: string;
  hint: string;
  completedMessage: string;
  color: string;
  paleColor: string;
  order: number;
};

export type Settings = {
  childName: string;
  destination: 'גן' | 'בית הספר';
  sound: boolean;
  speech: boolean;
};

export type StoredState = {
  date: string;
  completed: TaskId[];
  settings: Settings;
};
