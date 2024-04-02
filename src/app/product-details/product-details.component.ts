import {Component, EventEmitter, Inject, inject, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProductService} from "../_services/product.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CurrencyPipe, NgClass, NgFor, NgForOf, NgIf} from "@angular/common";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {CarouselComponent} from "../carousel/carousel.component";
import {DiscountTagComponent} from "../discount-tag/discount-tag.component";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {UserService} from "../_services/user.service";
import {AuthUserServiceService} from "../_services/user-auth/auth-user-service.service";
import {CartService} from "../_services/cart.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartCanvasComponent} from "../cart-canvas/cart-canvas.component";
import {UpdateCartService} from "../_services/update-cart.service";
import {CheckoutResourcesService} from "../_services/shared_resources/checkout-resources.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    RouterLink,
    TagModule,
    ButtonModule,
    CarouselComponent,
    CurrencyPipe,
    DiscountTagComponent,
    NgIf,
    MatButton,
    MatIconModule,
    CartCanvasComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productId: number = 0;
  showCartSpinner = false;
  showBuySpinner = false;

  constructor(private route: ActivatedRoute, private productService: ProductService, private sanitizer: DomSanitizer, private userAuthService: AuthUserServiceService, private router: Router, private userService: UserService, private cartService: CartService, private snackBar: MatSnackBar
    , private cartUpdateService: UpdateCartService, private checkOutShareResource: CheckoutResourcesService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Access the productId from the URL parameters
      this.productId = +params['id'];

      // Now you can use this.productId in your component
      // console.log('Product ID:', this.productId);
    });


    this.productService.getProductById(this.productId).subscribe(
      (response: any) => {
        this.productDetails = response;
        // console.log(this.productDetails)
        this.productDetails.images.forEach((image: any) => {
          const imageSrc = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + image.content);
          const imageAlt = "Product Image";
          this.imageList.unshift({imageSrc, imageAlt});
        })
      },
      (error) => {
        // console.log(error)
      }
    )
  }

  productDetails: any;
  imageList: any[] = [];

  addProductToShoppingCart(productId: number) {
    this.showCartSpinner = true;
    if (this.userAuthService.isLoggedIn()) {
      this.addToCart(productId);
    } else {
      this.router.navigate(['/login'])
    }
  }

  addToCart(productId: number) {
    setTimeout(() => {
      this.showCartSpinner = false;

      this.cartService.addProductToCart(this.userAuthService.getId(), productId).subscribe(
        (response) => {
          this.snackBar.open('Added to cart', 'OK')
          this.cartUpdateService.triggerUpdate();
        },
        (error) => {

          if (error.status === 400) {
            this.snackBar.open('Product Already added to the cart', 'OK')
            // console.log(error)

          } else {
            // console.log(error)
          }
        }
      )

    }, 2000)

  }

  getUserId() {
    return this.userAuthService.getId();
  }

  updateList() {

  }


  buyItem() {

    if (!this.userAuthService.isLoggedIn()) {
      this.router.navigate(['/login'])
    } else {

      const productId = this.productId;
      const quantity: number = 1;
      const dataToSend: {}[] = [{productId: productId, quantity: quantity}];
      const sendData = () => {
        this.checkOutShareResource.shareResource(dataToSend);
      }

      sendData();
      this.router.navigate(['/checkout'])
    }

  }

}
