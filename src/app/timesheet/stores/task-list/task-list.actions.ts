import {createAction, props} from '@ngrx/store';
import {ITask} from '../../interfaces/task.interface';
import {Note} from '../../../shared/modules/notes/interfaces/note.interface';

export const loadTasksSuccess = createAction('[Tasks] Load Tasks Success', props<{ tasks: ITask[] }>());
export const updateAllTasks = createAction('[Tasks] Update All Tasks', props<{ tasks: ITask[] }>());
export const loadTasks = createAction('[Tasks] Load Tasks');
