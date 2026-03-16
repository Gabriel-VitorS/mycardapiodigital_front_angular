import {CommonInterface, Pagination} from './common.interface'

export interface Category extends CommonInterface{
    name: string
    order: number
}

export interface CategoryReponse extends Pagination {
    data: [Category]
}

export interface CategoryParams {
    name?: string
    id?: number
    limit?: number
    page: number
}

export interface CategoryRequest {}