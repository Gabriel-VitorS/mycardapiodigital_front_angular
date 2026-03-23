import {CommonInterface, Pagination} from './common.interface'
import { CategoryResponse } from './index'

export interface ProductResponse extends CommonInterface{
    name: string
    category_id: number | null,
    category: CategoryResponse | null,
    value: number | string,
    resume: null | string,
    details: null | string,
    image: null | string,
    url_image: string,
    highlight: 1 | 0 | boolean,
    visible_online:  1 | 0 | boolean,
}

export interface ProductsReponse extends Pagination {
    data: [ProductResponse]
}

export interface ProductParams {
    name?: string
    id?: number
    highlight?: 'true' | 'false'
    visible_online?: 'true' | 'false'
    category?: string
    page: number
}

export interface ProductRequest {
    name: string
    order: number | null
}