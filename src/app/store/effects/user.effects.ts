import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadUser),
        mergeMap((action) => this.userService.getUserById(action.id).pipe(
            map(user => actions.loadUserSuccess({ user })),
            catchError(err => of(actions.loadUserError({ payload: err })))
        ))
    ));

}
