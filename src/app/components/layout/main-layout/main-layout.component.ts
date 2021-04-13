import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  
  dataNav = {
   
    list: [
      {
        icon: 'assets/img/nav/ic-account.svg',
        name: 'Danh sách nhân viên bán hàng',
      },
      {
        icon: 'assets/img/nav/analystics.svg',
        name: 'Danh sách hợp đồng',
      },
      {
        icon: 'assets/img/nav/recommendation.svg',
        name: 'Cấu hình hoa hồng',
      }
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
