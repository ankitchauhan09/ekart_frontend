import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AddProductComponent} from "../add-product/add-product.component";
import {OrderdetailsComponent} from "./order-summary/tabgroup/orderdetails/orderdetails.component";
import {AddressdetailsComponent} from "./order-summary/tabgroup/addressdetails/addressdetails.component";
import {PaymentdetailsComponent} from "./order-summary/tabgroup/paymentdetails/paymentdetails.component";
import {CheckoutResourcesService} from "../_services/shared_resources/checkout-resources.service";
import {ProductService} from "../_services/product.service";
import {OrderService} from "../_services/order.service";

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [
        MatTabGroup,
        MatTab,
        AddProductComponent,
        OrderdetailsComponent,
        AddressdetailsComponent,
        PaymentdetailsComponent
    ],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit {

    productAndQuantity: { [productId: number]: number } = {};
    addressFormData: FormData = new FormData();

    allorder: {}[] = [];
    user: any;
    allStatesOfIndia: any;
    addressList: any;

    totalAmount: number = 0;

    @ViewChild('tabGroup') tabGroup!: MatTabGroup;

    constructor(private route: ActivatedRoute, private router: Router, private sharedCheckoutResource: CheckoutResourcesService, private productService: ProductService, private orderService: OrderService) {
        this.allorder = this.route.snapshot.data['userId'].cartData;
        this.user = this.route.snapshot.data['userId'].user;
        this.allStatesOfIndia = this.route.snapshot.data['userId'].allStatesOfIndia;
        this.addressList = this.route.snapshot.data['userId'].addressList;

        // console.log('fadfasf',this.allorder)

        this.updateTotalAmount(this.allorder);

    }

    private updateTotalAmount(orders: {}[]) {
        orders.forEach((order: any) => {
            this.totalAmount += order.productId.productCost - (order.productId.productCost * order.productId.productDiscount / 100);
        })
    }

    onNextClickToAddress(costAndProductList: any) {
        this.totalAmount = costAndProductList.cost;
        this.productAndQuantity = costAndProductList.productList;
        const selectedIndex = this.tabGroup.selectedIndex;
        if (selectedIndex != null && selectedIndex < this.tabGroup._tabs.length - 1) {
            this.tabGroup.selectedIndex = selectedIndex + 1;
        }
    }


    ngOnInit(): void {
    }


    onNextClickToPayment(formData: FormData) {
        this.addressFormData = formData;
        const selectedIndex = this.tabGroup.selectedIndex;
        if (selectedIndex != null && selectedIndex < this.tabGroup._tabs.length - 1) {
            this.tabGroup.selectedIndex = selectedIndex + 1;
        }
        this.addressFormData.forEach((value, key) => {
            // console.log(value, key)
        })
    }

    placeOrder() {

        this.addressFormData.forEach((key, value)=>{
            // console.log(key, value)
        })


        const addressDto = {
            id: this.addressFormData.get('id'),
            street: this.addressFormData.get('street'),
            locality: this.addressFormData.get('locality'),
            state: this.addressFormData.get('state'),
            pincode: this.addressFormData.get('pincode'),
            city: this.addressFormData.get('city')
        }

        const datatosend = {
            address: addressDto,
            totalAmount: this.totalAmount,
          productAndQuantityList: this.productAndQuantity
        }

        this.orderService.placeOrder(datatosend, this.user.id).subscribe(
            (response) => {
                // console.log("success")
                // console.log(response)
            },
            (error) => {
                // console.log(error)
            }
        )

    }
}
