import {Component, HostListener, OnInit} from '@angular/core';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './shared/footer/footer.component';
import {AuthService} from './services/auth.service';
import {CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'gojira';
  isSidebarVisible: boolean = true;
  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;

  constructor(
    public authService: AuthService,
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (window.innerWidth < 768) {
      this.isSidebarVisible = false;
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  get sidebarMargin(): string {
    return this.isSidebarVisible ? '13rem' : '0';
  }
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
