import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/services/window.service';
import firebase from 'firebase';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

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
  constructor(private win: WindowService, private loginService: LoginService) {}
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
    if(this.form.value.phoneNumber=''){
      
    }
    let phone = '+84' + this.form.value.phoneNumber;
    const appVerifier = this.windowRef.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phone, appVerifier)
      .then((result) => {
        console.log(result);
        this.windowRef.confirmationResult = result;
      })
      .catch((error) => console.log(error));
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.formotp.value.otp)
      .then((result) => {
        this.user = result.user;
        console.log(this.user.za);
        this.loginService.create({"token_firebase": this.user.za, "type": 2}).subscribe(res=> console.log(res));
        
      })
      .catch((error) => console.log(error, 'Incorrect code entered?'));
  }
}
