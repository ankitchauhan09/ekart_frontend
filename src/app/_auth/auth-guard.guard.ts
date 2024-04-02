import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from "rxjs";
import {AuthUserServiceService} from "../_services/user-auth/auth-user-service.service";
import {UserService} from "../_services/user.service";
import {Injectable} from "@angular/core";
import {log} from "util";


@Injectable({
  providedIn: 'root',
})
export class authGuardGuard implements CanActivate{

  constructor(private userAuthService:AuthUserServiceService, private router:Router, private userService:UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token= this.userAuthService.getToken();
    if(this.userAuthService.getToken() != null){
      const role = route.data["roles"] as Array<string>;
      if(role){
        const match = this.userService.checkRole(role);
        if(match){
          return true;
        }
        else{
          this.router.navigate(["/forbidden"])
          return false;
        }
      }

    }
    console.log("null")
    this.router.navigate(["/login"])
    return false;
  }

}
