import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
  imports: [ReactiveFormsModule]
})
export class TextareaInputComponent {

  @Input({required: true}) control!: FormControl
  @Input() label = '';
  @Input() type = 'text'
  @Input() placeholder = ''
  @Input() required = false
  @Input() disabled = false

}
