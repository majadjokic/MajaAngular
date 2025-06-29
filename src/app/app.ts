import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Header } from './components/header/header';
import { EmployeeChart } from "./employee-chart/employee-chart";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Home, EmployeeChart],
  template: `
  
    <app-header/>
    <app-home/>
    <app-employee-chart/>
    <router-outlet />
  `,
  styles: [
    
  ],
})


export class App {
}
