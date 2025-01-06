import { INITIAL_TODOS } from '../data/dummy/todos';
import { Todo } from '../interfaces';

export const getTodoById = (id: number): Promise<Todo> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const todo = INITIAL_TODOS.find((item) => item.id === id);
      if (todo) {
        resolve(todo);
      } else {
        reject(new Error('Todo not found'));
      }
    }, 400);
  });
};
