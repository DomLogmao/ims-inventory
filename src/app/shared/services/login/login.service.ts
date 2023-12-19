import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../auth/authentication.service';
import { Login } from '../../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.authenticate;

  constructor(private authService : AuthenticationService) { }

  login(data: Login) {
    return this.authService.postHttp(this.url, data);
  }
}
