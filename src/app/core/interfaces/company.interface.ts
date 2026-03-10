import {CommonInterface} from './common.interface'

export interface CompanyReponse extends Omit<CommonInterface, 'company_id'> {
    name: string
    cpf_cnpj: string
    email: string
}

export interface CompanyRequest {}