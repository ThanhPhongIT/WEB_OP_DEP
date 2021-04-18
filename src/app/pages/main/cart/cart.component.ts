import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  listCart = [];
  infor: any;
  ship = 12000;
  total = 12000;

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getInfor();
    
  }
  async getInfor(){
    const phone = this.localStorageService.get('phone');
    await this.loginService
    .create({
      token_firebase: this.localStorageService.get('token'),
      type: 2,
      phone_number_firebase: phone
    })
    .subscribe((res: any) => {
      this.infor = res.data;
      // this.getCartInfor(this.infor.id);
      this.getCartInfor(6);
    });
  }
  getCartInfor(userId) {
    this.cartService.create({ user_id: userId }).subscribe((res: any) => {
      this.listCart = res.data;
      this.listCart.forEach(item =>{
        this.total += Number(item.price);
      })
      console.log(this.listCart);
    });
  }
}
