import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MenuResponse, MenuProduct } from '../../interfaces/menu.interface';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private http = inject(HttpClient)
  private readonly API_URL = environment.mock ? signal('mocks/menu') : signal(environment.api_url)


  private setMenu = signal<MenuResponse | null>(null)
  get getMenu(){
    return this.setMenu.asReadonly()
  }
  
  httpGetMenu(name: string){

    if(environment.mock){
      return this.http.get<MenuResponse>(`${this.API_URL()}/menu.json`)
      .pipe(
        shareReplay(),
        tap((res) => {
          
          this.setMenu.set(res)
        })
      )
    }

    return this.http.get<MenuResponse>(`${this.API_URL()}/menu/${name}`)
    .pipe(
      shareReplay(),
      tap((res) => {
        
        this.setMenu.set(res)
      })
    )
  }

  private setProduct = signal<MenuProduct | null>(null)
  get getProduct(){
    return this.setProduct.asReadonly()
  }

  httpGetProduct(id: number){
    if(environment.mock){
      return this.http.get<MenuProduct>(`mocks/product/${id}.json`)
      .pipe(
        shareReplay(),
        tap((res) => {    
          this.setProduct.set(res)
        })
      )
    }
    return this.http.get<MenuProduct>(`${this.API_URL()}/menu/product/${id}`)
    .pipe(
      shareReplay(),
      tap((res) => {    
        this.setProduct.set(res)
      })
    )
  }
}
