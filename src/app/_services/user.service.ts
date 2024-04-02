import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthUserServiceService} from "./user-auth/auth-user-service.service";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient, private userAuthService:AuthUserServiceService) { }

  private requestHeader = new HttpHeaders(
    {"No-auth":"True"}
  )

  public jwtLogin(loginData:any){
      return this.httpClient.post("http://localhost:8080/api/v1/auth/login", loginData, {headers:this.requestHeader});
  }

  private tokenHeader = new HttpHeaders({"Authorization":`Bearer ${this.userAuthService.getToken()}`})

  public getUserById(userId: number){
    return this.httpClient.get(`http://localhost:8080/api/users/${userId}`, {headers:this.tokenHeader});
  }

  checkRole(allowedRoles:any) : boolean{
    let isMatch:boolean = false;
    const userRoles = this.userAuthService.getRoles();
    if(userRoles != null && userRoles){
      userRoles.forEach((roles:string) => {
        if(roles == allowedRoles){
          isMatch = true;
          return true;
        }
        else {
          return isMatch;
        }
      })
    }
    return isMatch;
  }

  registerNewUser(loginForm: any) {
    return this.httpClient.post("http://localhost:8080/api/v1/auth/register", loginForm, {headers : this.requestHeader});
  }

  public getCart(userId : number){
    return this.httpClient.get(`http://localhost:8080/api/cart/user/${userId}`, {headers : this.tokenHeader});
  }

  public getAddress(userId: number){
    return this.httpClient.get(`http://localhost:8080/api/users/${userId}/address/get-address`, {headers:this.tokenHeader});
  }

  public addAddress(address:any, userId : number){
      return this.httpClient.post(`http://localhost:8080/api/users/${userId}/address/add-address`, address, {headers:this.tokenHeader});
  }

}
