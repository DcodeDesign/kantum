export interface ITask {
  id?: string
  date: Date,
  project: string,
  task: string,
  description: string,
  salesOrderItem: string,
  hours: number
}

export interface TasksState {
  tasks: ITask[];
}

export interface AppStateTasks {
  tasks: ITask[];
}

export const initialTasksState: AppStateTasks = {
  tasks: []
};

export interface ITaskTemplateList extends ITask {
  id?: string
  date: Date,
  project: string,
  task: string,
  description: string,
  salesOrderItem: string,
  hours: number
}

export interface TaskTemplateListState {
  taskTemplateList: ITask[];
}

export interface AppStateTaskTemplateList {
  taskTemplateList: ITask[];
}

export const initialTaskTemplateListState: AppStateTaskTemplateList = {
  taskTemplateList: []
};

