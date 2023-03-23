import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { Store, select } from '@ngrx/store';
import { TaskState } from '../store/task.reducer';
import * as TaskActions from '../store/task.actions';
import { map, tap } from 'rxjs/operators';
import { EntityState } from '@ngrx/entity';

@Injectable()
export class TaskService {
  tasks$: Observable<Task[]>;
  taskState$: Observable<EntityState<Task>>;

  constructor(private store: Store<{ tasks: TaskState }>) {
    this.tasks$ = this.store.pipe(
      select('tasks', 'entities'),
      tap(console.log),
      map((entities) => Object.values(entities))
    );
    this.taskState$ = this.store.pipe(select('tasks'));
  }

  loadTasks() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  addTask(task: Task) {
    this.store.dispatch(TaskActions.addTask({ task }));
  }

  updateTask(task: Task) {
    this.store.dispatch(TaskActions.updateTask({ task }));
  }

  deleteTask(task: Task) {
    this.store.dispatch(TaskActions.deleteTask({ task }));
  }
}
