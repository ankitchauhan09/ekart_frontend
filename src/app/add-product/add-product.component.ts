import {Component, OnInit, ViewChild} from '@angular/core';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormArray, FormsModule, NgForm} from "@angular/forms";
import {CategoryService} from "../_services/category.service";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {DragDirective} from "../_services/drag.directive";
import {ProductService} from "../_services/product.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [
        MatLabel,
        MatFormFieldModule,
        MatOption,
        MatSelect,
        MatInputModule,
        FormsModule,
        NgForOf,
        MatButton,
        MatIcon,
        MatGridList,
        MatGridTile
    ],
    templateUrl: './add-product.component.html',
    styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
    constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) {
        this.fetchCategory()
    }

    @ViewChild(DragDirective) dragDirective!: DragDirective;

    addProduct(loginForm: NgForm) {

        const formData = new FormData();

        formData.append('productName', loginForm.value.productName);
        formData.append('productCost', loginForm.value.productCost);
        formData.append('productDiscount', loginForm.value.productDiscount);
        formData.append('productDescription', loginForm.value.productDescription);
        formData.append('productQuantity', loginForm.value.productQuantity);

        for (let file of this.imageList) {
            formData.append('file', file, file.name);
        }

        this.productService.addPost(formData, this.categoryId).subscribe(
            (response) => {
                Swal.fire({
                    title: "Product Added Successfully!",
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
            },
            (error) => {
                // console.log(error)
            }
        )

    }

    categoryId: string = '';

    fetchCategory(): any {
        return this.categoryService.getAllCategories().subscribe(
            (response: any) => {
                this.categoryList = response;
            },
            (error) => {
                // console.log(error)
                // console.log(error.status)
            }
        );
    }

    public categoryList: any[] = [];

    ngOnInit(): void {
    }

    imageList: File[] = [];

    imageUrl: string[] = [];

    updateImageList(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (typeof e.target?.result === "string") {
                        this.imageUrl.unshift(e.target?.result);
                        this.imageList.unshift(files[i]);
                    }
                }
                reader.readAsDataURL(files[i]);
            }
        }
    }

    removeImage(index: number) {
        this.imageUrl.splice(index, 1);
        this.imageList.splice(index, 1);
    }


}
