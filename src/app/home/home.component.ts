  import {Component, inject} from '@angular/core';
  import {
      MatCard,
      MatCardActions,
      MatCardContent,
      MatCardHeader, MatCardImage,
      MatCardSubtitle,
      MatCardTitle
  } from "@angular/material/card";
  import {MatButton, MatIconButton} from "@angular/material/button";
  import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
  import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
  import {MatOption, MatSelect} from "@angular/material/select";
  import {MatSidenavModule} from '@angular/material/sidenav';
  import {MatList, MatListItem} from "@angular/material/list";
  import {MatDivider} from "@angular/material/divider";
  import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
  import {AdminComponent} from "../admin/admin.component";
  import {MatToolbar} from "@angular/material/toolbar";
  import {MatIcon} from "@angular/material/icon";
  import {MatPaginator} from "@angular/material/paginator";
  import {Router} from "@angular/router";
  import {ProductService} from "../_services/product.service";
  import {MatDialog} from "@angular/material/dialog";
  import {CategoryService} from "../_services/category.service";
  import {CategoryDto} from "./CategoryDto";
  import {FormsModule} from "@angular/forms";
  import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
  import {ProductImage} from "./ProductImage";
  import Swal from "sweetalert2";
  import {CartCanvasComponent} from "../cart-canvas/cart-canvas.component";
  import {AuthUserServiceService} from "../_services/user-auth/auth-user-service.service";
  import {MatInput} from "@angular/material/input";

  @Component({
      selector: 'app-home',
      standalone: true,
    imports: [
      MatCard,
      MatCardHeader,
      MatCardTitle,
      MatCardSubtitle,
      MatCardContent,
      MatCardActions,
      MatButton,
      MatCardImage,
      MatDrawerContainer,
      MatDrawer,
      MatFormField,
      MatLabel,
      MatSelect,
      MatOption,
      MatSidenavModule,
      MatList,
      MatListItem,
      MatDivider,
      NgForOf,
      AdminComponent,
      MatToolbar,
      MatIcon,
      MatIconButton,
      MatPaginator,
      FormsModule,
      NgOptimizedImage,
      CartCanvasComponent,
      NgIf,
      MatInput,
      MatSuffix
    ],
      templateUrl: './home.component.html',
      styleUrl: './home.component.css'
  })
  export class HomeComponent {

      mode = 'over';
      public categoryList: any[] = [];

      searchBarContent = '';


      filterProducts(button: any) {
          // console.log(button.value)
      }

      updateCategory() {
          this.category.getAllCategories().subscribe(
              (response: any) => {
                  response.forEach((cat: any) => {
                      // console.log(cat)
                      const category = new CategoryDto(cat.id, cat.categoryName);
                      this.categoryList.unshift(category);
                  })
              },
              (error) => {
                  console.log(error);
              }
          )
      }

      constructor(private router: Router, private productService: ProductService, private category: CategoryService, private sanitizer: DomSanitizer, private userAuthService: AuthUserServiceService) {
          this.updateCategory();
          this.fetchProducts(0, 5);
      }

      private dialoge = inject(MatDialog);

      productList: any[] = [];
      productImageList: ProductImage[] = [];
      length = 0;
      pageSize = 5;
      pageIndex = 0;

      fetchProducts(pageIndex: number, pageSize: number) {
          this.productService.getAllProducts(pageIndex, pageSize).subscribe((response: any) => {
              this.productList = response
              this.productList.forEach((product) => {
                  // console.log(product )
                  let imagelist : any[] = [];
                  product.images.forEach((image:any)=>{
                      const updateContent = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+image.content);
                      imagelist.unshift(updateContent);
                  })
                  const productImage = new ProductImage(imagelist , product.id);
                  this.productImageList.unshift(productImage);
              })

              const startIndex = 0;
              const endIndex = startIndex + pageSize;

              this.pageProductList = this.productList.slice(startIndex, endIndex);

          }, (error) => console.log(error))
      }


      pageEvent(event: any) {
          // console.log(event);

          this.pageSize = event.pageSize;
          this.pageIndex = event.pageIndex;
          this.length = event.length;

          const startIndex = this.pageIndex * this.pageSize;
          const endIndex = startIndex + this.pageSize;

          this.fetchProducts(event.pageIndex, event.pageSize);
      }

      pageProductList: any[] = [];
    value: any = '';

    hasValue(){
      return this.value.length>=1;
    }

      ngOnInit(): void {
          this.productService.getProductCount().subscribe(
              (response: any) => {
                  this.length = response.count
              },
              (error) => {
                  console.log(error)
                  this.length = 0
              }
          )


          this.productService.getAllProducts(this.pageIndex, this.pageSize, "").subscribe((response: any) => {
              this.productList = response

              const startIndex = this.pageIndex * this.pageSize;
              const endIndex = startIndex + this.pageSize;

              this.pageProductList = this.productList.slice(startIndex, endIndex);

          }, (error) => console.log(error))
      }

      getImage(index: any): any {
          const product = this.productImageList.at(index);
          if (product) {
              // const image = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + product.imageList[0].content);
              // return image;
          } else {
              console.warn(`No image found for product at index ${index}`);
          }
      }

    getProductImage(id : number) {
        let imageUrl : SafeUrl = '';
        this.productImageList.forEach((product)=>{
          if(product.productId == id){
            imageUrl =  product.imageList.at(0)!;
          }
        })
      return imageUrl;
    }

    navigateToProductDetails(productId: number) {
      this.router.navigate(['/product-details', productId]);
    }

      getUserId() {
          return this.userAuthService.getId();
      }

    searchKeyword() {
      // console.log(this.value)
      this.productService.getAllProducts(this.pageIndex, this.pageSize, this.value).subscribe((response: any) => {
        this.productList = response

        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        this.pageProductList = this.productList.slice(startIndex, endIndex);

      }, (error) => console.log(error))
    }
  }
