import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetUser, SetUser } from './user.actions';
import { UserLogin, UserStateModel } from './user.model';

@State<UserStateModel>({
  name: 'user',
  defaults: { userDetails: [], userRole: [] },
})
@Injectable()
export class UserState {
  constructor() {}

  @Selector()
  static selectStateData(state: UserStateModel) {
    return state.userDetails;
  }
  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, { userData }: SetUser) {
    const state = ctx.getState();
    console.log("STATE", userData);

    ctx.setState({
      ...state,
      userDetails: userData.isDetails,
    });
  }

  @Action(GetUser)
  getUser(ctx: StateContext<UserLogin>, action: SetUser) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
    });
  }
}
