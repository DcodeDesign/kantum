import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDate',
  pure: false
})
export class FilterByDatePipe implements PipeTransform {
  transform(tasks: any[], selectedDays: Date[]): any[] {
    if (!tasks || !selectedDays || selectedDays.length === 0) {
      return tasks;
    }

    return tasks.filter(task =>
      selectedDays.some(selectedDate =>
        new Date(task.date).toDateString() === selectedDate.toDateString()
      )
    );
  }
}
