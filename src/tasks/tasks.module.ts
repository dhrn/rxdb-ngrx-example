import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { initialState, taskReducer } from '../store/task.reducer';
import { TaskService } from './task.service';
import { DbService } from './db.service';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from '../store/task.effect';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forRoot(
      { tasks: taskReducer },
      {
        initialState: {
          tasks: initialState,
        },
      }
    ),
    EffectsModule.forRoot([TaskEffects]),
  ],
  declarations: [TasksComponent],
  providers: [TaskService, DbService],
  exports: [TasksComponent],
})
export class TasksModule {}
