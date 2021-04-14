import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from 'src/app/components/layout/layout.module';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { HomeComponent } from './home/home.component';
import { BannerModule } from 'src/app/components/banner/banner.component';
import { ProductModule } from 'src/app/components/product/product.component';
import { BrandCardModule } from 'src/app/components/card/brand-card/brand-card.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { LoginComponent } from '../auth/login/login.component';
import { EditorMainComponent } from './editor/editor-main/editor-main.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    CartComponent,
    ProfileComponent,
    DetailProductComponent,
    ListProductComponent,
    EditorMainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
    LayoutModule,
    BannerModule,
    ProductModule,
    BrandCardModule,
  ],
  providers: [],
})
export class MainModule {}
