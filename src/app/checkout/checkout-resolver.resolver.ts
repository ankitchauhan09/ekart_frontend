import { ResolveFn } from '@angular/router';
import {AuthUserServiceService} from "../_services/user-auth/auth-user-service.service";
import {inject} from "@angular/core";

export const checkoutResolverResolver: ResolveFn<boolean> = (route, state) => {

  if(inject(AuthUserServiceService).isLoggedIn()) {
    const userId = inject(AuthUserServiceService).getId();

    return true;
  }

  return false;
};
