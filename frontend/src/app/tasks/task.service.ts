import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get<any>('tasks');
    }

    public getById(id) {
        return this.http.get<any>(`tasks/${id}`);
    }

    public delete(task) {
        return this.http.delete<any>(`tasks/${task.id}`);
    }

    public add({ name, weight }) {
        return this.http.post<any>('tasks', { name, weight });
    }

    public update({ id, name, active, weight }) {
        return this.http.put<any>(`jobs/${id}`, { name, active, weight });
    }

}
