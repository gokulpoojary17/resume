import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ResumeComponent } from './resume/resume.component';
import { ResumeviewComponent } from './resumeview/resumeview.component';
import { AdminviewComponent } from './adminview/adminview.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminComponent},
  {path:"user",component:UserComponent},
  {path:"resume",component:ResumeComponent},
  {path:"view",component:ResumeviewComponent},
  {path:"adminview",component:AdminviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
