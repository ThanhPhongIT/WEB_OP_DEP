import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-draggable-image',
  templateUrl: './draggable-image.component.html',
  styleUrls: ['./draggable-image.component.scss'],
})
export class DraggableImageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  declarations: [DraggableImageComponent],
  imports: [CommonModule],
  exports: [DraggableImageComponent],
})
export class DraggableImageModule {}
