import { createReducer, on } from '@ngrx/store';
import {initialTaskTemplateListState} from '../../interfaces/task.interface';
import {updateAllTaskTemplateList} from './task-template-list.actions';

export const taskTemplateListReducer = createReducer(
  initialTaskTemplateListState,
  on(updateAllTaskTemplateList, (state, { taskTemplateList }) => ({
    ...state,
    taskTemplateList: taskTemplateList
  })),
);
