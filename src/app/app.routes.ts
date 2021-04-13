import { Routes } from '@angular/router';
import { AppGuard } from './utils/guards/app.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
    // canActivate: [AppGuard],
  },
  
];
