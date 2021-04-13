import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/localstorage.service';
@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanLoad, CanActivate {
  currentUrl: string;
  constructor(
    private localStorageService: LocalStorageService,
    public router: Router
  ) {}

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return;
  }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.localStorageService.get('access_token')) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
