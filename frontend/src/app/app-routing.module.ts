import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JobsComponent } from './jobs/list-jobs.component';
import { JobsNewComponent } from './jobs/new-jobs.component';

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
    component: JobsNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
