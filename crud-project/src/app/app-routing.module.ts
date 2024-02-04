import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudTaskComponent } from './components/crud-task/crud-task.component';
import { LoginComponent } from './components/login/login.component';
import { CanactService } from './services/canact.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    canActivate: [CanactService],
    children: [
      { path: 'crud-task', component: CrudTaskComponent },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
