import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductParams, ProductRequest, ProductResponse, ProductsReponse } from '../../interfaces';
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

  private setProduct = signal<ProductResponse | null>(null)
  get getProduct(){
    return this.setProduct.asReadonly()
  }

  httpGetProduct(id: number){
    return this.http.get<ProductResponse>(`${this.API_URL()}/product/${id}`).pipe(
      tap((res)=>{
        this.setProduct.set(res)
      })
    )
  }

  httpPostProduct(productRequest: ProductRequest){
    return this.http.post<number>(`${this.API_URL()}/product`, productRequest)
  }

  httpPutProduct(id: number,productRequest: ProductRequest){
    return this.http.put<number>(`${this.API_URL()}/product/${id}`, productRequest)
  }

  httpDeleteProduct(id:number){
    return this.http.delete<number>(`${this.API_URL()}/product/${id}`)
  }

  /**
   * 
   * @param formData contendo image e id
   * @returns void
   */
  httpPostImageProduct(formData: FormData){
    return this.http.post(`${this.API_URL()}/product/product_image`, formData)
  }
}
