import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register-type/register-type.page').then(
        (m) => m.RegisterTypePage,
      ),
  },
  {
    path: 'register-cliente',
    loadComponent: () =>
      import('./pages/auth/register-cliente/register-cliente.page').then(
        (m) => m.RegisterClientePage,
      ),
  },
  {
    path: 'register-negocio',
    loadComponent: () =>
      import('./pages/auth/register-negocio/register-negocio.page').then(
        (m) => m.RegisterNegocioPage,
      ),
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
