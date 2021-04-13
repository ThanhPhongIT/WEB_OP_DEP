import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent implements OnInit {
  @Input() title;
  @Input() img;
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
