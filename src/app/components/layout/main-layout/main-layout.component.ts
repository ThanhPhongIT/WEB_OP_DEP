import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
              <div class="main-layout">
                <div class="main-layout-header">
                    <app-header></app-header>
                </div>
                <div class="main-layout-body">
                    <div class="main-layout-section">
                        <router-outlet></router-outlet>
                    </div>
                </div>
                <div class="main-layout-footer">
                    <app-footer></app-footer>
                </div>
              </div>
                `
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
