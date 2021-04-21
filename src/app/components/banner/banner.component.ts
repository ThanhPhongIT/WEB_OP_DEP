import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { SwiperModule } from 'swiper/angular';

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

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}

@NgModule({
  declarations: [BannerComponent],
  imports: [CommonModule, SwiperModule],
  exports: [BannerComponent],
})
export class BannerModule {}
