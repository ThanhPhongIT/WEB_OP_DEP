import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private localStorage: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.localStorage.clear();
    this.router.navigate(["/home"]);
  }

}
