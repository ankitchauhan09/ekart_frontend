import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Input} from '@angular/core'
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'checkout-orderdetails',
    standalone: true,
    imports: [
        NgForOf,
        MatSelect,
        MatOption,
        FormsModule,
        CurrencyPipe
    ],
    templateUrl: './orderdetails.component.html',
    styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent implements OnInit {

    @Input() allOrders: any[] = [];
    @Input() user: {} = {};
    @Output() next: EventEmitter<any> = new EventEmitter<any>();

    totalCost: number = 0;

    productQuantity: { [productId: number]: number } = {};


    updateQuantity(id: number) {
        let quantity: any = this.productQuantity[id];
        this.productQuantity[id] = parseInt(quantity);
        this.updateTotalCost();
    }

    updateTotalCost() {
        this.totalCost = 0;
        for (let products of this.allOrders) {
            const productCost = products.productId.productCost;
            const productDiscount = products.productId.productDiscount;
            const quantity = this.productQuantity[products.productId.id];
            this.totalCost += +((productCost - (productCost * productDiscount / 100)) * quantity).toFixed(2);
        }
        // console.log(this.totalCost)
    }


    constructor() {
        // console.log('aall', this.allOrders)

    }


    ngOnInit(): void {
        for(let orders of this.allOrders){
            this.productQuantity[orders.productId.id] = orders.quantity;
            this.totalCost += (orders.productId.productCost - orders.productId.productCost * orders.productId.productDiscount/100) * orders.quantity;
        }
    }


    onNextClick() {
        const costAndProductList = {
            productList : this.productQuantity,
            cost : this.totalCost
        }
        this.next.emit(costAndProductList);
    }
}
