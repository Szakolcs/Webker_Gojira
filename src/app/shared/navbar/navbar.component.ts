import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatBadge} from '@angular/material/badge';
 import {MatTooltip} from '@angular/material/tooltip';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {CdkPortal, PortalModule} from '@angular/cdk/portal';
import {CreateIssueComponent} from '../../pages/create-issue/create-issue.component';
import projects from '../../database/projects';

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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {
  @Input() isVisible: boolean = true;
  @Output() toggle = new EventEmitter<void>();
  @ViewChild(CdkPortal) portal!: CdkPortal;

  constructor(private overlay: Overlay) {}

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
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

  }

  protected readonly projects = projects;
  isProjectExpanded: boolean = false;
}
