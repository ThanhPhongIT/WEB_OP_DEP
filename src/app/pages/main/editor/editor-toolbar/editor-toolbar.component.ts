import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss'],
})
export class EditorToolbarComponent implements OnInit {
  imgSrc: string;
  constructor() {}

  ngOnInit(): void {}

  imgFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imgSrc = URL.createObjectURL(event.target.files[0]);
    }
  }
}
