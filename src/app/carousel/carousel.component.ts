import {Component, inject, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";

interface carouselImages{
  imageSrc : string;
  imageAlt : string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit{

  @Input() images : carouselImages[] = [];
  @Input() indicators = true;
  @Input() controls = true;


  selectedIndex = 0;
  ngOnInit(): void {
  }

  selectedImage(i: number) {
    this.selectedIndex = i;
  }
}
