import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../shared/employee.service';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { Epmloyee } from '../shared/employee.model';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(public empService:EmployeeService, public datepipe:DatePipe, public toast:ToastrService) { }
  @ViewChild(EmployeeFormComponent) emp:EmployeeFormComponent;
  ngOnInit() {
    this.empService.getEmployees().subscribe(data=>{
      this.empService.listEmployee=data;
    });
  }
  populateEmployee(selecetedEmployee:Epmloyee)
  {
    let df=this.datepipe.transform(selecetedEmployee.doj,'yyyy-MM-dd');
    selecetedEmployee.doj=df;
    this.empService.employeeData=selecetedEmployee;
    
    if(this.emp.isSlide==='off')
    {
     this.emp.hideShowSlide();
    }
  }
  delete(id:number)
  {
    if(confirm('Are you really want to delete this record?'))
    {
      this.empService.deleteEmployee(id).subscribe(data=> {
        this.empService.getEmployees().subscribe(data=>{
          this.empService.listEmployee=data;
          this.toast.error('Sucess','Record Deleted');
        });
      },
      err=>{
      });
    }
  }
 }