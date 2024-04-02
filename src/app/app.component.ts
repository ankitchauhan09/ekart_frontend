import {Component} from '@angular/core';
import {CommonModule, IMAGE_CONFIG} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {CarouselComponent} from "./carousel/carousel.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, HttpClientModule, MatToolbarModule, MatFormField, MatIcon, CarouselComponent],
    providers: [HttpClient, {
        provide: IMAGE_CONFIG,
        useValue: {
            disableImageSizeWarning: true,
            disableImageLazyLoadWarning: true
        }
    }
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'ecommerece-project';

}
