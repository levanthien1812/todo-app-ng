export const STATUS_VALUE = {
  NOT_STARTED: 'not-started',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
};

export type StatusOption = {
  value: string;
  label: string;
};

export const STATUS_OPTIONS: StatusOption[] = [
  { value: STATUS_VALUE.NOT_STARTED, label: 'Not Started' },
  { value: STATUS_VALUE.IN_PROGRESS, label: 'In Progress' },
  { value: STATUS_VALUE.DONE, label: 'Done' },
];

export const ALLOWED_MAXIMUM_TAGS = 10;
