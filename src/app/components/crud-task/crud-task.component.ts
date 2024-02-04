import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-crud-task',
  templateUrl: './crud-task.component.html',
  styleUrls: ['./crud-task.component.css'],
})

export class CrudTaskComponent implements OnInit {
  constructor(private dash: DashboardService, private toastr: ToastrService, private router: Router) {}

  userResult: any = [];
  page: number = 1;
  list_loader: boolean = false;
  total: any;
  addModal : boolean = false;
  editModal : boolean = false;
  formLable : any = 'ADD';
  isEnterSearch : boolean = false;

  ngOnInit() {
    this.user_list();
  }

  logOut(){
    this.list_loader = true;
    localStorage.removeItem("token");
    setTimeout(() => {
      this.router.navigateByUrl('');
      this.list_loader = false;
    }, 1500);

    this.toastr.success('You are redirecting ... ', 'LogOut Success', {
      positionClass: 'toast-top-center',
      timeOut: 1500
    });
  }

  gotopage(event: any) {
    console.log('page event:' + event);
    this.page = event;
    this.user_list();
  }

  user_list(){
    this.list_loader = true;
    this.addModal = false;
    this.dash.listApi().subscribe({
      next: (res: any) => {
        console.log('user_list==>>', res);
        this.userResult = res;
        this.list_loader = false;
      },
      error: (error: any) => {
        this.toastr.error(error.message, error.status, {
            positionClass: 'toast-top-center', timeOut: 1500
        });
        this.list_loader = false;
      }
    });

  }

  searchValue : any = '';
  user_single(){
    this.list_loader = true;
    let param  = '/' + this.searchValue;
    this.dash.listSingle(param).subscribe({
      next: (res: any) => {
        console.log('user_single==>>', res);
        this.userResult = [res];
        this.list_loader = false;
      },
      error: (error: any) => {
        this.toastr.error(error.message, error.status, {
            positionClass: 'toast-top-center', timeOut: 1500
        });
        this.list_loader = false;
      }
    });
  }

  user_delete(id:any){
    this.list_loader = true;
    let param  = '/' + id;
    this.dash.listDelete(param).subscribe({
      next: (res: any) => {
        console.log('user_delete==>>', res);
        this.list_loader = false;
        this.user_list();
        this.toastr.success('Data deleted successfully ', 'Message', {
          positionClass: 'toast-top-center',
          timeOut: 1500
        });
      },
      error: (error: any) => {
        this.toastr.error(error.message, error.status, {
            positionClass: 'toast-top-center', timeOut: 1500
        });
        this.list_loader = false;
      }
    });
  }

  add_list(emitData:any) {
    let payLoads = {
      id : emitData.data.id,
      firstName : emitData.data.firstName,
      lastName : emitData.data.lastName,
      city : emitData.data.city
    };

    let param = '';
    if(this.formLable == 'EDIT'){
      param = '/' + this.userData._id
    }
    this.dash.createApi(payLoads, param).subscribe({
      next: (res: any) => {
        let msg = this.formLable == 'EDIT' ? 'Updated successfully' : 'Added successfully';
        this.toastr.success( msg , 'Message', {
          positionClass: 'toast-top-center',
          timeOut: 1500
        });

        this.user_list();
      },
      error: (error: any) => {
        this.toastr.error(error.message, error.status, {
            positionClass: 'toast-top-center', timeOut: 1500
        });
        this.list_loader = false;
      }
    });
  }

  goToDelete(data:any){
    this.user_delete(data._id)
  }

  userData : any = {};
  addListPopup(type:any, user:any){
    if(type == 'add'){
      this.formLable = 'ADD'
    } else if(type == 'edit'){
      this.formLable = 'EDIT';
      this.userData = user;
    }

    this.addModal = true;
    console.log('addListPopup',this.addModal)
  }

  // editListPopup(){
  //   this.editModal = true;
  // }

  closeAModal(){
    this.addModal = false;
  }

  // closeEModal(){
  //   this.editModal = false;
  // }

  getData(emitData:any){
    // console.log('emitData',emitData);
    this.add_list(emitData);
  }

  doEnterSearch(e:any){
    if ((e && e.keyCode === 13) && this.searchValue) {
      this.user_single();
    } else if(e && e.keyCode === 13){
      this.user_list();
    }
  }

  clearSearch(){
    this.isEnterSearch = false;
  }

}
