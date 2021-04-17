import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  listCart = [];

  constructor(private cartService: CartService) {

   }

  ngOnInit(): void {


  }

  getCartInfor(userId){
    this.cartService.create({"userID": userId }).subscribe((res: any) =>{
      console.log(res);
    })
  }

}
