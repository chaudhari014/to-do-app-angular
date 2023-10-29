import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    completed: false,
  };

  constructor(private taskService: TaskService) {}

  addTask(event: Event) {
    event.preventDefault();
    if (this.task.title.trim() !== '' && this.task.description !== '') {
      this.task.id = new Date().getTime();
      console.log(this.task);
      this.taskService.addTask(this.task);
      this.task = { id: 0, title: '', description: '', completed: false };
    }
  }
}
