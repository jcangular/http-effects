import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usersActions from '../actions/users.actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.loadUsers),
        // tap(data => console.log('effect tap', data)),
        mergeMap(() => this.userService.getUsers().pipe(
            map(userList => usersActions.loadUsersSuccess({ userList })),
            catchError(err => of(usersActions.loadUsersError({ payload: err })))
        ))
    ));

}
