import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: [
    ]
})
export class NavbarComponent implements OnInit {

    // @ViewChild('txtInput') txtInput: ElementRef<HTMLInputElement>;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    gotoUser(id: string): void {
        if (!id) {
            return;
        }
        this.router.navigate(['user', id]);

    }

}
