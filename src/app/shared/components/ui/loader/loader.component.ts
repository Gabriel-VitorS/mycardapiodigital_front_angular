import { Component, Input } from '@angular/core';
import { SpinnerSmComponent } from "../spinner-sm/spinner-sm.component";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [SpinnerSmComponent]
})
export class LoaderComponent{

  @Input() inputText = 'Carregando...'
}
