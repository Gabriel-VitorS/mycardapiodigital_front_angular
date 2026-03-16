import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CategoryParams, CategoryReponse } from '../../interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient)
  private readonly API_URL = signal(environment.api_url)

  private setListCategory = signal<CategoryReponse | null>(null)
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

    return this.http.get<CategoryReponse>(`${this.API_URL()}/category`, {params: params}).pipe(
      tap((res)=>{
        this.setListCategory.set(res)
      })
    )
  }


}
