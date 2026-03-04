import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//components
import { ToastsContainer } from "./shared/components/toast/toast-container.componentt";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastsContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mycardapiodigital_front_angular');
}
