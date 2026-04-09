import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductParams, ProductRequest, ProductResponse, ProductsReponse } from '../../interfaces';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient)
  private readonly API_URL = environment.mock ? signal('mocks/product') : signal(environment.api_url)

  private setListProducts = signal<ProductsReponse | null>(null)
  get getListProducts(){
    return this.setListProducts.asReadonly()
  }

  httpListProducts(productParams: ProductParams){

    if(environment.mock){
      return this.http.get<ProductsReponse>(`${this.API_URL()}/product.json`).pipe(
        map(res =>{

          if(!productParams.name && productParams.highlight
            && productParams.visible_online && productParams.category
          ) return res

          const filtredData = res.data.filter(prod =>{
            let highlight = 1
            let visible_online = 1

            if(productParams.visible_online?.toLowerCase().includes('s')) visible_online = 0

            if(productParams.highlight?.toLowerCase().includes('s')) highlight = 0

            const matchName = productParams.name 
              ? prod.name.toLowerCase().includes(productParams.name.toLowerCase()) 
              : true

            // Filtro por Categoria (Pelo Nome da categoria no objeto aninhado)
            const matchCategory = productParams.category 
              ? prod.category?.name.toLowerCase().includes(productParams.category.toLocaleLowerCase())
              : true

            // Filtro por Destaque (Highlight: 0 ou 1)
            const matchHighlight = productParams.highlight
            ? prod.highlight == highlight 
            : true
            
            
            // Filtro por Visibilidade Online
            const matchVisible = productParams.visible_online
              ? prod.visible_online == visible_online
              : true

            return matchName && matchCategory && matchHighlight && matchVisible;
          })

          return {...res, data: filtredData} as ProductsReponse
        }),
        tap((res)=>{
          this.setListProducts.set(res)
        })
      )
    }

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

    if(environment.mock){
      return this.http.get<ProductResponse>(`${this.API_URL()}/${id}.json`).pipe(
        tap((res)=>{
          this.setProduct.set(res)
        })
      )
    }

    return this.http.get<ProductResponse>(`${this.API_URL()}/product/${id}`).pipe(
      tap((res)=>{
        this.setProduct.set(res)
      })
    )
  }

  httpPostProduct(productRequest: ProductRequest){
    if(environment.mock)
      return this.http.get<number>(`${this.API_URL()}/product.json`)

    return this.http.post<number>(`${this.API_URL()}/product`, productRequest)
  }

  httpPutProduct(id: number,productRequest: ProductRequest){
    if(environment.mock)
      return this.http.get<number>(`${this.API_URL()}/product.json`)

    return this.http.put<number>(`${this.API_URL()}/product/${id}`, productRequest)
  }

  httpDeleteProduct(id:number){
      if(environment.mock)
        return this.http.get<number>(`${this.API_URL()}/product.json`)

    return this.http.delete<number>(`${this.API_URL()}/product/${id}`)
  }

  /**
   * 
   * @param formData contendo image e id
   * @returns void
   */
  httpPostImageProduct(formData: FormData){
      if(environment.mock)
        return this.http.get(`${this.API_URL()}/product.json`)
    return this.http.post(`${this.API_URL()}/product/product_image`, formData)
  }
}
