import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { EditorModule } from './editor.component';
@Injectable({
  providedIn: EditorModule,
})
export class EditorStateService {
  private listStickerSubject = new BehaviorSubject(null);
  readonly listSticker$ = this.listStickerSubject.asObservable();

  private listPhoneImageSubject = new BehaviorSubject(null);
  readonly listPhoneImage$ = this.listPhoneImageSubject.asObservable();

  private listSelectedImageSubject = new ReplaySubject(5);
  readonly listSelectedImage$ = this.listSelectedImageSubject.asObservable();

  private drawImageSubject = new BehaviorSubject(null);
  readonly drawImage$ = this.drawImageSubject.asObservable();

  setListSelectedImage(image: string[]): void {
    this.listSelectedImageSubject.next(image);
  }

  setListPhoneImage(val: string[]): void {
    this.listPhoneImageSubject.next(val);
  }

  setListSticker(val: string[]): void {
    this.listStickerSubject.next(val);
  }

  setDrawImage(image: string) {
    this.drawImageSubject.next(image);
  }
}
