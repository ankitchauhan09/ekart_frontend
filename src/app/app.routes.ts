import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {authGuardGuard} from "./_auth/auth-guard.guard";
import {RegisterComponent} from "./register/register.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {AllProductComponent, ProductDetails} from "./all-product/all-product.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {AuthUserServiceService} from "./_services/user-auth/auth-user-service.service";
import {checkoutResolver} from "./checkout/checkout.resolver";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {orderdetailsResolver} from "./order-details/orderdetails.resolver";

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'admin',component:AdminComponent, canActivate:[authGuardGuard], data:{roles:['ADMIN']}},
  {path:'user',component:UserComponent, canActivate:[authGuardGuard], data:{roles:['USER']}},
  {path:'login',component:LoginComponent},
  {path:'forbidden', component:ForbiddenComponent},
  {path:'register', component:RegisterComponent},
  {path:'add-product', component:AddProductComponent , canActivate:[authGuardGuard], data:{roles: ['ADMIN']}},
  {path:'all-product', component:AllProductComponent},
  {path:'product-details/:id', component:ProductDetailsComponent},
  {
    path : 'checkout', component:CheckoutComponent,
    resolve : {userId : checkoutResolver}
  },
  {path : 'order-details', component:OrderDetailsComponent, resolve : {'cartItems' : orderdetailsResolver}}
];
