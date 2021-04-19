import { Routes } from '@angular/router';
import { EditorComponent } from 'src/app/pages/main/editor/editor.component';
import { CartComponent } from './cart/cart.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { MainComponent } from './main.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'detail',
        component: DetailProductComponent,
      },
      {
        path: 'editor',
        loadChildren: () =>
          import('./editor/editor.component').then((m) => m.EditorModule),
      },
      {
        path: 'home/:id',
        component: ListProductComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
