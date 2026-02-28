import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-default-input',
  templateUrl: './default-input.component.html',
  styleUrls: ['./default-input.component.scss'],
  imports: [ReactiveFormsModule]
})
export class DefaultInputComponent {

  @Input({required: true}) control!: FormControl
  @Input() label = '';
  @Input() type = 'text'
  @Input() placeholder = ''
  @Input() required = false
  @Input() disabled = false

}
