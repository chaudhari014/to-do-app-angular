import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { id: 0, title: 'string', description: 'string', completed: false },
  ];
  // Create a bell (an observable) that can ring (emit events)
  private taskAddedSubject = new BehaviorSubject<void>(undefined);

  // Allow others to listen to the bell (observable)
  taskAdded$: Observable<void> = this.taskAddedSubject.asObservable();
  constructor() {}

  getTask(): Task[] {
    return this.tasks;
  }
  addTask(task: Task): void {
    this.tasks = [task, ...this.tasks];
    console.log(this.tasks);
    this.taskAddedSubject.next();
  }
  updateTask(task: Task): void {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = task;
    }
  }
  deleteTask(deleteTaskId: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== deleteTaskId);
  }
}
