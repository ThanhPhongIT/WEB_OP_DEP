import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { APIInterceptor } from './utils/interceptor/api.interceptor';
import { WindowService } from './services/window.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase';
import { LoginService } from './services/login.service';
import { AngularFireModule } from '@angular/fire';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from './services/toast.service';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    BrowserModule, 
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule,
    WindowService,
    LoginService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
