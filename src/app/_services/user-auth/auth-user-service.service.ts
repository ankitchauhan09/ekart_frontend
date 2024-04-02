import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthUserServiceService {

  constructor() { }


  public setId(id:number){
    localStorage.setItem("id", id.toString());
  }

    public getId():number{
      if(this.isLocalStorageAvailable()){
        return Number(localStorage.getItem("id"));
      }
      return 0;
    }

    private isLocalStorageAvailable(): boolean {
        try {
            const testKey = '__test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

  public setRoles(roles: [any]) {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles() : []{
      if(this.isLocalStorageAvailable()) {
          const rolesJson: any = localStorage.getItem("roles");
          return JSON.parse(rolesJson);
      }
      return [];
  }

  public setToken(token:string){
    localStorage.setItem('token', token);
  }

  public getToken():string
  {
      if(this.isLocalStorageAvailable()) {
          const token: any = localStorage.getItem("token");
          return token;
      }
      return "";
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn() : boolean{
    return Boolean(this.getRoles() && this.getToken());

  }

}
