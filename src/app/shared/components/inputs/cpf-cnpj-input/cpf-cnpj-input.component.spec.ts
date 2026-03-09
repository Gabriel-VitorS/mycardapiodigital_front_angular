/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CpfCnpjInputComponent } from './cpf-cnpj-input.component';

describe('CpfCnpjInputComponent', () => {
  let component: CpfCnpjInputComponent;
  let fixture: ComponentFixture<CpfCnpjInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpfCnpjInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpfCnpjInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
