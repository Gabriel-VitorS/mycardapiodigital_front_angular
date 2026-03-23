import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductParams, ProductsReponse } from '../../interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient)
  private readonly API_URL = signal(environment.api_url)

  private setListProducts = signal<ProductsReponse | null>(null)
  get getListProducts(){
    return this.setListProducts.asReadonly()
  }

  httpListProducts(productParams: ProductParams){

    let params = new HttpParams()

    if(productParams.name)
      params = params.set('name', productParams.name)

    if(productParams.id)
      params = params.set('id', productParams.id)

    if(productParams.category)
      params = params.set('category', productParams.category)

    if(productParams.highlight)
      params = params.set('highlight', productParams.highlight)

    if(productParams.visible_online)
      params = params.set('visible_online', productParams.visible_online)

    
    params = params.set('page', productParams.page)

    return this.http.get<ProductsReponse>(`${this.API_URL()}/product`, {params: params}).pipe(
      tap((res)=>{
        this.setListProducts.set(res)
      })
    )
  }
}
