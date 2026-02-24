import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path:'', redirectTo:'/home', pathMatch:'full'},
    { path:'home', pathMatch: 'full', loadComponent:()=>import('./features/home/home').then(m=>m.Home)},
    { path:'register', loadComponent:()=>import('./features/register/register').then(m=>m.Register)},
    { path:'login', loadComponent:()=>import('./features/login/login').then(m=>m.Login)},
    { path:'dashboard',canActivate:[authGuard], loadComponent:()=>import('./features/dashboard/dashboard').then(m=>m.Dashboard)},
    { path:'favorites', canActivate:[authGuard], loadComponent:()=>import('./features/favorites/favorites').then(m=>m.FavoritesComponent)},
    { path:'job-details/:id', loadComponent:()=>import('./features/job-details/job-details').then(m=>m.JobDetailsComponent)}
];
