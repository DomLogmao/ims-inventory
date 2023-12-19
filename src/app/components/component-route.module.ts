import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileChangePasswordComponent } from './user-profile-change-password/user-profile-change-password.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ErrorPageComponent } from '../shared/components/error-page/error-page.component';

export const componentRoute: Routes = [
  {
    //initial page
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'invoice',
        loadComponent: () =>
          import('./invoice/invoice.component').then((m) => m.InvoiceComponent),
      },
      {
        path: 'change-password',
        component: UserProfileChangePasswordComponent,
      },
      {
        path: 'user-registration',
        component: UserRegistrationComponent,
      },
      //Wild Card Route for 404 request
      { path: '**', pathMatch: 'full', component: ErrorPageComponent },
    ],
  },
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(componentRoute, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
  providers: [],
  declarations: [],
})
export class ComponentRoute {}
