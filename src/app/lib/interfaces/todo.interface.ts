export interface Todo {
  title: string;
  createdAt: Date;
  status: 'not-started' | 'in-progress' | 'done';
  dueDate: Date;
  description: string;
  isImportant: boolean;
  isUrgent: boolean;
}
