import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { TableComponent } from '../table/table.component';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formData: any = {};
  @ViewChild('form') form!: NgForm;
  constructor(private userService:UserServiceService,private sharedService: SharedService) { }
@ViewChild (TableComponent) TableComponent :TableComponent
formInvalid: boolean = false;
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.form.valid) {
    console.log('Form submitted with data:', this.formData);
    this.userService.post(this.formData)
    .subscribe(response => {
      if (response){
        this.sharedService.triggerCallMethod();
        alert("Record Updated Succesfully");
        this.clearForm();
       
      }
      
    }, error => {
      console.log(error)
    });
  }else{
    this.formInvalid = true;
  }
  }
  clearForm() {
    this.form.resetForm();
    this.formInvalid = false;
    this.formData = {};
  }
}
