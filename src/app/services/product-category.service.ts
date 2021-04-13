import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class ProductCategoryService{
	constructor(private http: HttpClient){}

	getListProductCategory(id){
		return this.http.post(`api/get-product?category_id=${id}`, '').pipe(map((data: any)=>data.data));
	}
}