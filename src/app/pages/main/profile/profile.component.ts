import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
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
  isEdit = false;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private loginService: LoginService,
    private loadService : LoaderService
  ) {}

  ngOnInit(): void {
    this.loadService.show();
    this.getInfor();
  }

  edit(){
    this.isEdit = true;
  }

  confirm(){
    this.isEdit = false;
  }

  getInfor() {
    const phone = this.localStorageService.get('phone');
    console.log(this.localStorageService.get('token'));
    this.loginService
      .create({
        token_firebase: this.localStorageService.get('token'),
        type: 2,
        phone_number_firebase: phone
      })
      .subscribe((res: any) => {
        this.infor = res.data;
        console.log(res.data);
      },
      ()=>{
        
      },
      ()=>{
        this.loadService.hide();
      });
  }
  logout() {
    this.localStorageService.clear();
    this.router.navigate(['/home']);
  }
}
