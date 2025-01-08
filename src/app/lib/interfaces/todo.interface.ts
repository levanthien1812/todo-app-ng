import { STATUS_VALUE } from '../constants/constant';

export interface Todo {
  id: number;
  title: string;
  createdAt?: Date;
  status: (typeof STATUS_VALUE)[keyof typeof STATUS_VALUE];
  dueDate: Date;
  description: string;
  isImportant: boolean;
  isUrgent: boolean;
  // more detail info
  subtasks?: {
    title: string;
    isCompleted: boolean;
  }[];
  notes?: string[];
  tags?: string[];
}
