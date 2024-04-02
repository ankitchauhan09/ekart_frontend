  import { Component } from '@angular/core';
  import {FormsModule, NgForm} from "@angular/forms";
  import {UserService} from "../_services/user.service";
  import {error} from "@angular/compiler-cli/src/transformers/util";
  import {AuthUserServiceService} from "../_services/user-auth/auth-user-service.service";
  import {Router} from "@angular/router";
  import {MatFormFieldModule} from '@angular/material/form-field';
  import {MatIconModule} from '@angular/material/icon';
  import {MatInputModule} from '@angular/material/input';
  import {MatButtonModule} from "@angular/material/button";
  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
  })
  export class LoginComponent {

    constructor(private userService : UserService, private userAuthService:AuthUserServiceService, private router:Router) {
    }

    submitForm(loginForm: NgForm){
      // console.log(loginForm.value)
      this.userService.jwtLogin(loginForm.value).subscribe(
        (response:any) => {
          // console.log(response)
            const role:any = response.user.role[0].roleName;
            this.userAuthService.setRoles([role]);
            this.userAuthService.setToken(response.token);
            this.userAuthService.setId(response.user.id);

          // console.log(this.userAuthService.getId())
            if(role === "ADMIN"){
              this.router.navigate(["/admin"])
            }
            else if(role === "USER"){
              this.router.navigate(["/user"])
            }

        },
      (error) => {
          // console.log(error)

      }
      )
    }
  }
