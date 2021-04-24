import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/services/window.service';
import firebase from 'firebase';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';

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
    private loginService: LoginService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private localStorage: LocalStorageService,
    // private toastService: ToastService
  ) {}
  windowRef: any;
  form = new FormGroup({
    phoneNumber: new FormControl(''),
  });
  formotp = new FormGroup({
    otp: new FormControl(''),
  });
  isSend = true;
  verificationCode: string;

  user: any;
  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );
    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode() {
    // if (this.form.value.phoneNumber) {
    //   this.toastService.showError('Bạn chưa nhập số điện thoại', "Lỗi");
    // } else {
      let phone = '+84' + this.form.value.phoneNumber;
      this.localStorage.set('phone', phone);
      const appVerifier = this.windowRef.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phone, appVerifier)
        .then((result) => {
          console.log(result);
          this.windowRef.confirmationResult = result;
          this.isSend = false;
        })
        .catch((error) => {
          // this.toastService.showError(error, 'Lỗi');
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
        // this.toastService.showError(error, 'Lỗi');
      });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
