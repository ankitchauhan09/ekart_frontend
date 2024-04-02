import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthUserServiceService} from "./user-auth/auth-user-service.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient : HttpClient, private userAuthService : AuthUserServiceService) {
  }

  private jwtTokenHeader = new HttpHeaders({'Authorization' : `Bearer ` + this.userAuthService.getToken()})

  addProductToCart(userId:number, productId:number){
    const params = new HttpParams().set('productId', productId);
    return this.httpClient.post(`http://localhost:8080/api/cart/user/${userId}`,  null, {headers : this.jwtTokenHeader, params});
  }

  deleteFromCart(userId: number, productId : number){
      return this.httpClient.delete(`http://localhost:8080/api/cart/user/${userId}/product/${productId}`, {headers : this.jwtTokenHeader})
  }

  updateCart(userId : number, productId : number, quantity : number){
    const params = new HttpParams().set('productId',productId).set('productQuantity',quantity);
    return this.httpClient.put(`http://localhost:8080/api/cart/user/${userId}`, null, {headers:this.jwtTokenHeader, params});
  }

  getCartItems(userId:number, pageIndex : number, pageSize : number){
    return this.httpClient.get(`http://localhost:8080/api/cart/user/${userId}/${pageIndex}/${pageSize}`, {headers:this.jwtTokenHeader});
  }
}
