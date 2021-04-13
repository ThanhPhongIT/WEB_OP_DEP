import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { retry } from "rxjs/operators";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
	constructor(){}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		var token = localStorage.getItem("assets_token");
		const request = req.clone({
			url: `${environment.API_URL}/${req.url}`,
			setHeaders:{
				"Content-Type": "application/json",
			}
		})
		return next.handle(request).pipe(retry(1));
	}
} {

}