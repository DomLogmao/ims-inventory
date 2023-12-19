import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';

export const route: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
]

@NgModule({
  imports: [
    UserListComponent,RouterModule.forChild(route)],
  exports: [RouterModule],
  providers: [

  ],
  declarations: [
  ],
})

export class UserListModule { }
