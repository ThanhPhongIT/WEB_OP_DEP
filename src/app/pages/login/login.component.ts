import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import firebase from 'firebase';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { WindowService } from 'src/app/services/window.service';
import { phoneNumberValidator } from '../../utils/directives/validatorPhone.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  data = {
    type: {
      phone: 'phone',
    },
  };
  constructor(
    private win: WindowService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private localStorage: LocalStorageService
  ) // private toastService: ToastService
  {}
  windowRef: any;
  form = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.required,
      phoneNumberValidator(/((09|03|07|08|05)+([0-9]{8})\b)/g),
    ]),
  });
  formotp = new FormGroup({
    otp: new FormControl(''),
  });
  isSend = true;
  verificationCode: string;
  checkPhone = true;
  checkOtp = false;
  reSend = false;

  user: any;
  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );
    this.windowRef.recaptchaVerifier.render();
    this.form.get('phoneNumber').valueChanges.subscribe((val) => {
      const regexPhone = new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g);
      if (regexPhone.test(val)) {
        this.checkPhone = false;
      } else {
        this.checkPhone = true;
      }
    });
  }

  sendLoginCode() {

    let phone = '+84' + this.form.value.phoneNumber.replace('0', '');

    this.localStorage.set('phone', phone);
    const appVerifier = this.windowRef.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phone, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
        this.isSend = false;
        setTimeout(() => {
          this.reSend = true;
        }, 80000);
      })
      .catch((error) => {
        console.log('lỗi', error);
      });
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.formotp.value.otp)
      .then((result) => {
        this.user = result.user;
        this.localStorage.set('token', result.user.za);
        this.dialogRef.close();
      })
      .catch((error) => {
        console.log(error);
        this.checkOtp = true;
      });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule],
})
export class LoginComponentModule {}
