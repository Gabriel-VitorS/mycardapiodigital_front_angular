import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CategoryParams, CategoriesReponse, CategoryRequest, CategoryResponse } from '../../interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient)
  private readonly API_URL = signal(environment.api_url)

  private setListCategory = signal<CategoriesReponse | null>(null)
  get getListCategory(){
    return this.setListCategory.asReadonly()
  }

  httpListCategory(categoryParams: CategoryParams){
  
    let params = new HttpParams()

    if(categoryParams.name)
      params = params.set('name', categoryParams.name)

    if(categoryParams.id)
      params = params.set('id', categoryParams.id ?? '')

    if(categoryParams.limit)
      params = params.set('limit', categoryParams.limit ?? '')

    params = params.set('page', categoryParams.page)

    return this.http.get<CategoriesReponse>(`${this.API_URL()}/category`, {params: params}).pipe(
      tap((res)=>{
        this.setListCategory.set(res)
      })
    )
  }

  private setCategory = signal<CategoryResponse | null>(null)
  get getCategory(){
    return this.setCategory.asReadonly()
  }

  httpGetCategory(id: number){
    return this.http.get<CategoryResponse>(`${this.API_URL()}/category/${id}`).pipe(
      tap((res) =>{
        this.setCategory.set(res)
      })
    )
  }

  httpPostCategory(categoryRequest: CategoryRequest){
    return this.http.post<number>(`${this.API_URL()}/category`, categoryRequest)
  }

  httpPutCategory(id: number, categoryRequest: CategoryRequest){
    return this.http.put<number>(`${this.API_URL()}/category/${id}`, categoryRequest)
  }

  httpDeleteCategory(id: number){
    return this.http.delete(`${this.API_URL()}/category/${id}`)
  }

}
