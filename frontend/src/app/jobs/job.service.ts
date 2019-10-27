import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get<any[]>('jobs');
    }

    public getById(id) {
        return this.http.get<any>(`jobs/${id}`);
    }

    public add({ name, active, parentJob, tasks }) {
        return this.http.post<any>('jobs', { name, active, parentJob, tasks });
    }

    public update({ id, name, active, parentJob, tasks }) {
        return this.http.put<any>(`jobs/${id}`, { name, active, parentJob, tasks });
    }

    public delete(job) {
        return this.http.delete<any>(`jobs/${job.id}`);
    }

}
