import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as http from "http";
import {AuthUserServiceService} from "./user-auth/auth-user-service.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private userAuthService: AuthUserServiceService) {
  }

  jwtTokenHeader: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.userAuthService.getToken()}`);


  placeOrder(orderDetails: {}, userId: number) {
    return this.httpClient.post(`http://localhost:8080/api/order/user/${userId}/create`, orderDetails,  {headers: this.jwtTokenHeader});
  }

}
