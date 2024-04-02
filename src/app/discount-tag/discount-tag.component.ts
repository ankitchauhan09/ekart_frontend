import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-discount-tag',
  standalone: true,
  imports: [],
  templateUrl: './discount-tag.component.html',
  styleUrl: './discount-tag.component.css'
})
export class DiscountTagComponent {
  @Input() discountTag : number = 0;

}

