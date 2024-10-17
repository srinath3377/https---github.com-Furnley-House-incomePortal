import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SigninComponent } from './modules/authentication/signin/signin.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', 
    pathMatch: 'full', 
    redirectTo: 'authentication/signin' 
  },{
    path: 'authentication',
    loadChildren: () => 
      import('./modules/authentication/authentication.module').then(
        m => m.AuthenticationModule
      )
  },{ path: '', 
    component: LayoutComponent,
    children: [{
      path: 'dashboard',
      loadChildren: () => 
        import('./modules/dashboard/dashboard.module').then(
          m => m.DashboardModule),
          component : DashboardComponent
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
