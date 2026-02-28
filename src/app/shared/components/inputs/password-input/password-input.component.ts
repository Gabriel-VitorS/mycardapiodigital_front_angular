import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  imports: [ReactiveFormsModule]
})
export class PasswordInputComponent {

  @Input({required: true}) control!: FormControl
  @Input() label = '';
  @Input() placeholder = ''
  @Input() required = false
  @Input() disabled = false
  
  type = signal<'text' | 'password'>('password')

  changeType(){
    this.type.update((oldValue)=>{
      return oldValue === 'password' ? 'text' : 'password'
    })
  }

}
