import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TasksModule } from './tasks/tasks.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, TasksModule, FormsModule],
  template: `
    <app-tasks></app-tasks>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
