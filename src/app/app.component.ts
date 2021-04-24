import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  template: `<app-loader></app-loader>
            <router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'Ốp điện thoại đẹp';
}
