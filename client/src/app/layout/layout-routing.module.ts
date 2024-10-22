import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';


  const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'dashboard',
          canActivate: [AuthGuard],
          loadChildren: () =>
            import('../modules/dashboard/dashboard.module').then(
              m => m.DashboardModule
            ),
        }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class LayoutRoutingModule { }
