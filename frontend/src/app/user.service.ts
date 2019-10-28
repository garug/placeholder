import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  username: string;
  password: string;
  roles: Array<string>;
  authenticated: boolean;

  constructor(private http: HttpClient) {
    let credentials: any = localStorage.getItem('credentials');
    if (credentials !== null) {
      credentials = JSON.parse(credentials);
      this.username = credentials.username;
      this.password = credentials.password;
      this.login();
    }
  }

  public getAuthorization(): string {
    return `${this.username}:${this.password}`;
  }

  public setAuthorization({ username, password }) {
    localStorage.setItem('credentials', JSON.stringify({ username, password }));
    this.username = username;
    this.password = password;
  }

  public setRoles(roles) {
    this.roles = roles;
  }

  public isAuthorized(role) {
    return this.roles.some(e => e === role);
  }

  public login() {
    return this.http.get<any>('users/login')
      .pipe(
        map(response => {
          this.authenticated = true;
          const roles = response.authorities.map(a => a.authority);
          this.setRoles(roles);
        })
      );
  }

  public logout() {
    this.authenticated = false;
    localStorage.removeItem('credentials');
  }
}
