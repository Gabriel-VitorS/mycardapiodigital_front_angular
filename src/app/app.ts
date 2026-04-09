import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//components
import { ToastsContainer } from "./shared/components/toast/toast-container.componentt";
import { environment } from '../environments/environment';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastsContainer, NgbAlert],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isDemo = signal(environment.mock)
  isAlertOpen = signal(true) 
  protected readonly title = signal('mycardapiodigital_front_angular');
}
