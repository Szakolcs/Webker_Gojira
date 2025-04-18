import { Component } from '@angular/core';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gojira';
  isSidebarVisible: boolean = true;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  get sidebarMargin(): string {
    return this.isSidebarVisible ? '13rem' : '0';
  }
}
