import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name;
  infor: any;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getInfor();
  }

  getInfor() {
    console.log(this.localStorageService.get('token'));
    this.loginService
      .create({
        token_firebase: this.localStorageService.get('token'),
        type: 2,
      })
      .subscribe((res: any) => {
        this.infor = res.data;
        console.log(res);
      });
  }
  logout() {
    this.localStorageService.clear();
    this.router.navigate(['/home']);
  }
}
