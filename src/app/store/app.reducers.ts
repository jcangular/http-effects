import { ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsOptions } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';


import * as reducers from './reducers';

export interface AppState {
    users: reducers.UsersState;
    user: reducers.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
    users: reducers.usersReducer,
    user: reducers.userReducer
};

export const devtoolsOptions: StoreDevtoolsOptions = {
    maxAge: 25,
    logOnly: environment.production,
};
