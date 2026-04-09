import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, shareReplay, tap, throwError } from 'rxjs';
import { SessionStorage } from '../../enums/SessionStorage.enum';


import { ILoginRequest, RegisterRequest } from '../../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private readonly API_URL = environment.mock ? signal('mocks/company.json') : signal(environment.api_url)

  private isAuthenticated = signal<boolean>(!!sessionStorage.getItem(SessionStorage.JWT))

  get getIsAuthenticated() {
    return this.isAuthenticated.asReadonly()
  }

  httpLogin(credentials: ILoginRequest){

    if(environment.mock){
      return this.http.get<string>(`${this.API_URL()}`).pipe(
        shareReplay(),
        tap((res) => {
          sessionStorage.setItem(SessionStorage.JWT,'TOKEN')
          this.isAuthenticated.set(true)
        })
      )
    }

    return this.http.post<string>(`${this.API_URL()}/login`, credentials).pipe(
      shareReplay(),
      tap((res) => {
        sessionStorage.setItem(SessionStorage.JWT, res)
        this.isAuthenticated.set(true)
      })
    )
  }

  httpRegister(credentials: RegisterRequest){

    if(environment.mock){
      return this.http.get<string>(`${this.API_URL()}`).pipe(
        shareReplay(),
        tap((res) => {
          sessionStorage.setItem(SessionStorage.JWT,'TOKEN')
          this.isAuthenticated.set(true)
        })
      )
    }

    return this.http.post<string>(`${this.API_URL()}/register`, credentials).pipe(
      tap((res) => {
        sessionStorage.setItem(SessionStorage.JWT, res)
        this.isAuthenticated.set(true)
      })
    )
  }

  logout(){
    sessionStorage.removeItem(SessionStorage.JWT)
    this.isAuthenticated.set(false)
  }

  getToken(){
    return sessionStorage.getItem(SessionStorage.JWT)!
  }
}
