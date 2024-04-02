import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutResourcesService {
  constructor() { }

  data : {}[] = [];

  shareResource(data : {}[]){
    this.data = data;
  }

  getSharedResource(){
    return this.data;
  }

}
