import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {UserService} from "../_services/user.service";
import {CurrencyPipe, DecimalPipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {CartService} from "../_services/cart.service";
import {AuthUserServiceService} from "../_services/user-auth/auth-user-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UpdateCartService} from "../_services/update-cart.service";
import {Router, RouterLink} from "@angular/router";
import {CheckoutResourcesService} from "../_services/shared_resources/checkout-resources.service";

interface cartItem {
    product: [];
}

@Component({
    selector: 'app-cart-canvas',
    standalone: true,
    imports: [
        MatDivider,
        NgForOf,
        MatButton,
        MatFormField,
        MatLabel,
        MatOption,
        MatSelect,
        FormsModule,
        DecimalPipe,
        CurrencyPipe,
        RouterLink
    ],
    templateUrl: './cart-canvas.component.html',
    styleUrl: './cart-canvas.component.css',

})


export class CartCanvasComponent implements OnInit {

    @Input() userId: number = 0;
    @Output() cart_id: EventEmitter<any> = new EventEmitter<number>();
    totalCost = 0;


    constructor(private checkOutSharedService: CheckoutResourcesService, private userService: UserService, private sanitizer: DomSanitizer, private cartService: CartService, private userAuthService: AuthUserServiceService, private snackBar: MatSnackBar, private cartUpdateService: UpdateCartService, private router: Router) {
    }

    products: any[] = [];
    productQuantity: { [productId: number]: number } = {};
    cart: { [productId: number]: number, } = {};

    getAllProductsOfTheCart(userId: number) {
        this.userService.getCart(userId).subscribe(
            (response: any) => {
                response.forEach((cartItem: any) => {
                    this.cart[cartItem.product.id] = cartItem.cartId;
                })

                // console.log('this is cart', this.cart)

                this.products = response.map((cartItem: cartItem) => cartItem?.product);
                // console.log(this.products)

                this.products.forEach((product) => {
                    product.images.forEach((image: any) => {
                        image.content = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + image.content)
                    })
                    this.productQuantity[product.id] = 1;
                })

                this.setTotalCost();
            },
            (error) => {
                // console.log(error)
            }
        )
    }

    setTotalCost() {
        this.totalCost = 0;
        this.products.forEach((product) => {
            const productCost = product.productCost;
            const productDiscount = product.productDiscount;
            const productQuantity = this.productQuantity[product.id];
            this.totalCost += (productCost - (productCost * productDiscount / 100)) * productQuantity;
        })
    }

    updateCost(productId: number) {
        if (typeof this.productQuantity[productId] === 'string') {
            let quantity: any = this.productQuantity[productId];
            this.productQuantity[productId] = parseInt(quantity)

            this.cartService.updateCart(this.userAuthService.getId(), productId, parseInt(quantity)).subscribe(
                (response) => {
                    // console.log(response)
                },
                (error) => {
                    // console.log(error)
                }
            )

        }
        this.setTotalCost();
    }

    removeProductFromCart(id: number) {
        const productId = id;
        const userId = this.userAuthService.getId();
        this.cartService.deleteFromCart(userId, productId).subscribe(
            (response: any) => {
                // console.log(response)
                if (response.status === true) {
                    this.snackBar.open('Product Removed From Cart', 'OK')
                    this.getAllProductsOfTheCart(userId);
                }
            },
            (error) => {
                // console.log(error)
            }
        )
    }

    ngOnInit(): void {
        this.getAllProductsOfTheCart(this.userId);
        this.cartUpdateService.updated$.subscribe(() => {
            this.getAllProductsOfTheCart(this.userId);
        })
    }

    updateList(id: number) {
        this.getAllProductsOfTheCart(this.userId);
    }

    checkOut() {
        if (this.userAuthService.isLoggedIn()) {

            const dataToSend : {}[] = [];
            for(let productId in this.productQuantity){
                dataToSend.unshift({productId : productId, quantity : this.productQuantity[productId]})
            }
            this.checkOutSharedService.shareResource(dataToSend)
            this.router.navigate(['/checkout'])
        }
    }

    protected readonly parseInt = parseInt;
}
