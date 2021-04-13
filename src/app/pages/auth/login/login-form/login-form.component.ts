import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() btnTitle = 'Đăng nhập';
  @Output() onSubmit = new EventEmitter();
  @Output() onForgotPW = new EventEmitter();
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor() {}

  ngOnInit(): void {}
  submit() {
    this.onSubmit.emit(this.form.value);
  }
}
