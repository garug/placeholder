import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../tasks/task.service';

@Component({
    selector: 'app-form-task',
    templateUrl: './form-tasks.component.html'
})
export class FormTaskComponent implements OnInit {

    activeTask: any;

    taskForm = new FormGroup({
        name: new FormControl('', Validators.required),
        weight: new FormControl('', Validators.required)
    });

    constructor(
        private router: Router,
        private location: Location,
        private message: ToastrService,
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            if (params.has('id')) {
                this.taskService.getById(params.get('id')).subscribe(response => {
                    if (!response) {
                        this.router.navigate(['jobs']);
                        this.message.warning('Task not found');
                    } else {
                        this.activeTask = response;
                        this.taskForm.patchValue(response);
                    }
                });
            }
        });
    }

    goBack() {
        this.location.back();
    }

    save() {
        if (this.taskForm.valid) {
            const { id } = this.activeTask;
            this.taskService.update({ id, ...this.taskForm.value })
                .subscribe(() => this.afterSaved());
        } else {
            this.taskForm.markAllAsTouched();
        }
    }

    afterSaved() {
        this.router.navigate(['tasks']);
        this.message.success('Saved Successfully');
    }
}
