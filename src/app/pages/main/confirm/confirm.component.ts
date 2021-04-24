import { Component, OnInit } from "@angular/core";

@Component({
	selector: 'app-confirm',
	template: `
			<div class="show-img"></div>
			<button (click)="conFirm()">Xác nhận</button>
			`,
	styles: []
})

export class ConfirmComponent implements OnInit{
	constructor(){}

	ngOnInit(): void{

	}
	conFirm(){
	}


}