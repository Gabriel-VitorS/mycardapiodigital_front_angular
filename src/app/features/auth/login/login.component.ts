import { Component, inject, OnInit, signal } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { EToastOptions } from '../../../core/enums/ToastOptions.enum';
import { Router, RouterLink } from "@angular/router";
import { finalize } from 'rxjs';

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
export default class LoginComponent{

  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  toastService = inject(ToastService)
  router = inject(Router)

  isSending = signal(false)

  loginForm = this.fb.nonNullable.group({
    email: ['mcdonaldsfilial38@gmail.com',[Validators.email, Validators.required]],
    password: ['232323', [Validators.required]]
  })


  submit(){

    if(!this.loginForm.valid)
      return

    this.isSending.set(true)

    this.authService.httpLogin({
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    })
    .pipe(
      finalize(()=>{
        this.isSending.set(false)
      })
    )
    .subscribe({
      next: (res) =>{
        //redireciona
        this.router.navigate(['/gestor/inicio'])
      },
      error: (err: HttpErrorResponse) =>{
        console.log(err)
        this.toastService.show('Login ou senha inválida', {type: EToastOptions.DANGER})
      },

    })

    
  }
  
}
