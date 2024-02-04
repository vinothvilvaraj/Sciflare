import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: any;
  loading = false;
  submitted = false;
  users: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService,) { }

  ngOnInit() {
    this.formValid();
  }

  formValid(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      this.toastr.warning('Please enter the credentials', 'Messsage', {
        positionClass: 'toast-top-center', timeOut: 1500
      });
      return;
    }
    this.loading = true;

    console.log('loginForm->',this.loginForm.value)

    if(this.loginForm.value.username == 'sciflare' && this.loginForm.value.password == 'sciflare'){
      this.toastr.success('You are redirecting ... ', 'Login Success', {
        positionClass: 'toast-top-center',
        timeOut: 1500
      });
      setTimeout(() => {
        this.loading = false;
        this.router.navigateByUrl('crud-task');
      }, 1500);
      localStorage.setItem("token", this.loginForm.value.username);
    } else {
      this.toastr.error('Something Went Wrong', 'Try Again !!', {
        positionClass: 'toast-top-center', timeOut: 1500
      });
      setTimeout(() => {
        this.loading = false;
        this.loginForm.reset();
        }, 800);
      return;
    }

    //API

        // this.loading = true;


  }

}
