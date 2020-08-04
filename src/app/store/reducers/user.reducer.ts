import { createReducer, on } from '@ngrx/store';
import { loadUser, loadUserSuccess, loadUserError } from '../actions';
import { User } from '../../models/user.model';
import { ErrorRequest } from './users.reducer';


export interface UserState {
    id: string;
    user: User;
    loaded: boolean;
    loading: boolean;
    error: ErrorRequest;
}

export const userInitialState: UserState = {
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
};

const userReducerInner = createReducer(userInitialState,

    on(loadUser, (state, { id }) => ({
        ...state,
        loading: true,
        id
    })),

    on(loadUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        loaded: true,
        user: { ...user },
        error: null
    })),

    on(loadUserError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        user: null,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),


);

export function userReducer(state: UserState, action) {
    return userReducerInner(state, action);
}
