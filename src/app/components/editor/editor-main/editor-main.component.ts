import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  NgModule,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { capture, OutputType } from 'html-screen-capture-js';
import jsPDF from 'jspdf';
declare let html2canvas: any;
import * as htmlToImage from 'html-to-image';
@Component({
  selector: 'app-editor-main',
  templateUrl: './editor-main.component.html',
  styleUrls: ['./editor-main.component.scss'],
})
export class EditorMainComponent implements OnInit {
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
  constructor() {}

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
}

@NgModule({
  declarations: [EditorMainComponent],
  imports: [CommonModule, DragDropModule],
  exports: [EditorMainComponent],
})
export class EditorMainModule {}
