import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register-type/register-type.page').then(
        (m) => m.RegisterTypePage,
      ),
  },
  {
    path: 'register-cliente',
    loadComponent: () =>
      import('./register-cliente/register-cliente.page').then(
        (m) => m.RegisterClientePage,
      ),
  },
  {
    path: 'register-negocio',
    loadComponent: () =>
      import('./register-negocio/register-negocio.page').then(
        (m) => m.RegisterNegocioPage,
      ),
  },
  {
    path: 'verify-account',
    loadComponent: () =>
      import('./verify-account/verify-account.page').then(
        (m) => m.VerifyAccountPage,
      ),
  },
];
