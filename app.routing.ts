import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { AfricaGuide } from './app/africa';
import { WestGuide } from './app/west';
import { PublicComponent } from './app/public.component';
import { HomeComponent } from './app/home.component';
import { AboutComponent } from './app/about.component';

const GUIDE_ROUTES: Route[] = [
  { path: 'africa-guide', component: AfricaGuide },
  { path: 'west-guide', component: WestGuide }
]
const CDK_ROUTES: Route[] = [

]
const ALL_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'public', component: PublicComponent },
  { path: 'cdk', children: CDK_ROUTES },
  { path: 'guides', children: GUIDE_ROUTES },
  { path: '**', redirectTo: 'home' }
]
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(ALL_ROUTES);