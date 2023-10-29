// todo-list.component.ts

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.refreshTaskList();
    this.taskService.taskAdded$.subscribe(() => {
      // When the bell rings, refresh the task list
      this.refreshTaskList();
    });
  }

  refreshTaskList() {
    this.tasks = this.taskService.getTask();
    console.log(this.tasks, 'inside');
  }

  markAsCompleted(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
    this.refreshTaskList(); // Refresh the task list after marking as completed
  }

  startEditing(task: Task) {
    this.editingTask = { ...task };
  }

  saveEditedTask() {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask);
      this.editingTask = null;
      this.refreshTaskList(); // Refresh the task list after editing
    }
  }

  cancelEditing() {
    this.editingTask = null;
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
    this.refreshTaskList(); // Refresh the task list after deleting
  }
}
