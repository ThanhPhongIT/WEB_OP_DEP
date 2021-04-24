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
  NgZone,
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
  @ViewChild('phone') phoneArea: ElementRef;
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  @ViewChild('dragIconRotate') iconRotate: ElementRef;
  @ViewChild('image') img: ElementRef;
  @ViewChild('overlayDrag') overlayDrag: ElementRef;
  @ViewChild('dragHandleCorner') dragHandleCorner: ElementRef;
  // @ViewChild(AjScreenRecoderComponent) startRecordElm: AjScreenRecoderComponent;
  dataBs;
  isDropped = new Subject();
  dataUpLoad = "this is data upload";
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
  isDisable = new Subject();
  angle;
  constructor(private renderer: Renderer2,private zone: NgZone) {}

  ngOnInit(): void {
    console.log(this.dataImageSelect);
  }

  ngAfterViewInit() {
    this.firstRegister();
    // this.iconMouseDown$
    //   .pipe(mergeMap(() => this.mousehold$))
    //   .subscribe((res: MouseEvent) => {
    //     // console.log(res);
    //     console.log(res.clientY);
    //     let rol = 0;
    //   });
    this.setAllHandleTransform();
  }
  setAllHandleTransform() {
    const rect = this.img.nativeElement.getBoundingClientRect();
    this.setHandleTransform(this.dragHandleCorner.nativeElement, rect, 'both');
  }

  setHandleTransform(
    dragHandle: HTMLElement,
    targetRect: ClientRect | DOMRect,
    position: 'x' | 'y' | 'both'
  ) {
    const dragRect = dragHandle.getBoundingClientRect();
    const translateX = targetRect.width - dragRect.width;
    const translateY = targetRect.height - dragRect.height;

    if (position === 'x') {
      dragHandle.style.transform = `translate(${translateX}px, 0)`;
    }

    if (position === 'y') {
      dragHandle.style.transform = `translate(0, ${translateY}px)`;
    }

    if (position === 'both') {
      dragHandle.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
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
  dragMove(e) {
    console.log(e);
    const {
      left,
      top,
      width,
      height,
    } = this.img.nativeElement.getBoundingClientRect();
    let cen = { x: left + width / 2, y: top + height / 2 };
    this.angle = Math.atan2(e.event.clientY - cen.y, e.event.clientX - cen.x);
    // console.log(ev);
    // this.isDropped.next(true);
  }
  resizeImg(drag, e) {
    console.log(e);
    const dragRect = drag.getBoundingClientRect();
    const {
      targetRectLeft,
      targetRectTop,
      targetRectWidth,
      targetRectHeight,
    } = this.img.nativeElement.getBoundingClientRect();
    const width = dragRect.left - targetRectLeft + dragRect.width;
    const height = dragRect.top - targetRectTop + dragRect.height;

    this.renderer.setStyle(this.img.nativeElement, 'height', height);
    this.renderer.setStyle(this.img.nativeElement, 'height', width);
  }
  async catchImg() {
    htmlToImage
      .toBlob(this.phoneArea.nativeElement)
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
