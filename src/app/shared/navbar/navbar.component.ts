import {Component, Output, EventEmitter} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatBadge} from '@angular/material/badge';
 import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatBadge,
    MatTooltip
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() isVisible: boolean = true;
  @Output() toggle = new EventEmitter<void>();

}
