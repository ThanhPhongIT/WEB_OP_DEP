import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `<div class="banner" [style.backgroundColor]="'#ecf4ff'">
              <div class="container">
                <img src="assets/img/banner/slider1.jpg" alt="" />
              </div>
            </div>`,
})
export class BannerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

}

@NgModule({
  declarations: [BannerComponent],
  imports: [CommonModule],
  exports: [BannerComponent],
})
export class BannerModule {}
