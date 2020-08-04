import { createReducer, on, ActionReducer, Action } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersError } from '../actions';
import { User } from '../../models/user.model';

export interface ErrorRequest {
    url: string;
    name: string;
    message: string;
}
export interface UserState {
    userList: User[];
    loaded: boolean;
    loading: boolean;
    error: ErrorRequest;
}

export const usersInitialState: UserState = {
    userList: [],
    loaded: false,
    loading: false,
    error: null
};

const usersReducerInner = createReducer(usersInitialState,

    on(loadUsers, state => ({ ...state, loading: true })),

    on(loadUsersSuccess, (state, { userList }) => ({
        ...state,
        loading: false,
        loaded: true,
        userList: [...userList]
    })),

    on(loadUsersError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),


);

export function usersReducer(state: UserState, action) {
    return usersReducerInner(state, action);
}
