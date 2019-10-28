import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../tasks/task.service';
import { JobService } from './job.service';

@Component({
    selector: 'app-new-jobs',
    templateUrl: './new-jobs.component.html'
})
export class JobsNewComponent implements OnInit {

    activeJob: any;

    // lists
    jobs: Array<any> = [];
    tasks: Array<any> = [];
    tempTasks: Array<any> = [];

    // params to pagination
    taskPage = 1;
    pageSize = 5;

    closeResult: string;

    // Form to submit a job
    jobForm = new FormGroup({
        name: new FormControl('', Validators.required),
        parentJob: new FormControl({}),
        active: new FormControl(true)
    });

    // form to submit a task
    taskForm = new FormGroup({
        name: new FormControl('', Validators.required),
        weight: new FormControl('', Validators.required)
    });

    constructor(
        private router: Router,
        private location: Location,
        private message: ToastrService,
        private modalService: NgbModal,
        private jobService: JobService,
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.jobService.getAll().subscribe(r => this.jobs = r);
        this.taskService.getAll().subscribe(r => {
            this.tasks = r;
            this.activatedRoute.paramMap.subscribe(params => {
                if (params.has('id')) {
                    this.jobService.getById(params.get('id')).subscribe(response => {
                        if (!response) {
                            this.router.navigate(['jobs']);
                            this.message.warning('Job not found');
                        } else {
                            this.activeJob = response;
                            response.tasks.forEach(task => {
                                this.tasks.find(e => e.id === task.task.id).previousSelected = true;
                            });
                            this.jobForm.patchValue(response);
                        }
                    });
                }
            });
        });

    }

    goBack() {
        this.location.back();
    }

    toggleTask(task) {
        if (this.tempTasks.indexOf(task) === -1) {
            this.tempTasks.push(task);
        } else {
            this.tempTasks.splice(task, 1);
        }
        task.selected = !task.selected;
    }

    newTask() {
        if (this.taskForm.valid) {
            this.taskService.add(this.taskForm.value)
                .subscribe(r => {
                    this.taskForm.reset();
                    this.tasks.push(r);
                    this.toggleTask(r);
                    this.tasks = this.tasks.sort((e1, e2) => e1.id - e2.id);
                });
        } else {
            this.taskForm.markAllAsTouched();
        }
    }

    haveSelected() {
        return this.tasks.some(e => e.previousSelected);
    }

    save() {
        if (this.jobForm.valid) {
            // Define tasks
            const tasks = this.tasks.filter(e => e.previousSelected);

            if (this.activeJob) {
                const { id } = this.activeJob;
                this.jobService.update({ id, ...this.jobForm.value, tasks })
                    .subscribe(() => this.afterSaved());
            } else {
                this.jobService.add({ ...this.jobForm.value, tasks })
                    .subscribe(() => this.afterSaved());
            }
        } else {
            this.jobForm.markAllAsTouched();
        }
    }

    afterSaved() {
        this.router.navigate(['jobs']);
        this.message.success('Saved Successfully');
    }

    open(content) {
        this.tasks.forEach(e => e.selected = e.previousSelected);
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(
                (result) => {
                    this.taskForm.reset();
                    this.taskPage = 1;
                    if (result === 'save') {
                        this.applyTasks();
                    }
                }
            );
    }

    applyTasks() {
        this.tempTasks.forEach(e => {
            const task = this.tasks.find(t => t.id === e.id);
            task.previousSelected = e.selected;
            e.selected = false;
        });
        this.tempTasks = [];
    }

    compareJob(c1, c2) {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }
}
