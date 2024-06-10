import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import {  SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phoneNumber', 'address'];
  dataSource: any;
  pdfData: Blob;
  pdfUrl: SafeResourceUrl;
  private subscription: Subscription;
  constructor(private userService: UserServiceService,private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.sharedService.callMethod$.subscribe(() => {
      this.fetchData()
    });
    this.fetchData()
    this.tableDataToJson();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  fetchData() {
    this.userService.get()
      .subscribe(response => {
        this.dataSource = response
      }, error => {
        console.log(error)
      });
  }
  toggleEdit(row: any) {
    row.editable = !row.editable;
  }

 
  saveRow(row: any) {
    row.editable = false;
    const id = row._id;
    delete row._id
    console.log('Save', row);
    this.userService.update(id, row)
      .subscribe(response => {
        if(response){
          alert("Record updated sucessfully.")
          this.fetchData();
        }
        
      }, error => {
        console.log(error)
      });
  }

  deleteRow(row: any) {
    const id = row._id;
    console.log('Delete', row);
    this.userService.delete(id)
      .subscribe(response => {
        if(response){
          alert("Record deleted sucessfully")
          this.fetchData();
        }
        
      }, error => {
        console.log(error)
      });
  }
  tableDataToJson() {
    var tableData = [];
    this.dataSource.forEach(row => {
      var rowData = {
        _id: row._id,
        name: row.name,
        email: row.email,
        phoneNumber: row.phoneNumber,
        address: row.address
      };
      tableData.push(rowData);
    });


    this.router.navigate(['/pdf-viewer']);

  }
}
