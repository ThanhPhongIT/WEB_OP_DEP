import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategoryModel } from '../../../models/product-category.model';

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
    private loaderService: LoaderService
  ) {
    
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.category_id = this.route.snapshot.params.id;
    this.title = this.route.snapshot.params.t;
    this.getListProductCategory(this.category_id);
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
