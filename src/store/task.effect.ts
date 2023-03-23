import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RxDocument } from 'rxdb';
import { map, switchMap } from 'rxjs/operators';
import { DbService } from '../tasks/db.service';
import * as TaskActions from './task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() => this.dbService.getTasksCollection()),
      switchMap(
        (tasksCollection) =>
          tasksCollection.tasks.find({
            selector: {
              title: '**',
            },
          }).$
      ),
      map((tasks) => TaskActions.loadTasksSuccess({ tasks }))
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      switchMap(({ task }) =>
        this.dbService.getTasksCollection().then((tasksCollection) =>
          tasksCollection.tasks
            .insert({
              ...task,
              id: Date.now().toString(),
            })
            .then((document) => document.toJSON())
        )
      ),
      map((task) => TaskActions.addTaskSuccess({ task }))
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap(({ task }) =>
        this.dbService
          .getTasksCollection()
          .then((tasksCollection) => tasksCollection.tasks.upsert(task))
          .then((document) => document.toJSON())
      ),
      map((task) => TaskActions.updateTaskSuccess({ task } as any))
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      switchMap(({ task }) =>
        this.dbService
          .getTasksCollection()
          .then((tasksCollection) =>
            tasksCollection.tasks
              .upsert({ id: task.id, _deleted: true })
              .then((document) => document.toJSON())
          )
      ),
      map((task) => TaskActions.deleteTaskSuccess({ id: task.id }))
    )
  );

  constructor(private actions$: Actions, private dbService: DbService) {}
}
