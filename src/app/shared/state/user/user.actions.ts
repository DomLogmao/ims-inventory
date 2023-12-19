// import { Injectable } from '@angular/core';
// import { State, Action, StateContext } from '@ngxs/store';

import { UserLogin } from "./user.model";


export class SetUser {
  static readonly type = '[USER] SetUser';
  constructor(public userData: any) {}
}

export class GetUser {
  static readonly type = '[USER] GetUser';
  constructor(public userStore: UserLogin) {}
}
