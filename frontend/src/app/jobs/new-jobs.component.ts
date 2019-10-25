import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-new-jobs',
    templateUrl: './new-jobs.component.html'
})
export class JobsNewComponent implements OnInit {
    task$: Observable<any[]>;

    constructor(private taskService: TaskService) {
        
    }

    ngOnInit() {
        this.task$ = this.taskService.getAll();
    }
}
