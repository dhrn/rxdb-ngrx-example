import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../models/task';
import * as TaskActions from './task.actions';

export interface TaskState extends EntityState<Task> {}

export const taskAdapter = createEntityAdapter<Task>();

export const initialState: TaskState = taskAdapter.getInitialState();

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(tasks, state)
  ),
  on(TaskActions.addTaskSuccess, (state, { task }) =>
    taskAdapter.addOne(task, state)
  ),
  on(TaskActions.updateTaskSuccess, (state, { task }) =>
    taskAdapter.updateOne({ id: task.id, changes: task }, state)
  ),
  on(TaskActions.deleteTaskSuccess, (state, { id }) =>
    taskAdapter.removeOne(id, state)
  )
);
// Todo: test code bot
