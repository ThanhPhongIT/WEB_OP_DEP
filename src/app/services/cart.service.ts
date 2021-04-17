import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";

@Injectable({
	providedIn: "root"
})
export class CartService extends BaseApiService<any> {
	constructor(protected http : HttpClient){
		super(http, 'api/shopCartInfo-v1');
	}

}