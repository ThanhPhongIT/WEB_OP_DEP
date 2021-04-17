import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  NgModule,
  ViewContainerRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DraggableImageModule } from 'src/app/components/editor/draggable-image/draggable-image.component';
import { EditorToolbarModule } from 'src/app/components/editor/editor-toolbar/editor-toolbar.component';
import { EditorMainModule } from '../../../components/editor/editor-main/editor-main.component';
import { EditorWrapperComponent } from './editor-wrapper/editor-wrapper.component';

@Component({
  selector: 'app-editor',
  template: `<router-outlet></router-outlet>`,
})
export class EditorComponent {}

@NgModule({
  declarations: [EditorComponent, EditorWrapperComponent],
  imports: [
    CommonModule,
    DraggableImageModule,
    EditorMainModule,
    EditorToolbarModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditorComponent,
        children: [
          {
            path: '',
            component: EditorWrapperComponent,
          },
        ],
      },
    ]),
    DragDropModule,
  ],
})
export class EditorModule {}
