import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators,  ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { finalize } from 'rxjs';

//validators
import { cpfCnpjValidator, passwordMatchValidator } from '../../../shared/validators/index';

//enum
import { EToastOptions } from '../../../core/enums/ToastOptions.enum';

//service
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastService } from '../../../core/services/toast/toast.service';

//component
import { SpinnerSmComponent } from "../../../shared/components/ui/spinner-sm/spinner-sm.component";
import { CpfCnpjInputComponent } from "../../../shared/components/inputs/cpf-cnpj-input/cpf-cnpj-input.component";
import { PasswordInputComponent } from "../../../shared/components/inputs/password-input/password-input.component";
import { FullScreenLayoutComponent } from "../../../shared/components/layout/full-screen-layout/full-screen-layout.component";
import { DefaultInputComponent } from "../../../shared/components/inputs/default-input/default-input.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FullScreenLayoutComponent, DefaultInputComponent, PasswordInputComponent, CpfCnpjInputComponent, RouterLink, SpinnerSmComponent, ReactiveFormsModule]
})
export default class RegisterComponent{ 

  private fb = inject(FormBuilder)
  authService = inject(AuthService)
  toasService = inject(ToastService)
  private router = inject(Router)
  isSending = signal(false)  

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    password_confirmation: ['', [Validators.required]],
    cpf_cnpj: ['', [Validators.required, cpfCnpjValidator()]],
  },{
    validators: [passwordMatchValidator()]
  })

  submit(){
    if(!this.registerForm.valid)
      return

    this.isSending.set(true)

    this.authService.httpRegister({
      cpf_cnpj: this.registerForm.value.cpf_cnpj ?? '',
      email: this.registerForm.value.email ?? '',
      name: this.registerForm.value.name ?? '',
      password: this.registerForm.value.password ?? '',
      password_confirmation: this.registerForm.value.password_confirmation ?? ''
    }).pipe(
      finalize(()=>{
        this.isSending.set(false)
      })
    ).subscribe({
      next: () =>{
        this.toasService.show('Conta criada com sucesso', {type:EToastOptions.SUCCESS})
        this.router.navigate(['/gestor/login'])

      },
      error: (err: HttpErrorResponse) =>{
        console.log(err)
        this.toasService.show(err.error ?? 'Error', {type:EToastOptions.DANGER})
      }
    })

  }


}
