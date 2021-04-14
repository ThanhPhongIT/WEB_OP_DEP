import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  NgModule,
  ViewContainerRef,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorMainComponent } from './editor-main/editor-main.component';

@Component({
  selector: 'app-editor',
  template: `<router-outlet></router-outlet>`,
})
export class EditorComponent implements AfterViewInit {
  constructor(private _viewContainerRef: ViewContainerRef) {}

  ngAfterViewInit() {}
}

@NgModule({
  declarations: [EditorComponent, EditorMainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditorComponent,
        children: [
          {
            path: '',
            component: EditorMainComponent,
          },
        ],
      },
    ]),
    DragDropModule,
  ],
})
export class EditorModule {}
