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

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    console.log(this.localStorageService.get('token'));
    this.loginService
      .create({
        token_firebase: this.localStorageService.get('token'),
        type: 2,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.infor = res.data
      });
      this.getCartInfor(this.infor.user_id);
  }

  getCartInfor(userId) {
    this.cartService.create({ user_id: userId }).subscribe((res: any) => {
      this.listCart = res.data;
      console.log(this.listCart);
    });
  }
}
