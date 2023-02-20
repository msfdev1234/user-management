import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [{path:'signup', component:SignupComponent}, 
                        {path:'login', component:LoginComponent}, 
                        {path:'', component:LoginComponent}, 
                        {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


