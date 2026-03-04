import {AbstractControl,ValidationErrors, ValidatorFn} from '@angular/forms'

export function passwordMatchValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null =>{
        const PASSWORD = control.get('password')
        const PASSWORD_CONFIRMATION = control.get('password_confirmation')

        if(!PASSWORD || !PASSWORD_CONFIRMATION )
            return null


        return PASSWORD.value === PASSWORD_CONFIRMATION.value
            ? null
            : {passwordMismatch: true}
        
    }
}