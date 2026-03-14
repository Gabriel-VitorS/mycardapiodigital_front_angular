import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';
import { MenuConfigRequest, MenuConfiResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuConfigService {

  private http = inject(HttpClient)
  private readonly API_URL = signal(environment.api_url)

  setMenuIsConfigured = signal(false)
  get getMenuIsConfigured(){
    return this.setMenuIsConfigured.asReadonly()
  }

  private setLinkMenu = signal('')
  get getLinkMenu(){
    return this.setLinkMenu.asReadonly()
  }

  private setMenuConfig = signal<MenuConfiResponse | null>(null)
  get getMenuConfig(){
    return this.setMenuConfig.asReadonly()
  }

  httpGetMenuConfig(){
    return this.http.get<MenuConfiResponse>(`${this.API_URL()}/configuration`).pipe(
      tap((res) =>{
        this.setMenuConfig.set(res)
        this.setLinkMenu.set(`${window.location.origin}/cardapio/${res.url}`)
        this.setMenuIsConfigured.set(true)
      })
    )
  }

  httpPostMenuConfig(MenuConfigRequest: MenuConfigRequest){
    return this.http.post(`${this.API_URL()}/configuration`, MenuConfigRequest)
  }

  httpPutMenuConfig(id:number, MenuConfigRequest: MenuConfigRequest){
    return this.http.put(`${this.API_URL()}/configuration/${id}`, MenuConfigRequest)
  }

  /**
   * 
   * @param formData contendo logo_image
   * @returns void
   */
  httpPostImageLogo(formData: FormData){
    return this.http.post(`${this.API_URL()}/configuration/logo_image`, formData)
  }

}
