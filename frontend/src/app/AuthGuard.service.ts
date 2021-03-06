
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private userService: UserService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.authenticated) {
        return true;
    }

    this._router.navigate(['/']);
    return false;
  }
}