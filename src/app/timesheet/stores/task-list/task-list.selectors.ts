import { createSelector, createFeatureSelector } from '@ngrx/store';
import {TasksState} from '../../interfaces/task.interface';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');
export const selectAllTasks = createSelector(selectTasksState, (state) => state.tasks);
