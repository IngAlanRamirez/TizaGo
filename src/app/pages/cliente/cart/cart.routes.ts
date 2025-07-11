import { Routes } from '@angular/router';

export const cartRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./cart.page').then((m) => m.CartPage),
  },
  {
    path: 'confirmation',
    loadComponent: () =>
      import('./confirmation/confirmation.page').then(
        (m) => m.ConfirmationPage,
      ),
  },
];
