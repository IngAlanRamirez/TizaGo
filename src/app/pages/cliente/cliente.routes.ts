import { Routes } from '@angular/router';

export const clienteRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./cliente-tabs/cliente-tabs.page').then((m) => m.ClienteTabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'businesses',
        loadChildren: () =>
          import('./businesses/businesses.routes').then(
            (m) => m.businessesRoutes,
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.routes').then((m) => m.ordersRoutes),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./cart/cart.routes').then((m) => m.cartRoutes),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
