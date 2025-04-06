import {Component, linkedSignal} from '@angular/core';
import {MatDivider} from '@angular/material/divider';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatList, MatListItem} from '@angular/material/list';
import {DatePipe} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';

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
    MatTab
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Data for Recent Projects Section
  recentProjects = [
    { name: 'Project Alpha', description: 'Building a new Alpha system', lastUpdated: new Date() },
    { name: 'Project Beta', description: 'Improving Beta features', lastUpdated: new Date() },
    { name: 'Project Gamma', description: 'Revamping Gamma design', lastUpdated: new Date() },
  ];

  // Navbar and tabs data
  navbarOptions = [
    { name: 'Worked on' },
    { name: 'Viewed' },
    { name: 'Assigned to me', counter: 3 },
    { name: 'Boards' },
  ];

  // Active tab
  activeTab = this.navbarOptions[0].name;

  // List data for tabs
  workedOnList = ['Feature 1', 'Bug Fix 23', 'Database Migration'];
  viewedList = ['Report Analysis', 'User Module'];
  assignedToMeList = ['Implement UI Changes', 'Fix Critical Bug'];

  // Method to set the active tab
  setActiveTab(option: any): void {
    this.activeTab = option.name;
  }

  protected readonly linkedSignal = linkedSignal;
}
