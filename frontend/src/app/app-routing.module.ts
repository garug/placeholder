import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JobsComponent } from './jobs/list-jobs.component';
import { JobsNewComponent } from './jobs/new-jobs.component';
import { DetailJobComponent } from './jobs/detail-jobs.component';
import { TasksComponent } from './tasks/list-tasks.component';
import { FormTaskComponent } from './tasks/form-tasks.component';
import { DetailTaskComponent } from './tasks/detail-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'jobs/new',
    component: JobsNewComponent
  },
  {
    path: 'jobs/:id',
    component: DetailJobComponent
  },
  {
    path: 'jobs/:id/edit',
    component: JobsNewComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'tasks/:id',
    component: DetailTaskComponent
  },
  {
    path: 'tasks/:id/edit',
    component: FormTaskComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
