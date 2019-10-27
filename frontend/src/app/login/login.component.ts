import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    authError = false;

    constructor(
        private credentials: UserService,
        private http: HttpClient,
        private router: Router,
        private message: ToastrService
    ) {

    }
    login() {
        if (this.loginForm.valid) {
            this.credentials.setAuthorization(this.loginForm.value);
            this.credentials.login().subscribe(
                response => this.router.navigate(['/jobs']),
                error => this.authError = true);
        }
    }
}
