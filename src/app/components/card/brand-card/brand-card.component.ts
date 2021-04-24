import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-card',
  template: `<div class="card-brand">
              <div class="top">
                  <img [src]="img" alt="">
              </div>
              <div class="foot">
                  <div class="title">{{title}}</div>
                  <div class="price">
                      <div class="real">{{price | currency: "VND"}}</div>
                      <div class="discount">{{discountPrice | currency: "VND"}} </div>
                  </div>
              </div>
            </div>`,
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent implements OnInit {
  @Input() title;
  @Input() img;
  @Input() price;
  @Input() discountPrice;
  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [BrandCardComponent],
  imports: [CommonModule],
  exports: [BrandCardComponent]
})

export class BrandCardModule{}
