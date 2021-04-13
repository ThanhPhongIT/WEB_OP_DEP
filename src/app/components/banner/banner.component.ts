import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}

@NgModule({
  declarations: [BannerComponent],
  imports: [CommonModule,SwiperModule],
  exports: [BannerComponent]
})

export class BannerModule {}