import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private credentials: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  

    const dupReq: HttpRequest<any> = req.clone({
      url: 'http://localhost:8081/api/' + req.url,
      setHeaders: {
        // Authorization: 'Basic ' + btoa(this.credentials.getAuthorization())
        Authorization: 'Basic ' + btoa("admin:admin")
      }
    });

    return next.handle(dupReq);
  }
}
