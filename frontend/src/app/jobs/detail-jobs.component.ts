import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobService } from './job.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-detail-job',
    templateUrl: './detail-jobs.component.html'
})
export class DetailJobComponent implements OnInit {

    activeJob = {};

    constructor(
        private activatedRoute: ActivatedRoute,
        private jobService: JobService,
        private router: Router,
        private message: ToastrService,
        private location: Location
    ) {

    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            if (params.has('id')) {
                this.jobService.getById(params.get('id')).subscribe(response => {
                    if (!response) {
                        this.router.navigate(['jobs']);
                        this.message.warning('Job not found');
                    } else {
                        this.activeJob = response;
                    }
                });
            }
        });
    }

    goBack() {
        this.location.back();
    }
}
