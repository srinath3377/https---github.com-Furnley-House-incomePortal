import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './authentication-module/authentication/signin/signin.component';
import { LayoutComponent } from './layout/layout.component';
import { DefaultComponent } from './layout/components/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SidenavComponent } from './layout/components/sidenav/sidenav.component';

const routes: Routes = [
  { path: '', 
    pathMatch: 'full', 
    redirectTo: 'authentication/signin' 
  },{
    path: "authentication/signin",
    component: SigninComponent
  },{
    path: 'authentication',
    loadChildren: () => 
      import('./authentication-module/authentication/authentication.module').then(
        m => m.AuthenticationModule),
        component : SigninComponent
  },{
    path: 'dashboard',
    loadChildren: () => 
      import('./modules/dashboard/dashboard.module').then(
        m => m.DashboardModule),
        component : DashboardComponent
  },

  // {
  //   path: "dashboard",
  //   component: LayoutComponent,
  //   // children: [
  //   //   {
  //   //     path: "",
  //   //     component: DashboardComponent

  //   //   }

  //   // ]
  // },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
