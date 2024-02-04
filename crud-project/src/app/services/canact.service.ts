import { Injectable, Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class CanactService {


  constructor(
    private route: Router
  ) {

  }

  canActivate() {
    let token;
    token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.log(token);
      this.route.navigateByUrl('');
      return false;
    }
    else {
      return true;
    }

  }



}
