export interface CommonInterface {
    company_id: number
    id: number
    created_at: string
    updated_at: string
}

export interface Pagination {
    current_page: number
    first_page_url: string
    last_page_url: string
    next_page_url: string | null
    from: number | null
    last_page: number
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}
