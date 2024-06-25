import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path:'', redirectTo:'register', pathMatch: 'full'
    },
    {
        path: 'register',
        loadComponent: ()=> import ("./auth/components/register/register.component").then(component => component.RegisterComponent)
    },
    {
        path: 'login', 
        loadComponent: ()=> import ("./auth/components/login/login.component").then(component => component.LoginComponent),
    },
    {
        path: 'home', 
        loadComponent: ()=> import ("./modules/components/home/home.component").then(component => component.HomeComponent),
        canActivate : [AuthGuard]
    },
];
{}