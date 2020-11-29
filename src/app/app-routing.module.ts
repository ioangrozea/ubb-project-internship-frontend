import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      }, {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      }, {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      }, {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      }, {
        path: 'positions',
        loadChildren: () => import('./positions/position.module').then(m => m.PositionModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
