import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-under-construction',
  imports: [
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.css'
})
export class UnderConstructionComponent {
  reloadPage() {
     window.location.reload();
   }
}
