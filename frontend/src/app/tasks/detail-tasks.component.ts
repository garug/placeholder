import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { TaskService } from './task.service';

@Component({
    selector: 'app-detail-task',
    templateUrl: './detail-tasks.component.html'
})
export class DetailTaskComponent implements OnInit {

    activeTask = {};

    constructor(
        private activatedRoute: ActivatedRoute,
        private taskService: TaskService,
        private router: Router,
        private message: ToastrService,
        private location: Location
    ) {

    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            if (params.has('id')) {
                this.taskService.getById(params.get('id')).subscribe(response => {
                    if (!response) {
                        this.router.navigate(['tasks']);
                        this.message.warning('task not found');
                    } else {
                        this.activeTask = response;
                    }
                });
            }
        });
    }

    goBack() {
        this.location.back();
    }
}
