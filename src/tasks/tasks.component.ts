import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.loadTasks();
    this.taskService.tasks$.subscribe((tasks) => (this.tasks = tasks));
  }

  addTask() {
    if (this.newTaskTitle.trim() === '') {
      return;
    }
    const newTask = {
      id: '',
      title: this.newTaskTitle,
      description: '',
      completed: false,
    } as Task;
    this.taskService.addTask(newTask);
    this.newTaskTitle = '';
  }

  updateTask(task: Task, event: any) {
    this.taskService.updateTask({
      ...task,
      completed: !!event?.target?.checked,
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }
}
