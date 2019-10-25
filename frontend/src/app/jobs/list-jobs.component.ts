import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list-jobs',
    templateUrl: './list-jobs.component.html'
})
export class JobsComponent implements OnInit {
    items: Array<any>;

    ngOnInit() {
        this.items = [
            {
                id: 1,
                name: "Job1",
                active: true
            }
        ];
    }
}
