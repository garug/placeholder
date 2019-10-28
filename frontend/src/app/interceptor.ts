import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private credentials: UserService, private message: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const dupReq: HttpRequest<any> = req.clone({
      url: 'http://localhost:8081/api/' + req.url,
      setHeaders: {
        Authorization: 'Basic ' + btoa(this.credentials.getAuthorization())
      }
    });

    return next.handle(dupReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.message.error(error.error.message);
          return throwError(error);
        })
      );
  }
}
