import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from './task.service';

@Component({
    selector: 'app-list-tasks',
    templateUrl: './list-tasks.component.html'
})
export class TasksComponent implements OnInit {
    items: Array<any> = [];

    // params to pagination
    page = 1;
    pageSize = 5;

    constructor(
        private router: Router,
        private credentials: UserService,
        private taskService: TaskService,
        private message: ToastrService
    ) { }

    ngOnInit() {
        this.taskService.getAll().subscribe(r => this.items = r);
    }

    isAuthorized(role) {
        return this.credentials.isAuthorized(role);
    }

    newTask() {
        this.router.navigate(['tasks/new']);
    }

    delete(job) {
        this.taskService.delete(job).subscribe(r => {
            this.message.success('Deleted Successfully');
            const i = this.items.indexOf(job);
            this.items.splice(i, 1);
        });
    }
}
