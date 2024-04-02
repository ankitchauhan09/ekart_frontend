import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient : HttpClient) { }

  public pay(paymentDetails : {}){
    return this.httpClient.post("http://localhost:8080/create-order", paymentDetails);
  }

}
