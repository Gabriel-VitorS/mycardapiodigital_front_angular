import { computed, effect, Injectable, signal } from '@angular/core';
import { ThemeLocalStorage} from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    if(localStorage.getItem(ThemeLocalStorage.NAME) == null){
      localStorage.setItem(ThemeLocalStorage.NAME, ThemeLocalStorage.LIGHT)
    }else{
      document.documentElement.setAttribute('data-bs-theme', this.getTheme())
      this.setTheme.set(localStorage.getItem(ThemeLocalStorage.NAME) ?? '') 
    }

    effect(()=>{
      document.documentElement.setAttribute('data-bs-theme', this.getTheme())
      localStorage.setItem(ThemeLocalStorage.NAME, this.getTheme())
    })
   }

  private setTheme = signal<ThemeLocalStorage.LIGHT | ThemeLocalStorage.DARK | string>(ThemeLocalStorage.LIGHT)

  get getTheme(){
    return this.setTheme.asReadonly()
  }

  isDarkMode = computed(() => this.getTheme() === ThemeLocalStorage.DARK)

  toggleTheme(){
    this.setTheme.update(t => t === ThemeLocalStorage.LIGHT ? ThemeLocalStorage.DARK : ThemeLocalStorage.LIGHT)
  }
}
