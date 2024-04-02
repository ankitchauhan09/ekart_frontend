import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, repeatWhen, throwError} from "rxjs";
import {AuthUserServiceService} from "../_services/user-auth/auth-user-service.service";
import {Router} from "@angular/router";

export class AuthInterceptor implements HttpInterceptor{

  constructor(private userAuthService:AuthUserServiceService, private router : Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.headers.get("No-Auth") == "True"){
      return next.handle(req.clone());
    }

    const jwtToken = this.userAuthService.getToken();
    req = this.addToken(req, jwtToken);

    return next.handle(req).pipe(
      catchError(
        (error:HttpErrorResponse) => {
          console.log(error.status);
          if(error.status == 401){
            this.router.navigate(["/login"])
          }
          if(error.status == 403){
            this.router.navigate(["/forbidden"])
          }
          return throwError("Something went wrong");
        }
      )
    )

  }

  private addToken(request:HttpRequest<any>, token:string){
    return request.clone(
      {
        setHeaders : {
          Authorization : `Bearer ${token}`
        }
      }
    )
  }


}
