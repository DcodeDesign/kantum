import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ITask} from '../../interfaces/task.interface';
import {sum} from 'lodash';

@Component({
  selector: 'app-total-time-task',
  templateUrl: './total-time-tasks.component.html',
  styleUrl: './total-time-tasks.component.scss'
})
export class TotalTimeTasksComponent implements OnInit, OnChanges {
  @Input() tasks: ITask[] = [];
  @Input() date: Date = new Date();
  total: number = 0;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const filterTasksByDate = this.tasks.filter((task: ITask) => this.date.getTime() === task.date.getTime());

    this.total = filterTasksByDate.reduce((sum, task) => sum + Number(task.hours), 0);
  }
}
