import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { LoginService } from 'src/app/services/login.service';
import { UploadProductService } from 'src/app/services/uploadProduct.service';

@Component({
  selector: 'app-confirm',
  template: `
    <div class="show-img">
		<img [src]="imgSrc" alt=""/>
	</div>
    <button class=" btn btn-fill-out btn-block m-auto w-50 mt-5" (click)="conFirm()">
      Xác nhận
    </button>
  `,
  styles: [],
})
export class ConfirmComponent implements OnInit {
  user_id;
  dataProduct;
  imgSrc;
  constructor(
    private router: Router,
    private dialogConfirmRef: MatDialog,
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private loadService: LoaderService,
    private uploadProductService: UploadProductService,
    @Inject(MAT_DIALOG_DATA) public dataPass: any
  ) {}

  ngOnInit(): void {
    this.loadService.show();
    this.getInfor();
    this.dataProduct = this.dataPass.data.data;
    this.imgSrc = this.dataPass.img;
  }
  conFirm() {
    this.uploadProductService
      .create(
        {},
        {
          user_id: this.user_id,
          product_id: this.dataProduct.id,
          price: this.dataProduct.price,
        }
      )
      .subscribe((res: any) => {
        console.log(res);
      });
    this.dialogConfirmRef.closeAll();
    this.router.navigate(['cart']);
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
        console.log(this.user_id);

        this.loadService.hide();
      });
  }
}
