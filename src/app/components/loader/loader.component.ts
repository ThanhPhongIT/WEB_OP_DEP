import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  template: `<div class="overlay" *ngIf="isLoading | async">
              <mat-progress-spinner [diameter]="60" class="spinner" [color]="color" [mode]="mode" [value]="value">
              </mat-progress-spinner>
              <span class="loading-message">Xin vui lòng đợi...</span>
            </div>`,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  color = 'accent';
    mode = 'indeterminate';
    value = 50;
    isLoading: Subject<boolean>;
    constructor(
        public loadingService: LoaderService  
    ) {
        this.isLoading = loadingService.isLoading;
    }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [],
  exports: [LoaderComponent]
})
export class LoaderModule{}
