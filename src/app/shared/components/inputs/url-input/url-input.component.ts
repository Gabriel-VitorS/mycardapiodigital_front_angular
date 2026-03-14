import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.scss'],
  imports: [ReactiveFormsModule]
})
export class UrlInputComponent{
  @Input({required: true}) control!: FormControl

}
