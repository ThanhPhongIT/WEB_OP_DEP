import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  template: `
    <div class="show-img"></div>
    <button (click)="conFirm()">Xác nhận</button>
  `,
  styles: [],
})
export class ConfirmComponent implements OnInit {
  constructor(
    private router: Router,
    private dialogConfirmRef: MatDialog
  ) {}

  ngOnInit(): void {}
  conFirm() {
	this.dialogConfirmRef.afterOpened.subscribe((res)=>{
		console.log(res);
		
	})
	this.dialogConfirmRef.closeAll();
    this.router.navigate(['cart']);
  }
}
