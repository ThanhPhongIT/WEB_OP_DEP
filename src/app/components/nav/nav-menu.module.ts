import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [NavMenuComponent],
  imports: [CommonModule],

  exports: [NavMenuComponent],
})
export class NavComponentModule {}
