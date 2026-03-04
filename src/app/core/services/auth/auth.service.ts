import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ILoginRequest } from '../../interfaces/LoginRequest.interface';
import { shareReplay, tap } from 'rxjs';
import { SessionStorage } from '../../enums/SessionStorage.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private readonly API_URL = signal(environment.api_url)

  isAuthenticated = signal<boolean>(!!sessionStorage.getItem('JWT'))

  httpLogin(credentials: ILoginRequest){
    return this.http.post<string>(`${this.API_URL()}/login`, credentials).pipe(
      shareReplay(),
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
    return JSON.parse(sessionStorage.getItem(SessionStorage.JWT)!)
  }
}
