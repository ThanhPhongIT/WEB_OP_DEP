import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, val) {
    return localStorage.setItem(key, JSON.stringify(val));
  }

  clear() {
    return localStorage.clear();
  }
}
