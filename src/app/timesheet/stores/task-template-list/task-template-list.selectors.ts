import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskTemplateListState } from '../../interfaces/task.interface';

export const selectTaskTemplateListState = createFeatureSelector<TaskTemplateListState>('taskTemplateList');
export const selectAllTaskTemplateList = createSelector(selectTaskTemplateListState, (state) => state.taskTemplateList);
