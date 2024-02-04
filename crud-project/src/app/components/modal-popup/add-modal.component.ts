import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-add-modal',
    template: `
<div class="modal-open" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h3 class="modal-title">{{formLable}} LIST</h3>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true" >&times;</span>
        </button>
				</div>
				<div class="modal-body" style="overflow: auto;">
					<!-- <p>Modal body text goes here.</p> -->
          <div class="mb-10">
          <div class="form-group mb-0">
            <label class="p-0">ID</label>
            <input (keypress)="keyPress($event,'number')" class="form-control" type="text" name="ID" [(ngModel)]="addData.id">
          </div>
        </div>
          <div class="mb-10">
          <div class="form-group mb-0">
            <label class="p-0">First Name</label>
            <input (keypress)="keyPress($event,'text')" class="form-control" type="text" name="First Name" [(ngModel)]="addData.firstName">
          </div>
        </div>
        <div class="mb-10">
          <div class="form-group mb-0">
            <label class="p-0">Last Name</label>
            <input (keypress)="keyPress($event,'text')" class="form-control" type="text" name="Last Name" [(ngModel)]="addData.lastName">
          </div>
        </div>
        <div class="mb-10">
          <div class="form-group mb-0">
            <label class="p-0">City</label>
            <input (keypress)="keyPress($event,'text')" class="form-control" type="text" name="Last Name" [(ngModel)]="addData.city">
          </div>
        </div>
				</div>
				<div class="modal-footer">
          <button type="button" class="btn btn-primary" (click)="saveChangeModal()">Save</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal" (click)="closeModal()">Close</button>
				</div>
			</div>
		</div>
	</div>
    `,
    styles: [``],
})

export class AddModalComponent implements OnInit {

    constructor(private toastr: ToastrService) {}

    @Input() addModal: any;
    @Input() formLable : any;
    @Input() userData : any = {};

    @Output() closeAddModal: any = new EventEmitter();
    @Output() getAddEditData: any = new EventEmitter();

    addData : any = {
      id : '',
      firstName : '',
      lastName : '',
      city : '',
    };

    ngOnInit() {
      this.editPopup();
    }

    saveChangeModal(){
      let dataTrue = this.areAllKeysValid(this.addData);
      if(dataTrue){
        this.getAddEditData.emit({
          data : this.addData,
          lable : this.formLable
        });
      } else {
        this.toastr.warning('Please Fill All Fields', 'Messsage', {
          positionClass: 'toast-top-center', timeOut: 1500
      });
      }
    }

    areAllKeysValid(data: any): boolean {
      for (const key in data) {
        if (!data[key] || data[key] === '') {
          return false;
        }
      }
      return true;
    }

    closeModal(){
      this.closeAddModal.emit();
    }

    keyPress(event: any, type:any) {
      const pattern = /[0-9 ]/;
      if (type == 'number') {
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
      } else if (type == 'text') {
        let inputChar = String.fromCharCode(event.charCode);
        const pattern = /[a-zA-Z\s]/;
        if (!pattern.test(inputChar)) {
          event.preventDefault();
        }
      }

    }

    editPopup(){
      if(this.formLable == "EDIT"){
        this.addData['id'] = this.userData.id;
        this.addData['firstName'] = this.userData.firstName
        this.addData['lastName'] = this.userData.lastName
        this.addData['city'] = this.userData.city
      }
    }
}
