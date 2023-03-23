import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ task: Task }>()
);
export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: Task }>()
);
export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: Task }>()
);
export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ task: Task }>()
);
export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: string }>()
);
