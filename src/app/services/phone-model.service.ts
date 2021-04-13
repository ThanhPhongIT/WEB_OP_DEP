import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PhoneModel } from "../models/phone-model.model";

@Injectable({
	providedIn: 'root'
})
export class PhoneModelService {
	constructor(private http: HttpClient){}
	getListPhoneModel(): Observable<PhoneModel>{
		return this.http.post('api/get-phone-model', '').pipe(map((data: any)=> data.data));
	}
}