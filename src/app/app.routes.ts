import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./pages/cliente/cliente.routes').then((m) => m.clienteRoutes),
  },
  // Mantener estas rutas por compatibilidad (opcional - se pueden remover después)
  {
    path: 'login',
    redirectTo: '/auth/login',
  },
  {
    path: 'register',
    redirectTo: '/auth/register',
  },
  {
    path: 'register-cliente',
    redirectTo: '/auth/register-cliente',
  },
  {
    path: 'register-negocio',
    redirectTo: '/auth/register-negocio',
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
