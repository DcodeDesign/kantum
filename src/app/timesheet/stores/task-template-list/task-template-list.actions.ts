import {createAction, props} from '@ngrx/store';
import {ITaskTemplateList} from '../../interfaces/task.interface';

export const loadTaskTemplateListSuccess = createAction('[TaskTemplateList] Load Tasks TaskTemplateList', props<{ taskTemplateList: ITaskTemplateList[] }>());
export const updateAllTaskTemplateList = createAction('[TaskTemplateList] Update All TaskTemplateList', props<{ taskTemplateList: ITaskTemplateList[] }>());
export const loadTaskTemplateList = createAction('[TaskTemplateList] Load TaskTemplateList');
