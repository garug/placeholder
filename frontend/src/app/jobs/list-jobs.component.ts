import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    selector: 'app-list-jobs',
    templateUrl: './list-jobs.component.html'
})
export class JobsComponent implements OnInit {
    items: Array<any> = [];

    constructor(
        private router: Router,
        private credentials: UserService
    ) { }

    ngOnInit() {
        this.items = [
            {
                id: 1,
                name: "Job1",
                active: true
            }
        ];
    }

    isAuthorized(role) {
        return this.credentials.roles.some(e => e === role);
    }

    newJob() {
        this.router.navigate(['jobs/new']);
    }
}
