import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { JobService } from './job.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-list-jobs',
    templateUrl: './list-jobs.component.html'
})
export class JobsComponent implements OnInit {
    items: Array<any> = [];

    constructor(
        private router: Router,
        private credentials: UserService,
        private jobService: JobService,
        private message: ToastrService
    ) { }

    ngOnInit() {
        this.jobService.getAll().subscribe(r => this.items = r);
    }

    isAuthorized(role) {
        return this.credentials.isAuthorized(role);
    }

    newJob() {
        this.router.navigate(['jobs/new']);
    }

    delete(job) {
        this.jobService.delete(job).subscribe(r => {
            this.message.success('Deleted Successfully');
            const i = this.items.indexOf(job);
            this.items.splice(i, 1);
        });
    }
}
