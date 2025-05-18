import {Component, ViewChild} from '@angular/core';
import {MatDivider} from '@angular/material/divider';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatList, MatListItem} from '@angular/material/list';
import {DatePipe, NgClass} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {CdkPortal} from '@angular/cdk/portal';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {CreateProjectComponent} from '../create-project/create-project.component';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {Subscription} from 'rxjs';
import Project from '../../types/Project';

@Component({
  selector: 'app-home',
  imports: [
    MatDivider,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListItem,
    MatCardTitle,
    MatCardSubtitle,
    DatePipe,
    MatCheckbox,
    MatTabGroup,
    MatTab,
    MatIcon,
    RouterLink,
    CdkPortal,
    CreateProjectComponent,
    FormsModule,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(CdkPortal) portal!: CdkPortal;
  protected projects: Project[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private overlay: Overlay,
    private projectService: ProjectService,
  ) {
    this.subscription.add(
      this.projectService.projectsCreated$.subscribe(() => {
        this.loadProjects();
      })
    );
  }

  loadProjects() {
    this.projectService.getMyProjects().subscribe(projects => {
      this.projects = projects as Project[];
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navbarOptions = [
    { name: 'Worked on' },
    { name: 'Viewed' },
    { name: 'Assigned to me', counter: 3 },
    { name: 'Boards' },
  ];

  workedOnList = [
    { text: 'Task 1', checked: false },
    { text: 'Task 2', checked: false },
    { text: 'Task 3', checked: false }
  ];

  viewedList = ['Report Analysis', 'User Module'];
  assignedToMeList = ['Implement UI Changes', 'Fix Critical Bug'];

  openCreateProjectModal() {
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
    const subscription = this.projectService.projectsCreated$.subscribe(() => {
      overlayRef.detach();
      subscription.unsubscribe();
    });

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

  }

  protected readonly Date = Date;
}
