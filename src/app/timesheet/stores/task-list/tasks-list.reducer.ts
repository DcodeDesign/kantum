import { createReducer, on } from '@ngrx/store';
import {initialTasksState} from '../../interfaces/task.interface';
import {updateAllTasks} from './task-list.actions';

export const tasksListReducer = createReducer(
  initialTasksState,
  on(updateAllTasks, (state, { tasks }) => ({
    ...state,
    tasks: tasks
  })),
);
