import { Routes } from '@angular/router';

export const businessesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./businesses.page').then((m) => m.BusinessesPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./business-detail/business-detail.page').then(
        (m) => m.BusinessDetailPage,
      ),
  },
];
