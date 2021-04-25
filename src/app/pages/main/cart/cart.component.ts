import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { DeleteProductService } from 'src/app/services/deleteProduct.service';
import { LoaderService } from 'src/app/services/loader.service';
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
    private localStorageService: LocalStorageService,
    private loadService: LoaderService,
    private deleteProductServce: DeleteProductService
  ) {}

  ngOnInit(): void {
    this.loadService.show();
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
      this.getCartInfor(this.infor.id);
      // this.getCartInfor(6);

      
    });
  }
  deleteProd(id){
    this.loadService.show();
    this.deleteProductServce.create({user_id: this.infor.id,order_upload_temp_id: id}).subscribe((res)=>{
      this.getCartInfor(this.infor.id);
      // console.log(res);
    })
  }
  getCartInfor(userId) {
    this.cartService.create({ user_id: userId }).subscribe((res: any) => {
      this.listCart = res.data;
      this.listCart.forEach(item =>{
        this.total += Number(item.price);
      })
      console.log(this.listCart);
      this.loadService.hide();
    });
  }
}
