import { ErrorHandler, Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Route, Router } from '@angular/router'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private route: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this.authenticationService.getToken()

        if (token) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) =>{
              if(event instanceof HttpResponse){
                if(event.status == 404){
                  this.authenticationService.logout();
                }
                if(event.status == 401){
                  this.authenticationService.logout();
                }
                if(event.status == 400){
                  this.authenticationService.logout();
                }
                if(event.status == 500){
                  this.authenticationService.logout();
                }
              }

              return event;
            })
          )
    }

}
