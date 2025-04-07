import { Routes } from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {UnderConstructionComponent} from './shared/under-construction/under-construction.component';
import {HomeComponent} from './pages/home/home.component';
import {CreateComponent} from './pages/create/create.component';


export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'apps', component: UnderConstructionComponent},
  {path: 'login', component: UnderConstructionComponent},
  {path: 'dashboards', component: UnderConstructionComponent},
  {path: 'plans', component: UnderConstructionComponent},
  {path: 'profile', component: UnderConstructionComponent},
  {path: 'filters', component: UnderConstructionComponent},
  {path: 'projects', component: UnderConstructionComponent},
  {path: 'teams', component: UnderConstructionComponent},
  {path: 'create', component: CreateComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent},
];
