import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { APIInterceptor } from './utils/interceptor/api.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WindowService } from './services/window.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase';
import { LoginService } from './services/login.service';
import { AngularFireModule } from '@angular/fire';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule,
  ],
  providers: [
    WindowService,
    LoginService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
