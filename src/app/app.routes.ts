import { Routes } from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {UnderConstructionComponent} from './shared/under-construction/under-construction.component';
import {HomeComponent} from './pages/home/home.component';
import {CreateIssueComponent} from './pages/create-issue/create-issue.component';
import {ProjectComponent} from './pages/project/project.component';
import {AuthComponent} from './pages/auth/auth.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {IssueComponent} from './pages/issue/issue.component';
import {AuthGuard} from './guards/auth.guard';


export const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'apps', component: UnderConstructionComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent},
  {path: 'dashboards', component: UnderConstructionComponent, canActivate: [AuthGuard]},
  {path: 'plans', component: UnderConstructionComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'filters', component: UnderConstructionComponent, canActivate: [AuthGuard]},
  {path: 'projects/:id', component: ProjectComponent, canActivate: [AuthGuard]},
  {path: 'teams', component: UnderConstructionComponent, canActivate: [AuthGuard]},
  {path: 'create', component: CreateIssueComponent, canActivate: [AuthGuard]},
  {path: 'issues/:id', component: IssueComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];
