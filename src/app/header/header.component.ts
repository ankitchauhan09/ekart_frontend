import {Component, EventEmitter, Output} from '@angular/core';
import {Route, Router, RouterLink} from "@angular/router";
import {AuthUserServiceService} from "../_services/user-auth/auth-user-service.service";
import {NgIf} from "@angular/common";
import {UserService} from "../_services/user.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatToolbar,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    MatButton,
    MatMenuItem,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  value: any = '';

  hasValue() {
    return this.value.length >= 1;
  }

  userUpdateForm! : FormGroup;


  constructor(private userAuthService: AuthUserServiceService, private router: Router, private userService: UserService) {
    if (this.isLoggedIn()) {
      this.getusername();
    }
  }

  public isLoggedIn(): boolean {
    return this.userAuthService.isLoggedIn();
  }

  public logOut() {
    this.userAuthService.clear();
    this.router.navigate(["/login"])
  }

  checkRole(allowedRoles: any): boolean {
    return this.userService.checkRole(allowedRoles);
  }

  navigateCart() {
    if (this.isLoggedIn()) {
      this.router.navigate(["/forbidden"])
    } else {
      this.router.navigate(["/login"])
    }
  }

  public username = '';
  user: any;
  userRealName: any;
  userContact: any;
  userEmail : any;
  userRecoveryEmail: any;

  getusername() {
    this.userService.getUserById(this.userAuthService.getId()).subscribe(
      (response: any) => {
        this.user = response;
        this.username = response.userRealName;
      },
      (error) => {
        // console.log(error.status)
        // console.log(error)

      }
    )
  }

  addUserIfLoggedIn() {
  }


  navigateToHome() {
    this.router.navigate(['/home'], {queryParams: {inputFieldValue: this.value}})
  }

  routeToorderdetails() {
    this.router.navigate(['/order-details'])
  }

  routeTologin() {
    this.router.navigate(['/login'])
  }

  navigateToOrders() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/order-details'])
    } else {
      this.router.navigate(['/login']);
    }
  }


  updateUserDetails() {
    console.log(this.userUpdateForm.value)
  }
}
