import { Routes } from '@angular/router';

export const routes: Routes = [
    { path:'', redirectTo:'/home', pathMatch:'full'},
    { path:'home', pathMatch: 'full', loadComponent:()=>import('./features/home/home').then(m=>m.Home)},
    { path:'register', loadComponent:()=>import('./features/register/register').then(m=>m.Register)},
    { path:'login', loadComponent:()=>import('./features/login/login').then(m=>m.Login)}
    
];
