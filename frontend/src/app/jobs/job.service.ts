import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get<any>('jobs');
    }

}
