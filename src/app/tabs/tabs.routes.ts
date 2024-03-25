import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthenticateGuard } from '../authenticate.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [AuthenticateGuard],
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'scan',
        canActivate: [AuthenticateGuard],
        loadComponent: () =>
          import('../scan/scan.page').then((m) => m.ScanPage),
      },
      {
        path: 'user',
        canActivate: [AuthenticateGuard],
        loadComponent: () =>
          import('../user/user.page').then((m) => m.UserPage),
      },
      {
        path: 'school',
        loadComponent: () => 
          import('../school/school.page').then((m) => m.SchoolPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },

  

  {
    path: 'login',
    loadComponent: () =>
      import('../login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../registration/registration.page').then((m) => m.RegisterPage),
  },
  
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
