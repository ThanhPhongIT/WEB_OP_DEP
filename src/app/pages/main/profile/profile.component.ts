import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile.model';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UpdateProfileService } from 'src/app/services/updateProfile.service';
import { CityService } from '../../../services/city.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name;
  infor: Profile;
  isEdit = false;
  listCity = [];
  profileForm: FormGroup;
  fullName;
  address;
  cityId;
  phoneNumber;
  user_id: number;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private loginService: LoginService,
    private loadService: LoaderService,
    private profileService: ProfileService,
    private updateProfileSerivce: UpdateProfileService,
    private cityService: CityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadService.show();
    this.getInfor();
    this.getListCity();
  }

  edit() {
    this.isEdit = true;
  }

  confirm() {
    
    this.updateProfileSerivce.create({
      'full_name':	this.profileForm.value.fullName,
      'address':this.profileForm.value.address,
      'city_id'	:this.profileForm.value.cityId,
      'phone_number':this.profileForm.value.phoneNumber,
      'user_id': this.user_id
    }).subscribe((res)=>{
      this.isEdit = false;
      this.getInforById(this.user_id);
    })
  }

  getInforById(id) {
    this.profileService.create({ user_id: id }).subscribe((res: any) => {
      this.infor = res.data;
      this.profileForm = this.fb.group({
        fullName: this.infor.full_name,
        address: this.infor.address,
        cityId: this.infor.city_id,
        phoneNumber: this.infor.phone_number,
      })
    });
  }

  getListCity() {
    this.cityService.list().subscribe((res: any) => {
      this.listCity = res;
    });
  }

  getInfor() {
    const phone = this.localStorageService.get('phone');
    this.loginService
      .create({
        token_firebase: this.localStorageService.get('token'),
        type: 2,
        phone_number_firebase: phone,
      })
      .subscribe((res: any) => {
        this.user_id = res.data.id;
        this.getInforById(this.user_id);
        this.loadService.hide();
      });
  }
  logout() {
    this.localStorageService.clear();
    this.router.navigate(['/home']);
  }
}
