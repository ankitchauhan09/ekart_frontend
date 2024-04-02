import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthUserServiceService} from "./user-auth/auth-user-service.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private userAuthService: AuthUserServiceService, private httpClient: HttpClient) {
    }

    private jwtTokenHeader: HttpHeaders = new HttpHeaders(
        {"Authorization":`Bearer ${this.userAuthService.getToken()}`}
    )

    getAllProducts(pageIndex: number, pageSize: number, keyword : string = "") {

        if(keyword == "") {
          return this.httpClient.get(`http://localhost:8080/api/product/${pageIndex}/${pageSize}`, {headers: this.jwtTokenHeader})
        }
        else{
          return this.httpClient.get(`http://localhost:8080/api/product/${pageIndex}/${pageSize}?keyword=${keyword}`, {headers: this.jwtTokenHeader});
        }
    }

    getProductCount() {
        return this.httpClient.get('http://localhost:8080/api/product/count', {headers: new HttpHeaders({"No-auth": "True"})});
    }

  addPost(loginForm: FormData, categoryId: string) {
    return this.httpClient.post(`http://localhost:8080/api/product/category/${categoryId}`, loginForm, {headers: this.jwtTokenHeader})
  }

  getProductById(id: number) {
      return this.httpClient.get(`http://localhost:8080/api/product/${id}`, {headers : this.jwtTokenHeader});
  }

  getProductImagesById(id: number){
      return this.httpClient.get(`http://localhost:8080/api/product/${id}/get-image`, {headers: this.jwtTokenHeader});
  }

  deleteProductById(id:number){
      return this.httpClient.delete(`http://localhost:8080/api/product/${id}`, {headers:this.jwtTokenHeader});
  }
}
