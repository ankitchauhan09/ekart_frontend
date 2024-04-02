import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {UserService} from "../../../../_services/user.service";
import {AuthUserServiceService} from "../../../../_services/user-auth/auth-user-service.service";
import Swal from "sweetalert2";


@Component({
    selector: 'checkout-addressdetails',
    standalone: true,
    imports: [
        NgForOf,
        PaginatorModule,
        MatRadioButton,
        MatRadioGroup,
        NgIf
    ],
    templateUrl: './addressdetails.component.html',
    styleUrl: './addressdetails.component.css'
})
export class AddressdetailsComponent implements OnInit {

    existing: string = '0';
    @Input() states: any = [];
    @Output() nextEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Input() addressList: any = [];
    stateIndex: number = 0;

    //form fields
    street: string = '';
    city: string = '';
    pin: string = '';
    locality: string = '';
    state: string = "";
    addressid : string = '';

    ngOnInit(): void {
        // console.log(this.states)
        // console.log(this.addressList)
    }

    constructor(private userService: UserService, private userAuthService: AuthUserServiceService) {
    }

    // Add this method in your component class
    districts: any;

    printState() {
        this.state = this.states.states[this.stateIndex].state;
        this.districts = this.states.states[this.stateIndex].districts;
    }

    next() {
        let formData = new FormData();
        if (this.existing === '0') {
            if (!(this.locality.trim() == '' || this.street.trim() == '' || this.pin.trim() == '' || this.state.trim() == '' || this.city.trim() == '')) {
                formData.append('locality', this.locality)
                formData.append('street', this.street)
                formData.append('state', this.state)
                formData.append('pincode', this.pin)
                formData.append('city', this.city)
                formData.append('id', this.addressid)
            }
        } else {
            if (this.selectedAddressId != 0) {
                let addressForForm;
                for (let address of this.addressList) {
                    if (address.id == this.selectedAddressId) {
                        addressForForm = address;
                        break;
                    }
                }
                formData.append('locality', addressForForm.locality)
                formData.append('street', addressForForm.street)
                formData.append('state', addressForForm.state)
                formData.append('pincode', addressForForm.pincode)
                formData.append('city', addressForForm.city)
                formData.append('id', addressForForm.id)
            }
        }

        if (this.selectedAddressId != 0 || this.isFormDataValid(formData)) {
            this.nextEmitter.emit(formData)
        } else {
            alert("Please select a valid address or add it manually...")
        }
    }

    private isFormDataValid(formData:FormData) {
        const keys = ['locality', 'street', 'city', 'pincode', 'state'];
        return keys.every(key => formData.has(key) && formData.get(key)?.toString() != '');
    }

    //selected addressId if there are existing addresses
    selectedAddressId: number = 0;

    printAddressId(event: any) {
        let id = event.value.toString();
        this.selectedAddressId = parseInt(id);
    }

    addAddress() {
        let formData = {
            locality: this.locality,
            street: this.street,
            pincode: this.pin,
            state: this.state,
            city: this.city
        }

        if (this.locality.trim() == '' || this.street.trim() == '' || this.pin.trim() == '' || this.state.trim() == '' || this.city.trim() == '') {
            alert("Please fill all the details");
        } else {
            this.userService.addAddress(formData, this.userAuthService.getId()).subscribe(
                (response:any) => {
                    this.addressid = response.id;
                    Swal.fire({
                        title: "Address Added Successfully!",
                        icon: "success",
                        confirmButtonText: "Done"
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                // console.log(result)
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
    }
}
