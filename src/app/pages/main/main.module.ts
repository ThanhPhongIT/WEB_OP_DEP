import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerModule } from 'src/app/components/banner/banner.component';
import { BrandCardModule } from 'src/app/components/card/brand-card/brand-card.component';
import { LayoutModule } from 'src/app/components/layout/layout.module';
import { ProductModule } from 'src/app/components/product/product.component';
import { CartComponent } from './cart/cart.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    CartComponent,
    ProfileComponent,
    DetailProductComponent,
    ListProductComponent,
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
