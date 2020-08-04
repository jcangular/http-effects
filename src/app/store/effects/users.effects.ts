import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadUsers),
        // tap(data => console.log('effect tap', data)),
        mergeMap(() => this.userService.getUsers().pipe(
            map(userList => actions.loadUsersSuccess({ userList })),
            catchError(err => of(actions.loadUsersError({ payload: err })))
        ))
    ));

}
