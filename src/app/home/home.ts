import { Component, inject, OnInit, signal } from '@angular/core';
import { GetEmployees } from '../services/get-employees';
import { catchError } from 'rxjs/operators';
import { Employee2 } from '../model/employee2.type';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit{
  employeeService=inject(GetEmployees);
  employee=signal<Array<Employee2>>([]);
  chart: any;


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

        if(hours<0){
          milS=st-ed;
        hours=milS/ (1000 * 60 * 60);
        employees2.push({
          EmployeeName: em.EmployeeName,
          NumHours: hours
        })
        }else{

        employees2.push({
          EmployeeName: em.EmployeeName,
          NumHours: hours
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
            employees3.push({
            EmployeeName:ue,
            NumHours:0
          })
          
        });


        employees2.forEach(em2 => {
          employees3.forEach(em3 => {
            if(em2.EmployeeName==em3.EmployeeName){
              var newH=em3.NumHours+em2.NumHours;
              em3.NumHours=newH;
            }
          });
        });

        employees3.forEach(em3=>{
          em3.NumHours=Math.round(em3.NumHours)
        })
        

        var objIndex = employees3.findIndex(obj => obj.EmployeeName == null);

        employees3[objIndex].EmployeeName="Unknown";


        

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



      this.employee.set(employees3);

      this.createChart(employees3);
    });
  }
  createChart(employeeData: Array<Employee2>) {
    const labels = employeeData.map(emp => emp.EmployeeName);
    const rawData = employeeData.map(emp => emp.NumHours);
    const totalHours = rawData.reduce((sum, val) => sum + val, 0);
    const percentageData = rawData.map(value => +(value / totalHours * 100).toFixed(2));
  
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.chart = new Chart('employeeChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: percentageData,
          backgroundColor: ["#409ff2","#6895c7","#99a9d0","#9f94a1","#dbacaa","#b58f79","#e0ce8b","#909c67","#b5eb78","#69ca31","#c2c2c2"],
          hoverBackgroundColor: ["#409ff2","#6895c7","#99a9d0","#9f94a1","#dbacaa","#b58f79","#e0ce8b","#909c67","#b5eb78","#69ca31","#c2c2c2"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const rawValue = employeeData[context.dataIndex].NumHours;
                const percent = context.raw;
                return `${label}: ${percent}% (${rawValue} hours)`;
              }
            }
          }
        }
      }
    });
  }
}
