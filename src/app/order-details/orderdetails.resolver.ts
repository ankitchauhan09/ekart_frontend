import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {CartService} from "../_services/cart.service";
import {AuthUserServiceService} from "../_services/user-auth/auth-user-service.service";
import {lastValueFrom} from "rxjs";

export const orderdetailsResolver: ResolveFn<any> = async (route, state) => {

  try {
    let userId = inject(AuthUserServiceService).getId();
    const cartObserver = inject(CartService).getCartItems(userId, 0, 5);
    const cartItems = await lastValueFrom(cartObserver);
    return {cartItems, userId};
  }
  catch (error) {
    console.error('Error fetching the user cart data : ', error);
    throw error;
  }
};
