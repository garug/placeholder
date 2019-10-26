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

    public add({ name, weight }) {
        return this.http.post<any>('tasks', { name, weight });
    }

}
