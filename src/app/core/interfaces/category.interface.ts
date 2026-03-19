import {CommonInterface, Pagination} from './common.interface'

export interface CategoryResponse extends CommonInterface{
    name: string
    order: number
}

export interface CategoriesReponse extends Pagination {
    data: [CategoryResponse]
}

export interface CategoryParams {
    name?: string
    id?: number
    limit?: number
    page: number
}

export interface CategoryRequest {
    name: string
    order: number | null
}