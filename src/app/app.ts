import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Header } from './components/header/header';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Home],
  template: `

    <app-header/>
    <app-home/>
    <router-outlet />
  `,
  styles: [
    
  ],
})


export class App {
}
