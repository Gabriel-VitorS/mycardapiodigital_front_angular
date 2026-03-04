import { Component, inject, signal } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { EToastOptions } from '../../../core/enums/ToastOptions.enum';
import { RouterLink } from "@angular/router";

//services
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastService } from '../../../core/services/toast/toast.service';

//components
import { SpinnerSmComponent } from "../../../shared/components/ui/spinner-sm/spinner-sm.component";
import { DefaultInputComponent } from "../../../shared/components/inputs/default-input/default-input.component";
import { PasswordInputComponent } from "../../../shared/components/inputs/password-input/password-input.component";
import { FullScreenLayoutComponent } from "../../../shared/components/layout/full-screen-layout/full-screen-layout.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FullScreenLayoutComponent, ReactiveFormsModule, DefaultInputComponent, PasswordInputComponent, SpinnerSmComponent, RouterLink],
})
export default class LoginComponent {

  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  toastService = inject(ToastService)

  isSending = signal(false)

  loginForm = this.fb.nonNullable.group({
    email: ['',[Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  showStandard(){
    this.toastService.show('Teste', {type: EToastOptions.SUCCESS})
  }

  submit(){

    if(!this.loginForm.valid)
      return

    this.isSending.set(true)

    this.authService.httpLogin({
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    }).subscribe({
      next: (res) =>{
        //redireciona
        console.log('sucesso')
      },
      error: (err: HttpErrorResponse) =>{
        console.log(err)
        this.toastService.show('Login ou senha inválida', {type: EToastOptions.DANGER})
      },
      complete:  () =>{ this.isSending.set(false)}

    })

    
  }
  
}
