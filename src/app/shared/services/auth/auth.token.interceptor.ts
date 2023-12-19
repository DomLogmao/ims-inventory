import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthenticationService } from './authentication.service'
@Injectable({
  providedIn: 'root'
})
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // localStorage.setItem('access_token', this.auth.getToken())
    let cloneReq = req

    cloneReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    })

    return next.handle(cloneReq);

  }
}
