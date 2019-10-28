import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JobsComponent } from './jobs/list-jobs.component';
import { JobsNewComponent } from './jobs/new-jobs.component';
import { DetailJobComponent } from './jobs/detail-jobs.component';
import { TasksComponent } from './tasks/list-tasks.component';
import { FormTaskComponent } from './tasks/form-tasks.component';
import { DetailTaskComponent } from './tasks/detail-tasks.component';
import { AuthGuard } from './AuthGuard.service';
import { AdminGuard } from './AdminGuard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'jobs',
    component: JobsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jobs/new',
    component: JobsNewComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'jobs/:id',
    component: DetailJobComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jobs/:id/edit',
    component: JobsNewComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:id',
    component: DetailTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:id/edit',
    component: FormTaskComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
