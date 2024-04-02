    import {Injectable} from '@angular/core';
    import {HttpClient, HttpHeaders} from "@angular/common/http";
    import {NgForm} from "@angular/forms";
    import {AuthUserServiceService} from "./user-auth/auth-user-service.service";

    @Injectable({
        providedIn: 'root'
    })
    export class CategoryService {

        constructor(private httpClient: HttpClient, private userAuthService: AuthUserServiceService) {
        }

        private requestHeader: HttpHeaders = new HttpHeaders({"No-auth": "True"})

        getAllCategories() {
            return this.httpClient.get('http://localhost:8080/api/category/', {headers: this.requestHeader})
        }

        private jwtTokenHeader: HttpHeaders = new HttpHeaders(
            {"Authorization": `Bearer ${this.userAuthService.getToken()}`}
        )

    }
