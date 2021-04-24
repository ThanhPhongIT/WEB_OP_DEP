import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile.model';
import { CityService } from 'src/app/services/city.service';
import { DiscountService } from 'src/app/services/discount.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { LoginService } from 'src/app/services/login.service';
import { SubmitOrderService } from 'src/app/services/submitOder.service';
import { UpdateProfileService } from 'src/app/services/updateProfile.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
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
  cartInfor: any;
  discountCode: string;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private loginService: LoginService,
    private loadService: LoaderService,
    private discountService: DiscountService,
    private updateProfileSerivce: UpdateProfileService,
    private cityService: CityService,
    private fb: FormBuilder,
    private submitOderService: SubmitOrderService
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
    this.updateProfileSerivce
      .create({
        full_name: this.profileForm.value.fullName,
        address: this.profileForm.value.address,
        city_id: this.profileForm.value.cityId,
        phone_number: this.profileForm.value.phoneNumber,
        user_id: this.user_id,
      })
      .subscribe((res) => {
        this.isEdit = false;
        this.discountProfile(this.user_id, '');
      });
  }
  getCityNameById(id){
    this.listCity.forEach((item)=>{
      if(item.id===id){
        return item.name
      }
    })
  }

  discountProfile(id, code) {
    this.discountService
      .create({ user_id: id, code_number: code })
      .subscribe((res: any) => {
        this.infor = res.profile;
        this.cartInfor = res.data;
        console.log(this.cartInfor);
        this.profileForm = this.fb.group({
          fullName: this.infor.full_name,
          address: this.infor.address,
          cityId: this.infor.city_id,
          phoneNumber: this.infor.phone_number,
        });
      });
  }

  discount() {
    this.discountProfile(this.user_id, this.discountCode);
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
        console.log(this.getCityNameById(this.user_id ));
        
        this.discountProfile(this.user_id, '');
        this.loadService.hide();
      });
  }

  order() {
    this.submitOderService.create({
      "user_id": this.user_id.toString(),
      "phone": this.infor.phone_number,
      "city": this.infor.city_id.toString(),
      "shipping_type": 0,
      "address": this.infor.address,
      "email": "@gmail.com",
      "payment_option": 1,
      "realName": this.infor.full_name,
      "code_number": this.discountCode
    
    }).subscribe(res=>{
      this.router.navigate(['home'])
      console.log(res);
      
    })
  }
}
