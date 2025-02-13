import {Component, Inject, OnInit, signal, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import * as uuid from 'short-uuid';
import {Store} from '@ngrx/store';
import {updateAllTaskTemplateList} from '../../stores/task-template-list/task-template-list.actions';
import {selectAllNotes} from '../../../shared/modules/notes/stores/note/note.selectors';
import {selectAllTaskTemplateList} from '../../stores/task-template-list/task-template-list.selectors';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent implements OnInit {
  // @ts-ignore
  @ViewChild('taskList') table: MatTable<any>;
  // @ts-ignore
  @ViewChild('taskTemplate') tableTemplate: MatTable<any[]>;

  project: string = '';
  task: string = '';
  description: string = '';
  salesOrderItem: string = '';
  hours: number | null = null;
  tasks: any[] = [];
  taskTemplates: any[] = [];
  displayedColumns: string[] = ['project', 'task', 'description', 'hours', 'actions'];
  displayedColumnsFooter: string[] = ['project', 'task', 'description', 'hours', 'actions'];
  taskTemplatesTemp: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectAllTaskTemplateList).subscribe(templates => {
      this.taskTemplates = this.taskTemplatesTemp = templates;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTask(): void {
    if (this.project && this.task && this.description && this.salesOrderItem && this.hours) {
      const newTask = {
        id: uuid.generate(),
        project: this.project,
        task: this.task,
        description: this.description,
        salesOrderItem: this.salesOrderItem,
        hours: this.hours,
      };
      this.tasks.push(newTask);
      this.table?.renderRows();

    }
  }

  saveAsTemplate(): void {
    if (this.project && this.task && this.description && this.salesOrderItem && this.hours) {
      const newTemplate = {
        id: uuid.generate(),
        project: this.project,
        task: this.task,
        description: this.description,
        salesOrderItem: this.salesOrderItem,
        hours: this.hours,
      };
      this.taskTemplates = [...this.taskTemplates, newTemplate];
      this.taskTemplatesTemp = [...this.taskTemplates, newTemplate];
      this.store.dispatch(updateAllTaskTemplateList({taskTemplateList: this.taskTemplates }));
      this.tableTemplate?.renderRows();
    }
  }

  deleteTemplate(id: string) {
    this.taskTemplates = this.taskTemplates.filter(template => template.id !== id);
    this.store.dispatch(updateAllTaskTemplateList({taskTemplateList: this.taskTemplates }));
    this.tableTemplate?.renderRows();
  }

  loadTemplate(template: any): void {
    const filterTask = this.taskTemplatesTemp.find(temp => temp.id === template.id);
    this.tasks.push({ ...filterTask, id: uuid.generate() });
    this.table?.renderRows();
  }

  resetFields(): void {
    this.project = '';
    this.task = '';
    this.description = '';
    this.salesOrderItem = '';
    this.hours = null;
  }

  deleteTask(taskToDelete: any): void {
    this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id);
    this.table?.renderRows();
  }

  confirmTasks(): void {
    this.dialogRef.close(this.tasks);
  }

  getTotalHours() {
    return this.tasks?.reduce((sum, task) => sum + Number(task.hours), 0);
  }

  updateTemplate(template: any, key: string, value: Event) {
    this.taskTemplatesTemp = this.taskTemplatesTemp.map(temp =>
      temp.id === template.id ? { ...temp, [key]: value } : temp
    );
  }
}
