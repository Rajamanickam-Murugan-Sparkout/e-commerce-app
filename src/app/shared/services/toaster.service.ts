import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toaster: ToastrService) { }

  
  showSuccess() {
    this.toaster.success("register successfully", "Success");
  }
  showError(){
    this.toaster.error('Something went wrong');
  }
  showInfo(){
    this.toaster.info('everything is broken', 'Major Error');
  }
  showWarning(warn: any){
    this.toaster.warning('everything is broken', 'Major Error', warn);
  }
}
