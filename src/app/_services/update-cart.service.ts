import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateCartService {

  private updatedSubject = new Subject<void>();

  updated$ = this.updatedSubject.asObservable();

  triggerUpdate(){
    this.updatedSubject.next();
  }

  constructor() { }
}
