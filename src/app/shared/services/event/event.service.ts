import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../auth/authentication.service';
import { Login } from '../../model/login.model';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url = environment.authenticate;
  profile: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(private authService : AuthenticationService) {
    let storedProp = localStorage.getItem('userId');
    if (storedProp)
        this.setId(JSON.parse(storedProp), false);
   }

  setId(data : any,  storeProp: boolean = false){
    this.profile.next(data);
  }

  getId(): Observable<any> {
      return this.profile;
  }

}
