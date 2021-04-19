import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhoneModel } from 'src/app/models/phone-model.model';
import { LoaderService } from 'src/app/services/loader.service';
import { PhoneModelService } from 'src/app/services/phone-model.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listProduct = [1, 2, 3, 4, 5];
  listBrand: PhoneModel[];
  constructor(
    private phoneModelService: PhoneModelService,
    private router: Router,
    private loaderService: LoaderService 
  ) {}

  ngOnInit(): void {
    this.getListPhoneModel();
    this.loaderService.show();
  }

  getListPhoneModel() {
    this.phoneModelService.getListPhoneModel().subscribe((res: any) => {
      this.listBrand = res;
      this.loaderService.hide();
    });
  }
}
