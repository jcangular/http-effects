import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { loadUser } from '../../store/actions';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { ErrorRequest } from '../../store/reducers';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styles: [
    ]
})
export class UserComponent implements OnInit, OnDestroy {

    routerSubs: Subscription;
    userSubs: Subscription;
    user: User;
    loading: boolean;
    error: ErrorRequest;
    id: string;

    constructor(
        private router: ActivatedRoute,
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {

        this.userSubs = this.store.select('user').subscribe(({ user, loading, error }) => {
            this.user = user;
            this.loading = loading;
            this.error = error;
        });

        this.routerSubs = this.router.params.subscribe(({ id }) => {
            this.id = id;
            this.store.dispatch(loadUser({ id }));
        });
    }

    ngOnDestroy(): void {
        this.routerSubs.unsubscribe();
        this.userSubs.unsubscribe();
    }

}
