import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  // @ts-ignore
  @ViewChild('taskList') table: MatTable<any>;
  project: string = '';
  task: string = '';
  description: string = '';
  salesOrderItem: string = '';
  hours: number = 0;
  tasks: any[] = [];
  taskTemplates: any[] = [];  // Liste des modèles de tâches
  displayedColumns: string[] = ['project', 'task', 'description', 'hours', 'actions'];
  displayedColumnsBis: string[] = ['project', 'task', 'description', 'hours', 'actions'];

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleSelectAll(event: any) {
    const checked = event.checked;
    this.taskTemplates.forEach(template => template.selected = checked);
  }

  addTask(): void {
    if (this.project && this.task && this.description && this.salesOrderItem && this.hours) {
      const newTask = {
        project: this.project,
        task: this.task,
        description: this.description,
        salesOrderItem: this.salesOrderItem,
        hours: this.hours,
      };
      this.tasks.push(newTask);
      this.table.renderRows();
      this.resetFields();
    }
  }

  saveAsTemplate(): void {
    if (this.project && this.task && this.description && this.salesOrderItem && this.hours) {
      const newTemplate = {
        project: this.project,
        task: this.task,
        description: this.description,
        salesOrderItem: this.salesOrderItem,
        hours: this.hours,
      };
      this.taskTemplates.push(newTemplate);
    }
  }

  loadTemplate(template: any): void {
    this.tasks.push(template);
    this.table.renderRows();
  }

  resetFields(): void {
    this.project = '';
    this.task = '';
    this.description = '';
    this.salesOrderItem = '';
    this.hours = 0;
  }

  deleteTask(taskToDelete: any): void {
    this.tasks = this.tasks.filter(task => task !== taskToDelete);
    this.table.renderRows();
  }

  onTemplateSelectionChange() {
    this.tasks = [...this.tasks, ...this.taskTemplates.filter(template => template.selected)];
    this.table.renderRows();
  }

  confirmTasks(): void {
    this.dialogRef.close(this.tasks);
  }
}
