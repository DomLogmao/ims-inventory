import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Login } from 'src/app/shared/model/login.model';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { EventService } from 'src/app/shared/services/event/event.service';
import { PouchDBService } from 'src/app/shared/services/pouchdb/pouchdb.service';
import { Select, Store } from '@ngxs/store';
import { UserState } from 'src/app/shared/state/user/user.state';
import { Observable } from 'rxjs';
import { SetUser } from 'src/app/shared/state/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForms: UntypedFormGroup;
  login = new Login();
  hide = true;
  userOrPasswordNotFoundErr = false;
  // Reads the name of the state from the state class
  @Select(UserState) user$: Observable<any[]>;
  constructor(
    private route: Router,
    private fb: UntypedFormBuilder,
    private loginService: LoginService,
    private userService: UserService,
    private eventService: EventService,
    private pouchDBService: PouchDBService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createForms();
    this.createTempUser();
  }

  //REMOVE IF BACKEND IS LIVE
  createTempUser() {
    //SET USER CREDENTIALS
    this.userService.getUserCreds().then((data) => {
      this.pouchDBService.addDB({
        _id: 'login',
        data,
      });
    });
    //SET USER DETAILS
    this.userService.getUserDetails().then((data) => {
      this.pouchDBService.addDB({
        _id: 'details',
        data,
      });
    });
  }

  createForms() {
    this.loginForms = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required]],
    });
  }

  loginUser() {
    console.log(this.login);
    // this.route.navigateByUrl("main");
    if (this.loginForms.valid) {
      const user = this.loginForms.controls['username'].value;
      const password = this.loginForms.controls['password'].value;
      this.pouchDBService.fetchDB('login').then((data: any) => {
        const users = data && data.data ? data.data : null;
        console.log('users', users);
        console.log('username', user);
        console.log('password', password);
        const isLogin = users.filter(
          (x: any) => x.username === user && x.password === password
        );

        console.log('ISLOGIN', isLogin);
        if (isLogin && isLogin.length > 0) {
          localStorage.setItem('userLogin', JSON.stringify(isLogin));
          this.route.navigateByUrl('main');

          this.setUserDetails(isLogin);
        }
      });
      // this.loginService.login(this.login).then((data: any) => {
      //   localStorage.setItem('accessToken', data['token']);
      //   this.userService.getUserByUsername(this.loginForms.value.username).subscribe((data: any) => {
      //     localStorage.setItem('userId', data.userId);
      //     localStorage.setItem('role', data.roles[0]);
      //     this.eventService.setId(data.userId);
      //     this.route.navigateByUrl("main");
      //   });
      // },
      // err => {
      //   if(err.status === 404) {
      //     this.userOrPasswordNotFoundErr = true;
      //   }
      // });
    }
  }

  setUserDetails(data: any) {
    //FETCH CURRENT PRODUCTS
    this.pouchDBService.fetchDB('details').then((details: any) => {

      const userDetails = details && details.data ? details.data : null;

      const isDetails = userDetails.filter(
        (x: any) => x.username === data[0].username
      )[0];


      this.store.dispatch(
        new SetUser({
          isDetails,
        })
      );
    });
  }
}
