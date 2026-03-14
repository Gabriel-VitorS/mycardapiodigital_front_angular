import {CommonInterface} from './common.interface'

export interface MenuConfiResponse extends CommonInterface{
    name_company: string
    url: string
    logo_image: string 
    theme_color: string
    background_color: string
    url_logo?: string
}

export interface MenuConfigRequest {
    name_company: string
    url: string
    background_color: string
    theme_color: string
}