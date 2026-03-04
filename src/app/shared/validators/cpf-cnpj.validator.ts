import {AbstractControl,ValidationErrors, ValidatorFn} from '@angular/forms'
import { cnpj, cpf } from 'cpf-cnpj-validator'

export function cpfCnpjValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null =>{
        const value: string = control.value
        
        if(value.length < 11)
            return {invalidCpf: true}

        if(value.length == 11){
            return cpf.isValid(value) ? null : {invalidCpf: true}
        }

        if(value.length < 14)
            return {invalidCnpj: true}

        return cnpj.isValid(value) ? null : {invalidCnpj: true}
        
    }
}