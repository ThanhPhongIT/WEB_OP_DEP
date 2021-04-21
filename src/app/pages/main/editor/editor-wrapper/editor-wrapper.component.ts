import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DraggableImageModule } from 'src/app/components/editor/draggable-image/draggable-image.component';
import { EditorMainModule } from 'src/app/components/editor/editor-main/editor-main.component';
import { EditorToolbarModule } from 'src/app/components/editor/editor-toolbar/editor-toolbar.component';
import { PhoneType } from 'src/app/models/phone-model.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss'],
})
export class EditorWrapperComponent implements OnInit {
  private imageLink: string;
  imgBase64;
  constructor(
    private productCategoryService: ProductCategoryService,
    public dialogRef: MatDialogRef<EditorWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.productCategoryService
      .getListProductCategory(PhoneType.Apple)
      .subscribe((res) => {
        console.log(res);
      });
  }
  ev;
  chooseImage(ev) {
    console.log(ev);
    // File Preview
    // console.log(this.imageLink, reader.readAsDataURL(ev));
  }
}

@NgModule({
  declarations: [EditorWrapperComponent],
  imports: [
    CommonModule,
    DraggableImageModule,
    EditorMainModule,
    MatIconModule,
    EditorToolbarModule,
    DragDropModule,
  ],
  exports: [EditorWrapperComponent],
})
export class EditorWrapperComponentModule {}
