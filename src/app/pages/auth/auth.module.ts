import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { LayoutModule } from 'src/app/components/layout/layout.module';
import { AuthComponent } from './auth.component';
import { authRoutes } from './auth.routes';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [ ],
  //   bootstrap: [AppComponent],
})
export class AuthModule {}
