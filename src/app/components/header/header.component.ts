import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
// import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route : Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login(){
    
    this.openDialog();
    // let token = this.loginService.create({
    //     'usename': 'phong',
    //     'password': 'adsfa',
    //   }).subscribe(res=>{
    //     console.log(res);
    //   })
    // if(){}
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '500px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule,MatDialogModule],
  exports: [HeaderComponent]
})

export class HeaderModule {}
