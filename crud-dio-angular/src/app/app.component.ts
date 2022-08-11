import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}

/*
->tem que instalar o bootstrap, com o comando npm i bootstrap no terminal
->depois de instalar o bootstrap deve-se ir no "angular.json" e em "styles": e acrescentar
 "node_modules/bootstrap/dist/css/bootstrap.min.css" 
->também adicionar no "angular.json" em "scripts": 
 "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
 */