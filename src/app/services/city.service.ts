import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApiService } from "src/app/services/base-api.service";

@Injectable({
	providedIn: 'root'
})

export class CityService extends BaseApiService<any>{
	constructor(protected http: HttpClient){
		super(http, 'api/v2/city')
	}
}