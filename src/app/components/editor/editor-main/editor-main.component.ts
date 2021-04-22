import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import { EditorWrapperComponent } from 'src/app/pages/main/editor/editor-wrapper/editor-wrapper.component';
declare let html2canvas: any;
@Component({
  selector: 'app-editor-main',
  templateUrl: './editor-main.component.html',
  styleUrls: ['./editor-main.component.scss'],
})
export class EditorMainComponent implements OnInit {
  @Output() onUploadProduct = new EventEmitter();
  @ViewChild('phoneImage')
  phoneImg: ElementRef;

  @ContentChild('draggableImage', { static: false })
  draggableImage!: TemplateRef<any>;
  @Input() dataImageSelect;

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  // @ViewChild(AjScreenRecoderComponent) startRecordElm: AjScreenRecoderComponent;
  dataBs;

  dataUpLoad;
  constructor(public dialogRef: MatDialogRef<EditorWrapperComponent>, private route: Router) {}

  ngOnInit(): void {
    console.log(this.dataImageSelect);
  }
  drop(ev) {
    console.log(ev);
  }

  async catchImg() {
    htmlToImage
      .toBlob(this.phoneImg.nativeElement)
      .then((dataUrl) => {
        console.log(dataUrl);
        const reader = new FileReader();
        reader.readAsDataURL(dataUrl);
        reader.onload = () => {
          this.dataBs = reader.result as string;
          // console.log(this.imgSrc);
        };
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  uploadProduct(){
    this.onUploadProduct.emit(this.dataUpLoad);
  }
}

@NgModule({
  declarations: [EditorMainComponent],
  imports: [CommonModule, DragDropModule],
  exports: [EditorMainComponent],
})
export class EditorMainModule {}
