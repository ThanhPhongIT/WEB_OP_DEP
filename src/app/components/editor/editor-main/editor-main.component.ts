import { DragDropModule, DragRef } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { EditorWrapperComponent } from 'src/app/pages/main/editor/editor-wrapper/editor-wrapper.component';
declare let html2canvas: any;
@Component({
  selector: 'app-editor-main',
  templateUrl: './editor-main.component.html',
  styleUrls: ['./editor-main.component.scss'],
})
export class EditorMainComponent implements OnInit, AfterViewInit {
  @Output() onUploadProduct = new EventEmitter();
  @ViewChild('phoneImage')
  phoneImg: ElementRef;

  @ContentChild('draggableImage', { static: false })
  draggableImage!: TemplateRef<any>;
  @Input() dataImageSelect;

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  @ViewChild('dragIconRotate') iconRotate: ElementRef;
  @ViewChild('image') img: ElementRef;
  @ViewChild('overlayDrag') overlayDrag: ElementRef;
  // @ViewChild(AjScreenRecoderComponent) startRecordElm: AjScreenRecoderComponent;
  dataBs;
  isDropped = new Subject();
  dataUpLoad;
  mouseup$: Observable<any>;
  mousedown$: Observable<any>;
  mousemove$: Observable<any>;
  mousehold$: Observable<any>;
  x: number;
  y: number;
  _sub: any;
  iconMouseDown$: Observable<any>;
  stopRotate = new Subject();
  defaultY = 115;
  currentRotateY = 0;
  currentRotate2 = 0;
  left;
  top;
  width;
  height;
  cen;
  angle;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    console.log(this.dataImageSelect);
  }

  ngAfterViewInit() {
    // this.iconMouseDown$
    //   .pipe(mergeMap(() => this.mousehold$))
    //   .subscribe((res: MouseEvent) => {
    //     // console.log(res);
    //     console.log(res.clientY);
    //     let rol = 0;
    //   });
  }
  firstRegister() {
    this.mousedown$ = fromEvent(this.overlayDrag.nativeElement, 'mousedown');
    this.mousedown$.subscribe((e) => {
      this.currentRotateY = e.y;
    });
    this.mousemove$ = fromEvent(this.overlayDrag.nativeElement, 'mousemove');
    this.mouseup$ = fromEvent(this.overlayDrag.nativeElement, 'mouseup');

    this.mouseup$.subscribe((e) => {
      this.currentRotateY = e.y;
      this.stopRotate.next(true);
      this.unsub();
      this.register();
    });

    // switchMap is extremely helpful
    // map source observable to inner observable. remember it as switch to new observable.
    this.mousehold$ = this.mousedown$.pipe(
      debounceTime(300),
      switchMap(() => this.mousemove$),
      takeUntil(this.stopRotate)
    );

    this._sub = this.mousehold$.subscribe((e: MouseEvent) => {
      e.preventDefault();
      const {
        left,
        top,
        width,
        height,
      } = this.img.nativeElement.getBoundingClientRect();
      // console.log(e);
      let cen = { x: left + width / 2, y: top + height / 2 };
      this.angle = Math.atan2(e.clientY - cen.y, e.clientX - cen.x);
      // console.log(angle);
      // this.renderer.setStyle(
      //   this.img.nativeElement,
      //   'transform',
      //   `rotate(${this.angle}rad)`
      // );
    });
    // switchMap is extremely helpful
    // map source observable to inner observable. remember it as switch to new observable.
    // this.mousehold$ = this.mousedown$
    //   .switchMap(() => this.mousemove$)
    //   .takeUntil(this.mouseup$);
    // this.mousedown$.subscribe((e) => {
    //   this.stopRotate.next();
    // });

    // this.mouseup$.subscribe((e) => {
    //   this.stopRotate.next(true);
    //   this.currentRotate = e.clientY;
    // });

    // this.mousehold$.subscribe((res) => {
    //   console.log(res);
    // });
  }
  unsub() {
    if (this._sub) {
      this._sub.unsubscribe();
      this.stopRotate.next(true);
    }
  }
  register() {
    this.mousehold$ = this.mousedown$.pipe(
      switchMap(() => this.mousemove$),
      takeUntil(this.stopRotate)
    );

    this._sub = this.mousehold$.subscribe((e) => {
      e.preventDefault();
      const {
        left,
        top,
        width,
        height,
      } = this.img.nativeElement.getBoundingClientRect();
      let cen = { x: left + width / 2, y: top + height / 2 };
      this.angle = Math.atan2(e.clientY - cen.y, e.clientX - cen.x);
      // console.log(angle);

      // this.renderer.setStyle(
      //   this.img.nativeElement,
      //   'transform',
      //   `rotate(${this.angle}rad)`
      // );
    });
  }

  resgiterEvent() {
    // switchMap is extremely helpful
    // map source observable to inner observable. remember it as switch to new observable.
    (this.mousehold$ as any) = this.mousedown$
      .pipe(
        switchMap(() => this.mousemove$),
        takeUntil(this.mouseup$)
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
  drop(ev) {
    console.log(ev);

    // console.log(ev);
    // this.isDropped.next(true);
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

  uploadProduct() {
    this.onUploadProduct.emit(this.dataUpLoad);
  }
}

@NgModule({
  declarations: [EditorMainComponent],
  imports: [CommonModule, DragDropModule],
  exports: [EditorMainComponent],
})
export class EditorMainModule {}
