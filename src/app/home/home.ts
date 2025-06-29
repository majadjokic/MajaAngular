import { Component, inject, OnInit, signal } from '@angular/core';
import { GetEmployees } from '../services/get-employees';
import { catchError } from 'rxjs';
import { Employee2 } from '../model/employee2.type';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit{
  employeeService=inject(GetEmployees);
  employee=signal<Array<Employee2>>([]);


  ngOnInit(): void {
    
    this.employeeService.getEmployeesFromAPI().pipe(
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    ).subscribe((employees)=>{
      var employees2=<Array<Employee2>>([]);
      employees.forEach(em => {
        var ed=new Date(em.EndTimeUtc).getTime();
        var st=new Date(em.StarTimeUtc).getTime();
        var milS=ed-st;
        var hours=milS/ (1000 * 60 * 60);
        var hoursR=Math.round(hours);

        if(hoursR<0){
          milS=st-ed;
        hours=milS/ (1000 * 60 * 60);
        hoursR=Math.round(hours);
        employees2.push({
          EmployeeName: em.EmployeeName,
          NumHours: hoursR
        })
        }else{

        employees2.push({
          EmployeeName: em.EmployeeName,
          NumHours: hoursR
        })
        }
        

      });

      var employees3=<Array<Employee2>>([]);
      var allEmployees=<Array<string>>([]);
        employees2.forEach(em2 => {
          allEmployees.push(em2.EmployeeName);
          
          
        });
        var uniqueArray = [...new Set(allEmployees)];
        uniqueArray.forEach(ue => {
          if(ue!=null){
          employees3.push({
            EmployeeName:ue,
            NumHours:0
          })
          }
        });
        employees2.forEach(em2 => {
          employees3.forEach(em3 => {
            if(em2.EmployeeName==em3.EmployeeName){
              var newH=em3.NumHours+em2.NumHours;
              em3.NumHours=newH;
            }
          });
        });
        

for (let i = 0; i < employees3.length; i++) {
    for (let j = 0; j < employees3.length - 1 - i; j++) {
        const value1 = Object.
            values(employees3[j])[1];
        const value2 = Object.
            values(employees3[j + 1])[1];
        if (value1 < value2) {
            const temp = employees3[j];
            employees3[j] = employees3[j + 1];
            employees3[j + 1] = temp;
        }
    }
}

//employees3.sort((a, b) => b.NumHours - a.NumHours);


      this.employee.set(employees3);
    });
  }
}
