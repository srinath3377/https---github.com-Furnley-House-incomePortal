import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', 
    pathMatch: 'full', 
    redirectTo: 'authentication' 
  },{
    path: 'authentication',
    loadChildren: () => 
      import('./modules/authentication/authentication.module').then(
        m => m.AuthenticationModule
      )
  },{
    path: 'layout',
    // canActivate: [AuthGuard],
    loadChildren: () => 
      import('./layout/layout.module').then(
        m => m.LayoutModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
