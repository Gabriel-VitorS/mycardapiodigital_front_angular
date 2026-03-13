import { Component, input, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OptionsSelect } from '../../../../core/interfaces';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  imports: [ReactiveFormsModule]
})
export class SelectInputComponent{

  @Input({required: true}) control!: FormControl
  @Input() label = '';
  @Input() required = false
  @Input({required: true}) options!: OptionsSelect[]
  
}
