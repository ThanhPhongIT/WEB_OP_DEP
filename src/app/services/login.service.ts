import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";

@Injectable()
export class LoginService extends BaseApiService<any>{
	constructor(protected http: HttpClient){
		super(http, 'api/login-phone-number');
	}
	
}