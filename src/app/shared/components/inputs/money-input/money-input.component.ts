import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-money-input',
  templateUrl: './money-input.component.html',
  styleUrls: ['./money-input.component.scss'],
  imports: [ReactiveFormsModule, NgxMaskDirective]
})
export class MoneyInputComponent implements OnInit {
  @Input({required: true}) control!: FormControl

  constructor() { }

  ngOnInit() {
  }

}
