import {Component, Output, EventEmitter, ViewChild, HostListener, OnDestroy} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Input} from '@angular/core';
import {Subscription} from 'rxjs';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MatBadge} from '@angular/material/badge';
import {MatTooltip} from '@angular/material/tooltip';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {CdkPortal, PortalModule} from '@angular/cdk/portal';
import {CreateIssueComponent} from '../../pages/create-issue/create-issue.component';
import {NgClass, NgStyle} from '@angular/common';
import {ProjectService} from '../../services/project.service';
import User from '../../types/User';
import Project from '../../types/Project';
import {IssueService} from '../../services/issue.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatBadge,
    MatTooltip,
    PortalModule,
    CreateIssueComponent,
    NgStyle,
    NgClass,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent implements OnDestroy {
  @Input() isVisible: boolean = true;
  @Output() toggle = new EventEmitter<void>();
  @ViewChild(CdkPortal) portal!: CdkPortal;

  private subscriptions: Subscription = new Subscription();

  isMobileView: boolean = false;
  isMobileMenuOpen: boolean = false;
  protected projects: Project[] = [];
  private currentUser: User | null = null;

  constructor(
    private overlay: Overlay,
    public authService: AuthService,
    private projectService: ProjectService,
    private issueService: IssueService,
  ) {
    this.subscriptions.add(
      this.issueService.issueCreated$.subscribe(() => {
        this.loadProjects();
      })
    );
    this.authService.UserData.subscribe((user: User | null) => {
      this.currentUser = user;

      if (this.currentUser) {
        this.loadProjects();
      }
    });
    this.checkScreenSize();
  }
  loadProjects() {
    this.projectService.getMyProjects().subscribe(projects => {
      this.projects = projects as Project[];
    });
  }
  logout(): void {
    this.authService.signOut().then(ignored => {
      this.toggle.emit();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth < 768;
    if (this.isMobileView) {
      this.isVisible = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isVisible = this.isMobileMenuOpen;
  }

  openModal() {
    // noinspection DuplicatedCode
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      height: '80%',
    });

    const overlayRef = this.overlay.create(config);
    const overlayElement = overlayRef.overlayElement;
    overlayElement.style.background = 'white';
    overlayRef.attach(this.portal);
    const subscription = this.issueService.issueCreated$.subscribe(() => {
      overlayRef.detach();
      subscription.unsubscribe();
    });
    const backdropSub = overlayRef.backdropClick().subscribe(() => overlayRef.detach());
    this.subscriptions.add(backdropSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  isProjectExpanded: boolean = false;

  get boxShadow() {
    return this.isVisible ? '13rem .4rem .8rem rgba(0, 0, 0, 0.1)' : '0 .4rem .8rem rgba(0, 0, 0, 0.1)';
  }
}
