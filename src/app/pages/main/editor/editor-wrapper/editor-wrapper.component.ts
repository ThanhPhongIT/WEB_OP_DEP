import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DraggableImageModule } from 'src/app/components/editor/draggable-image/draggable-image.component';
import { EditorMainModule } from 'src/app/components/editor/editor-main/editor-main.component';
import { EditorToolbarModule } from 'src/app/components/editor/editor-toolbar/editor-toolbar.component';
import { ConfirmComponent } from '../confirm/confirm.component';
@Component({
  selector: 'app-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss'],
})
export class EditorWrapperComponent implements OnInit {
  private imageLink: string;
  imgBase64;
  userImg;
  constructor(
    public dialogRef: MatDialogRef<EditorWrapperComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    
  }
  
  

  openDialogConfirm(image): void {
    const dialogRef = this.dialog.open( ConfirmComponent, {
      maxWidth: '50vw',
      maxHeight: '80vh',
      height: '100%',
      width: '100%',
      data:  {data: this.data, img: image, imgUser: this.userImg},
    });
  }

  chooseImage(ev) {
    console.log(ev);
    // File Preview
    // console.log(this.imageLink, reader.readAsDataURL(ev));
  }

  getUserImg(event){
    this.userImg = event;
  }

  upLoadData(ev) {
    this.openDialogConfirm(ev);
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
