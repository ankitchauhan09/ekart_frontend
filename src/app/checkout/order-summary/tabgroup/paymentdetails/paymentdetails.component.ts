import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentService} from "../../../../_services/payment.service";
import {provideRouter, Router} from "@angular/router";
import {CurrencyPipe, DecimalPipe} from "@angular/common";

declare var Razorpay: any;

@Component({
    selector: 'checkout-paymentdetails',
    standalone: true,
    imports: [
        DecimalPipe,
        CurrencyPipe
    ],
    templateUrl: './paymentdetails.component.html',
    styleUrl: './paymentdetails.component.css'
})

export class PaymentdetailsComponent {
    @Input() totalAmount: number = 0;
    @Output() successEmit : EventEmitter<any> = new EventEmitter<any>();

    constructor(private paymentService: PaymentService, private router: Router) {
    }

    initiatePayment() {
        const paymentDetails = {"amount": this.totalAmount.toFixed(2)}
        this.paymentService.pay(paymentDetails).subscribe(
            (response: any) => {
                if (response.status === 'created') {
                    // console.log(response)
                    const RazorPayOptions = {
                        description: 'Order Payment',
                        currency: 'INR',
                        amount: response.amount,
                        order_id: response.id,
                        name: 'E-KART',
                        key: 'rzp_test_5MEEGqW9b9cCYZ',
                        prefill: {
                            name: '',
                            email: '',
                            phone: ''
                        },
                        "handler": function (response: any) {
                            const paymentSummar = {
                                paymentId: response.razorpay_payment_id,
                                order_id: response.razorpay_order_id,
                                payment_signatue: response.razorpay_signature
                            }
                            onSuccess();

                        },
                        theme: {
                            color: '#ffffff'
                        },
                        modal: {
                            onDismiss: () => {
                                console.log('Dismissed')
                            }
                        }
                    }

                    let raz = new Razorpay(RazorPayOptions);

                    raz.on('payment.failed', function (response: any) {
                        alert(response.error.code);
                        alert(response.error.description);
                        alert(response.error.source);
                        alert(response.error.step);
                        alert(response.error.reason);
                        alert(response.error.metadata.order_id);
                        alert(response.error.metadata.payment_id);
                    });
                    raz.open()

                    const onSuccess = ()=>{
                        alert("Order received successfully... Thanks for shopping")
                        this.successEmit.emit();
                    }
                }
            },
            (error) => {
            }
        );

    }

    checkAmount() {
        return this.totalAmount > 1;
    }
}
