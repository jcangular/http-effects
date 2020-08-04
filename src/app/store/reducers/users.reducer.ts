import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersError } from '../actions';
import { User } from '../../models/user.model';

export interface UserState {
    users: User[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const usersInitialState: UserState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
};

const usersReducerInner = createReducer(usersInitialState,

    on(loadUsers, state => ({ ...state, loading: true })),

    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        loaded: true,
        users: [...users]
    })),

    on(loadUsersError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),


);

export function usersReducer(state: UserState, action) {
    return usersReducerInner(state, action);
}