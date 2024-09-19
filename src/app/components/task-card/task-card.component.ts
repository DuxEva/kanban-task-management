import { Component, Input } from '@angular/core';
import { Task } from '../../models';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task!: Task;

  get completedSubtasksCount(): number {
    return this.task.subtasks.filter((subtask) => subtask.isCompleted).length;
  }
}
