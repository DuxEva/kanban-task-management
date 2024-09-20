import { Pipe, PipeTransform } from '@angular/core';
import { Subtask } from '../models';

@Pipe({
  name: 'filterSubtask',
})
export class FilterSubtaskPipe implements PipeTransform {
  transform(subtasks: Subtask[], filter: string): Subtask[] {
    if (!filter) {
      return subtasks;
    }

    return subtasks.filter((subtask) =>
      subtask.isCompleted === true
    );
  }
}
