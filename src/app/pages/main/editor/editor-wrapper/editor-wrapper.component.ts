import { Component, OnInit } from '@angular/core';
import { PhoneType } from 'src/app/models/phone-model.model';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss'],
})
export class EditorWrapperComponent implements OnInit {
  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.productCategoryService
      .getListProductCategory(PhoneType.Apple)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
