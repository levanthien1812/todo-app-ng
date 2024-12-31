import { STATUS_VALUE } from '../constants/constant';

export interface TodoFilter {
  startDate: Date;
  endDate: Date;
  searchString: string;
  status: (typeof STATUS_VALUE)[keyof typeof STATUS_VALUE];
  isImportant: boolean;
  isUrgent: boolean;
}
