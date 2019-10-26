import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  username: string;
  password: string;
  roles: Array<string>;

  constructor() { }

  public getAuthorization(): string {
    return `${this.username}:${this.password}`;
  }

  public setAuthorization({ username, password }) {
    this.username = username;
    this.password = password;
  }

  public setRoles(roles) {
    this.roles = roles;
  }
}
