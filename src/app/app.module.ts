import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from './store/effects';
import { appReducers, devtoolsOptions } from './store/app.reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        UsersModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(EffectsArray),
        StoreDevtoolsModule.instrument(devtoolsOptions)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
