import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

//interfaces
import { CompanyReponse } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private http = inject(HttpClient)
  private readonly API_URL = signal(environment.api_url)

  private setCompany = signal<CompanyReponse | null>(null)

  get getCompany(){
    return this.setCompany.asReadonly()
  }

  httpGetCompany(){
    return this.http.get<CompanyReponse>(`${this.API_URL()}/company`).pipe(
      tap((res) =>{
        this.setCompany.set(res)
      })
    )
  }
}
