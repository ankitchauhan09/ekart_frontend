import {ResolveFn} from '@angular/router';
import {UserService} from "../_services/user.service";
import {inject} from "@angular/core";
import {AuthUserServiceService} from "../_services/user-auth/auth-user-service.service";
import {lastValueFrom} from "rxjs";
import {CheckoutResourcesService} from "../_services/shared_resources/checkout-resources.service";
import {ProductService} from "../_services/product.service";

export const checkoutResolver: ResolveFn<any> = async (route, state) => {
    let cartData = inject(CheckoutResourcesService).getSharedResource();
    let product;

    //fetching the cart data
    cartData.forEach(async (cartItem: any) => {
        const productObservable = inject(ProductService).getProductById(cartItem.productId);
        product = await lastValueFrom(productObservable);
        cartItem.productId = product;
    })


    //fetching the stored addresses of the user
    let addressList;
    inject(UserService).getAddress(inject(AuthUserServiceService).getId()).subscribe(
        (response)=>{
            addressList = response;
        },
        (error)=>{
            console.log(error)
        }
    )

    try {

        //getting user
        const userObservable = inject(UserService).getUserById(inject(AuthUserServiceService).getId());
        let user = await lastValueFrom(userObservable);


        //fetching all the states of india and districts for address form
        const response = await fetch('https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json');
        const data = await response.json();
        let allStatesOfIndia = data;

        return {user, cartData, allStatesOfIndia, addressList};
    } catch (error) {
        console.error('Error fetching the user data : ', error);
        throw error;
    }

};
