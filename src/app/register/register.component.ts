import { Component } from '@angular/core';
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {UserService} from "../_services/user.service";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIconModule,
    MatIconButton,
    MatSuffix,
    MatSelect,
    MatOption
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   hide = true;

   roleName = 'USER';

   userPassword : string = '';
   userConfirmPassword : string = '';

   constructor(private userService:UserService) {

   }

   matchPassword(){
     return this.userPassword === this.userConfirmPassword && this.userPassword.length >= 1;
   }

  submitRegistrationForm(loginForm: NgForm) {
      loginForm.value['roleName'] = this.roleName;

      this.userService.registerNewUser(loginForm.value).subscribe(
        (response) => {
          // console.log(response);
        },
      (error) => {
        // console.log(error)
      }
      )

  }
}
