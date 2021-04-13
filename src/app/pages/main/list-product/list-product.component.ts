import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategoryModel } from '../../../models/product-category.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  listCategory: ProductCategoryModel[];
  listBrand = [{
    title: 'Apple',
    img: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202009161127'
  },
  {
    title: 'Apple',
    img: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202009161127'
  },
  {
    title: 'Apple',
    img: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202009161127'
  }];

  title = "Apple";

  category_id : number;

  constructor( private productCategoryService: ProductCategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.category_id = this.route.snapshot.params.id;
    this.getListProductCategory(this.category_id);
  }

  getListProductCategory(id){
    this.productCategoryService.getListProductCategory(id).subscribe((res:any)=>{
      this.listCategory = res;
    })
  }

}
