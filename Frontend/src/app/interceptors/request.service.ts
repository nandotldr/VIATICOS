import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('interceptor:', req, next);
    const reqClone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    });
    // reqClone.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return next.handle(reqClone).pipe(
      catchError(this.hanldeError)
    );
  }

  hanldeError(error: HttpErrorResponse) {
    console.log('An error happened');
    console.warn(error);
    return throwError('registered in logs');
  }
}
