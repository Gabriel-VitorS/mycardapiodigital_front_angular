import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-cpf-cnpj-input',
  templateUrl: './cpf-cnpj-input.component.html',
  styleUrls: ['./cpf-cnpj-input.component.scss'],
  imports: [ReactiveFormsModule, NgxMaskDirective]
})
export class CpfCnpjInputComponent implements OnInit {

  @Input({required: true}) control!: FormControl

  constructor() { }

  ngOnInit() {
  }

}
