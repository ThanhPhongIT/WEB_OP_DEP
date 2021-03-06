import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerModule } from 'src/app/components/banner/banner.component';
import { BrandCardModule } from 'src/app/components/card/brand-card/brand-card.component';
import { LayoutModule } from 'src/app/components/layout/layout.module';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditorWrapperComponentModule } from './editor/editor-wrapper/editor-wrapper.component';
import { RegexPhonePipeModule } from 'src/app/utils/pipes/regexPhone.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    CartComponent,
    ProfileComponent,
    ListProductComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
    LayoutModule,
    BannerModule,
    EditorWrapperComponentModule,
    BrandCardModule,
    MatDialogModule,
    RegexPhonePipeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class MainModule {}
