import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//components
import { ToastsContainer } from "./shared/components/toast/toast-container.componentt";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastsContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isDemo = signal(environment.mock)
  protected readonly title = signal('mycardapiodigital_front_angular');
}
