import { STATUS_VALUE } from '../constants/constant';

export interface Subtask {
  title: string;
  isCompleted: boolean;
  id: string;
}

export interface Todo {
  id: string;
  title: string;
  createdAt?: Date;
  status: (typeof STATUS_VALUE)[keyof typeof STATUS_VALUE];
  dueDate: Date;
  description: string;
  isImportant: boolean;
  isUrgent: boolean;
  // more detail info
  subtasks?: Subtask[];
  notes?: string;
  tags?: string[];
}
