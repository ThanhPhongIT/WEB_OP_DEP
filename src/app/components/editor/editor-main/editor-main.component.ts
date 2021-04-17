import { CommonModule } from '@angular/common';
import { Component, ContentChild, NgModule, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-editor-main',
  templateUrl: './editor-main.component.html',
  styleUrls: ['./editor-main.component.scss']
})
export class EditorMainComponent implements OnInit {
  @ContentChild('draggableImage', { static: false }) draggableImage!: TemplateRef<any>;
 
  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [EditorMainComponent],
  imports: [CommonModule],
  exports: [EditorMainComponent]
})

export class EditorMainModule {}