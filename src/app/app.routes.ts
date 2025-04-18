import { Routes } from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {UnderConstructionComponent} from './shared/under-construction/under-construction.component';
import {HomeComponent} from './pages/home/home.component';
import {CreateIssueComponent} from './pages/create-issue/create-issue.component';
import {ProjectComponent} from './pages/project/project.component';


export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'apps', component: UnderConstructionComponent},
  {path: 'login', component: UnderConstructionComponent},
  {path: 'dashboards', component: UnderConstructionComponent},
  {path: 'plans', component: UnderConstructionComponent},
  {path: 'profile', component: UnderConstructionComponent},
  {path: 'filters', component: UnderConstructionComponent},
  {path: 'projects/:id', component: ProjectComponent},
  {path: 'teams', component: UnderConstructionComponent},
  {path: 'create', component: CreateIssueComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent},
];
