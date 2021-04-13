import { Component, OnInit } from '@angular/core';
import { PhoneModel } from 'src/app/models/phone-model.model';
import { PhoneModelService } from 'src/app/services/phone-model.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listProduct = [1, 2, 3, 4, 5];
  listBrand: PhoneModel[] = [
    {
      id: 2,
      name: 'Apple',
      image_url:
        'http://opdep.qalatt.com/images/categories/2/1615727464_kBdUz.png',
    },
    {
      id: 3,
      name: 'Samsung',
      image_url:
        'http://opdep.qalatt.com/images/categories/3/1615727537_GLjcn.jpg',
    },
    {
      id: 4,
      name: 'Oppo',
      image_url:
        'http://opdep.qalatt.com/images/categories/4/1615729943_WwpID.png',
    },
    {
      id: 6,
      name: 'Xiaomi',
      image_url:
        'http://opdep.qalatt.com/images/categories/6/1615730103_BzgwT.png',
    },
    {
      id: 7,
      name: 'Huawei',
      image_url:
        'http://opdep.qalatt.com/images/categories/7/1615730276_vbOyM.png',
    },
    {
      id: 8,
      name: 'Vivo',
      image_url:
        'http://opdep.qalatt.com/images/categories/8/1615730392_JsRmh.png',
    },
    {
      id: 9,
      name: 'Realme',
      image_url:
        'http://opdep.qalatt.com/images/categories/9/1615730816_bycWF.jpg',
    },
    {
      id: 10,
      name: 'Vsmart',
      image_url:
        'http://opdep.qalatt.com/images/categories/10/1615731469_axMqt.png',
    },
  ];
  constructor(private phoneModelService: PhoneModelService) {}

  ngOnInit(): void {
    // this.getListPhoneModel();
  }

  getListPhoneModel() {
    this.phoneModelService.getListPhoneModel().subscribe((res: any) => {
      this.listBrand = res;
    });
  }
}
