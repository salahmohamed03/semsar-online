import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListwithusComponent } from './pages/listwithus/listwithus.component';
import { companyGuard } from './Guards/company.guard';
import { YourcompanyComponent } from './pages/yourcompany/yourcompany.component';

export const routes: Routes = [
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'profile',
    component: ProfileComponent,
  },
  {
    path:'listwithus',
    component: ListwithusComponent,
    canActivate: [companyGuard]
  },
  {
    path:'company',
    component: YourcompanyComponent,
  }
];
