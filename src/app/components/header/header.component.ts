import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { LocalStorageService } from 'src/app/services/localstorage.service';
// import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route : Router, public dialog: MatDialog, private localStorageService : LocalStorageService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.localStorageService.get("token")){
      this.route.navigate(["/profile"])
    }else{
      this.openDialog();
    }
  }

  goToCart(){
    if(this.localStorageService.get("token")){
      this.route.navigate(["/cart"])
    }else{
      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px',
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule,MatDialogModule],
  exports: [HeaderComponent]
})

export class HeaderModule {}
