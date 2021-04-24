import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.component';
import { HeaderModule } from '../header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    FooterModule
  ],

  exports: [MainLayoutComponent],
})
export class LayoutModule {}
