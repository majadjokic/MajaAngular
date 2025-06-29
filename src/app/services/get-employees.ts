import { inject, Injectable } from '@angular/core';
import { Employee } from '../model/employees.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetEmployees {
  http=inject(HttpClient);
  // employees: Array<Employee>=[
  //   {
  //   name:"Maja Djokic",
  //   numHours:150
  //   },
  //   {
  //   name:"Jovan Jovic",
  //   numHours:200
  //   },
  //   {
  //   name:"Petar Markovic",
  //   numHours:90
  //   }
  // ];
  // constructor() { }
  getEmployeesFromAPI(){
      var baseUrl="https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=";
      var urlKey="vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";
      // var jsonArray=this.http.get<Array<Employee>>(baseUrl+urlKey);
      // var newArray=<Array<Employee>>[]
      // jsonArray.forEach()
      return this.http.get<Array<Employee>>(baseUrl+urlKey);
  }
}
