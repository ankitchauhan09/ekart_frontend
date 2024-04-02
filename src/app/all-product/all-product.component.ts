import {Component, Inject, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../_services/product.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatSuffix} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import Swal from "sweetalert2";


@Component({
  selector: 'product-detail-modal',
  standalone: true,
  imports: [
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatList,
    MatListItem,
    NgForOf,
    MatGridList,
    MatGridTile,
    NgOptimizedImage,
    MatIcon
  ],
  templateUrl: './product-details.html',
  styleUrl: './all-product.component.css'
})
export class ProductDetails implements OnInit {

  id: number = 0;

  productDetails: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private productService: ProductService, private sanitizer: DomSanitizer) {
    this.id = data.id
    this.productDetails = data.productDetails;
    this.getAllImagesByProductId();
  }


  getAllImagesByProductId() {

    this.productService.getProductImagesById(this.id).subscribe(
      (response: any) => {

        response.forEach((event: any) => {
          const image = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + event.content);
          this.images.unshift(image)
        })
      },
      (error) => {
        // console.log(error)
      }
    )

  }

  images: SafeUrl[] = [];


  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [
    MatPaginator,
    MatList,
    MatListItem,
    MatDivider,
    MatButton,
    NgForOf,
    MatSuffix,
    MatIconModule,
    MatIconButton
  ],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css'
})

export class AllProductComponent implements OnInit {
  constructor(private router: Router, private productService: ProductService) {
  }

  private dialoge = inject(MatDialog);

  productList: any[] = [];

  length = 0;
  pageSize = 5;
  pageIndex = 0;

  fetchProducts(pageIndex: number, pageSize: number) {
    this.productService.getAllProducts(pageIndex, pageSize).subscribe((response: any) => {
      this.productList = response

      const startIndex = 0;
      const endIndex = startIndex + pageSize;

      this.pageProductList = this.productList.slice(startIndex, endIndex);

    }, (error) => {
      // console.log(error))
    })
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

  ngOnInit(): void {
    this.productService.getProductCount().subscribe(
      (response: any) => {
        this.length = response.count
      },
      (error) => {
        // console.log(error)
        this.length = 0
      }
    )


    this.productService.getAllProducts(this.pageIndex, this.pageSize).subscribe((response: any) => {
      this.productList = response

      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      this.pageProductList = this.productList.slice(startIndex, endIndex);

    }, (error) => {
      // console.log(error)
    })
    // console.log(this.productList)
  }

  deleteProduct(id: number) {
    this.productService.deleteProductById(id).subscribe(
      (response: any) => {
        if (response.status === true) {
          Swal.fire({
            title: "Product Deleted Successfully!",
            icon: "success",
            confirmButtonText: "Done"
          })
            .then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/home'])
              } else {
                Swal.fire("ERROR", "Something went wrong", "error")
              }
            });
        }
      },
      (error) => {
        // console.log (error)
      }
    )
  }

  showProductDetails(id: number) {
    this.productService.getProductById(id).subscribe(
      (response) => {
        // console.log(response);
        const detailDialog = this.dialoge.open(ProductDetails, {
          data: {id: id, productDetails: response}
        });
      },
      (error) => {
        // console.log(error)
      }
    )
  }
}
