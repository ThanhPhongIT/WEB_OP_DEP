import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategoryModel } from '../../../models/product-category.model';
import {
  EditorWrapperComponent,
  EditorWrapperComponentModule,
} from '../editor/editor-wrapper/editor-wrapper.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  listCategory: ProductCategoryModel[];
  category_id: number;
  title: String;

  constructor(
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.category_id = this.route.snapshot.params.id;
    this.title = this.route.snapshot.params.t;
    this.getListProductCategory(this.category_id);
  }

  openDialog(image): void {
    const dialogRef = this.dialog.open(EditorWrapperComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { image },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  getListProductCategory(id) {
    this.productCategoryService
      .getListProductCategory(id)
      .subscribe((res: any) => {
        this.listCategory = res;
        this.loaderService.hide();
      });
  }
}
