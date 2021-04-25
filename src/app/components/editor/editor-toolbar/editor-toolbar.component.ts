import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss'],
})
export class EditorToolbarComponent implements OnInit {
  @Output() onChooseImage = new EventEmitter();
  @Output() passUserImg = new EventEmitter();
  imgSrc: string;
  constructor() {}

  ngOnInit(): void {}

  imgFileSelected(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.passUserImg.emit(event.target.files[0]);
    reader.onload = () => {
      this.imgSrc = reader.result as string;
      this.onChooseImage.emit(this.imgSrc);
      // console.log(this.imgSrc);
    };
  }
}

@NgModule({
  declarations: [EditorToolbarComponent],
  imports: [CommonModule,MatTabsModule],
  exports: [EditorToolbarComponent],
})
export class EditorToolbarModule {}
