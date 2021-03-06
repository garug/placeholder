import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequestInterceptor } from './interceptor';
import { JobsComponent } from './jobs/list-jobs.component';
import { JobsNewComponent } from './jobs/new-jobs.component';
import { LoginComponent } from './login/login.component';
import { TaskService } from './tasks/task.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobService } from './jobs/job.service';
import { DetailJobComponent } from './jobs/detail-jobs.component';
import { TasksComponent } from './tasks/list-tasks.component';
import { FormTaskComponent } from './tasks/form-tasks.component';
import { DetailTaskComponent } from './tasks/detail-tasks.component';
import { AuthGuard } from './AuthGuard.service';
import { AdminGuard } from './AdminGuard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JobsComponent,
    JobsNewComponent,
    DetailJobComponent,
    TasksComponent,
    FormTaskComponent,
    DetailTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    JobService,
    TaskService,
    AuthGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
