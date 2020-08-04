import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { loadUsers } from '../../store/actions';
import { ErrorRequest } from '../../store/reducers/index';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styles: [
    ]
})
export class ListComponent implements OnInit, OnDestroy {

    users: User[] = [];
    usersSubs: Subscription;
    loading: boolean;
    error: ErrorRequest;

    constructor(
        private store: Store<AppState>
    ) {
        this.loading = false;
    }

    ngOnInit(): void {
        this.usersSubs = this.store.select('users').subscribe(({ userList, loading, error }) => {
            this.users = userList;
            this.loading = loading;
            this.error = error;
        });
        this.store.dispatch(loadUsers());
    }

    ngOnDestroy(): void {
        console.log('ListComponent: ngOnDestroy');
        this.usersSubs.unsubscribe();
    }

}
