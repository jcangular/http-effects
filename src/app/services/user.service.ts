import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interface de la respuesta del endpoint /api/users
interface ListUserResponse {
    data: User[];
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly URL: string = 'https://reqres.in/api';

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Obtiene el listado de usuarios.
     */
    getUsers(): Observable<User[]> {
        return this.http.get(`${this.URL}/users?per_page=6`)
            .pipe(map((resp: ListUserResponse) => resp.data));
    }
}
