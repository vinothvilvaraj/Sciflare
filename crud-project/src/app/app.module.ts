import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudTaskComponent } from './components/crud-task/crud-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CanactService } from './services/canact.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LoaderViewComponent } from './components/loader/loader.component';
import { AddModalComponent } from './components/modal-popup/add-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrudTaskComponent,
    LoaderViewComponent,
    AddModalComponent,
    AddModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),

  ],
  providers: [CanactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
