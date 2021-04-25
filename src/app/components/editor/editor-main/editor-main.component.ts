import { CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
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
  ViewChild
} from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { Observable, Subject } from 'rxjs';
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
  // @ViewChild('dragHandleCorner') dragHandleCorner: ElementRef;
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
  isDisable = new Subject();
  angle;
  boxHeight = 570;
  boxWidth = 320;
  isComplete = new Subject();
  constructor(private renderer: Renderer2, private zone: NgZone) {}

  ngOnInit(): void {
    // console.log(this.dataImageSelect);
  }

  ngAfterViewInit() {
    // this.iconMouseDown$
    //   .pipe(mergeMap(() => this.mousehold$))
    //   .subscribe((res: MouseEvent) => {
    // console.log(res);
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
      // dragHandle.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  }

  drop(ev) {
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
  resizeImg(e) {
    if (e.delta.x < 0 || e.delta.y < 0) {
      this.boxHeight -= 2;
      return (this.boxWidth -= 2);
    } else {
      this.boxHeight += 2;
      return (this.boxWidth += 2);
    }
  }
  async catchImg() {
    let comp = await this.isComplete.next(true);
    setTimeout(() => {
      htmlToImage
        .toBlob(this.phoneArea.nativeElement)
        .then((dataUrl) => {
          const reader = new FileReader();
          reader.readAsDataURL(dataUrl);
          reader.onload = () => {
            this.dataBs = reader.result as string;
            this.onUploadProduct.emit({preview:  this.dataBs, upload: dataUrl });
          };
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }, 500);
  }


  @ViewChild('resizeBox') resizeBox: ElementRef;
  @ViewChild('dragHandleCorner') dragHandleCorner: ElementRef;
  @ViewChild('dragHandleRight') dragHandleRight: ElementRef;
  @ViewChild('dragHandleBottom') dragHandleBottom: ElementRef;

  get resizeBoxElement(): HTMLElement {
    return this.resizeBox.nativeElement;
  }

  get dragHandleCornerElement(): HTMLElement {
    return this.dragHandleCorner.nativeElement;
  }

  get dragHandleRightElement(): HTMLElement {
    return this.dragHandleRight.nativeElement;
  }

  get dragHandleBottomElement(): HTMLElement {
    return this.dragHandleBottom.nativeElement;
  }

  dragMove2(dragHandle: HTMLElement, $event: CdkDragMove<any>) {
    this.zone.runOutsideAngular(() => {
      this.resize(dragHandle, this.img.nativeElement);
    });
  }

  resize(dragHandle: HTMLElement, target: HTMLElement) {
    const dragRect = dragHandle.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const width = dragRect.left - targetRect.left + dragRect.width;
    const height = dragRect.top - targetRect.top + dragRect.height;

    target.style.width = width + 'px';
    target.style.height = height + 'px';
    // dragHandle.style.transform = 'translate(0,0)';
    this.setAllHandleTransform();
  }
}

@NgModule({
  declarations: [EditorMainComponent],
  imports: [CommonModule, DragDropModule],
  exports: [EditorMainComponent],
})
export class EditorMainModule {}
