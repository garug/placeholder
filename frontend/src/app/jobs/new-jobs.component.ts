import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TaskService } from '../tasks/task.service';
import { JobService } from './job.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Component({
    selector: 'app-new-jobs',
    templateUrl: './new-jobs.component.html'
})
export class JobsNewComponent implements OnInit {

    // subjects
    jobs$: Observable<any[]>;
    tasks$: Observable<any[]>;

    // Tasks in window
    tasks: Array<any> = [];
    tempTasks: Array<any> = [];

    // params to pagination
    taskPage = 1;
    pageSize = 10;

    closeResult: string;


    // Form to submit a job
    jobForm = new FormGroup({
        name: new FormControl('', Validators.required),
        parentJob: new FormControl(''),
        active: new FormControl('')
    });

    // form to submit a task
    taskForm = new FormGroup({
        name: new FormControl('', Validators.required),
        weight: new FormControl('', Validators.required)
    });

    constructor(
        private location: Location,
        private modalService: NgbModal,
        private jobService: JobService,
        private taskService: TaskService
    ) {

    }

    ngOnInit() {
        this.jobs$ = this.jobService.getAll();
        this.tasks$ = this.taskService.getAll();
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
        console.log(this.tempTasks);
    }

    newTask() {
        if (this.taskForm.valid) {
            this.taskService.add(this.taskForm.value)
                .subscribe(r => console.log(r));
        }
    }

    save() {

    }

    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
