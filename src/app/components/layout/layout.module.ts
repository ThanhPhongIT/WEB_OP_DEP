import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.component';
import { HeaderModule } from '../header/header.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent, AuthLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    FooterModule
  ],

  exports: [MainLayoutComponent, AuthLayoutComponent],
})
export class LayoutModule {}
