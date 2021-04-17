import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhoneModel } from 'src/app/models/phone-model.model';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListPhoneModel();
  }

  getListPhoneModel() {
    this.phoneModelService.getListPhoneModel().subscribe((res: any) => {
      this.listBrand = res;
    });
  }
}
