import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
  imports: [ReactiveFormsModule]
})
export class CheckboxInputComponent{

  @Input({required: true}) control!: FormControl
  @Input() label = ''

}
