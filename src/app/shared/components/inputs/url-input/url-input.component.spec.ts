/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UrlInputComponent } from './url-input.component';

describe('UrlInputComponent', () => {
  let component: UrlInputComponent;
  let fixture: ComponentFixture<UrlInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
