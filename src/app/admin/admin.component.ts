import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatToolbarModule, MatButton],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
}
