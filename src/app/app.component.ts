import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router,  RouterOutlet } from '@angular/router';
import { MenuComponent } from './home/menu/menu.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet,  NgIf, MenuComponent]
})
export class AppComponent {
  title = 'aplicacion_bancaria';
  token: string | undefined;
  constructor(
    private router: Router,
  ) {}


  
}
